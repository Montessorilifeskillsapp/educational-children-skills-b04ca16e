"""Fills missing lesson translations.
1. Run the lesson translation test; it lists missing strings in /tmp/lesson-missing-<lang>.json.
2. python3 scripts/translate-lessons.py <es|de|zh>  (needs LOVABLE_API_KEY in the environment)
Translations are merged into src/i18n/lessons/<lang>.json, keyed by the exact English text."""
import json, os, sys, threading, time, requests
from concurrent.futures import ThreadPoolExecutor
KEY=os.environ['LOVABLE_API_KEY']; URL='https://ai.gateway.lovable.dev/v1/responses'; MODEL='openai/gpt-6.1-sol'
LANG={'es':'Spanish (Latin-American neutral, address the adult reader informally with "tú")','de':'German (address the adult reader formally with "Sie")','zh':'Simplified Chinese (Mainland usage)'}
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GLOSS=open(os.path.join(ROOT,'scripts','lesson-glossary.txt')).read()
lock=threading.Lock()
def schema():
    return {"type":"object","additionalProperties":False,"required":["items"],"properties":{"items":{"type":"array","items":{"type":"object","additionalProperties":False,"required":["k","v"],"properties":{"k":{"type":"string"},"v":{"type":"string"}}}}}}
def call(lang, batch):
    src=[{"k":k,"v":v} for k,v in batch]
    instr=(f"You are an AMI-trained Montessori translator. Translate each item's v from American English into {LANG[lang]}. "
      "This is a 3-6 Montessori curriculum guide for parents and teachers. Use established AMI Montessori terminology in the target language (see glossary), "
      "precise and warm, never literal word-by-word. Keep the same meaning, sentence count and formatting (line breaks, bullet characters, numbers, emoji). "
      "Keep placeholders like {child} or {{name}} unchanged. Child names in examples may stay as is. Always write 'Dr. Maria Montessori' as her name. "
      "Do not name any brand or supplier. Return every k exactly once with its translation.\n\nGLOSSARY (English = Spanish | German | Chinese):\n"+GLOSS)
    body={"model":MODEL,"stream":True,"store":False,"reasoning":{"effort":"low"},"instructions":instr,
      "input":[{"role":"user","content":json.dumps(src,ensure_ascii=False)}],
      "text":{"format":{"type":"json_schema","name":"translations","strict":True,"schema":schema()}}}
    for attempt in range(4):
        try:
            r=requests.post(URL,headers={"Authorization":f"Bearer {KEY}","Content-Type":"application/json","X-Lovable-AIG-SDK":"fetch"},json=body,stream=True,timeout=600)
            if r.status_code!=200: raise RuntimeError(f"{r.status_code} {r.text[:300]}")
            out=[]
            for line in r.iter_lines(decode_unicode=True):
                if not line or not line.startswith('data:'): continue
                d=line[5:].strip()
                if d=='[DONE]': break
                ev=json.loads(d)
                if ev.get('type')=='response.output_text.delta': out.append(ev['delta'])
                elif ev.get('type') in ('response.failed','error'): raise RuntimeError(str(ev)[:300])
            items=json.loads(''.join(out))['items']
            res={i['k']:i['v'] for i in items}
            missing=[k for k,_ in batch if not res.get(k)]
            if missing and len(missing)>len(batch)//10: raise RuntimeError(f"missing {len(missing)}")
            return {k:res[k] for k,_ in batch if res.get(k)}
        except Exception as e:
            print(lang,'retry',attempt,str(e)[:200],flush=True); time.sleep(5*(attempt+1))
    return {}
def run(lang, workers=6, limit=9000):
    missing=json.load(open(f'/tmp/lesson-missing-{lang}.json'))
    path=os.path.join(ROOT,'src','i18n','lessons',f'{lang}.json')
    done=json.load(open(path)) if os.path.exists(path) else {}
    todo=[(k,k) for k in missing if k not in done and k.strip()]
    batches=[]; cur=[]; size=0
    for k,v in todo:
        if cur and (size+len(v)>limit or len(cur)>=120): batches.append(cur); cur=[]; size=0
        cur.append((k,v)); size+=len(v)
    if cur: batches.append(cur)
    print(lang,'todo',len(todo),'batches',len(batches),flush=True)
    def work(b):
        res=call(lang,b)
        with lock:
            done.update(res)
            json.dump(dict(sorted(done.items())),open(path,'w'),ensure_ascii=False,indent=0)
        print(lang,'ok',len(res),'/',len(b),flush=True)
    with ThreadPoolExecutor(workers) as ex: list(ex.map(work,batches))
if __name__=='__main__':
    run(sys.argv[1])
