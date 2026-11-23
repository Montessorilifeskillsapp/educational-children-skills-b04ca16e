import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';
import { Block } from '@/components/legal/LegalText';
import { loadLegalDoc, type LegalDoc, type LegalLoaders } from '@/content/legal/types';
import { formatDate } from '@/i18n/format';

interface Props {
  english: LegalDoc;
  loaders: LegalLoaders;
  keywords: string;
  canonical: string;
}

/** Shows a legal document in the reader's language, with the English text while a translation loads. */
const LegalDocPage: React.FC<Props> = ({ english, loaders, keywords, canonical }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2);
  const [doc, setDoc] = useState<LegalDoc>(english);
  const [shownLang, setShownLang] = useState('en');

  useEffect(() => {
    let alive = true;
    if (!(lang in loaders)) { setDoc(english); setShownLang('en'); return; }
    void loadLegalDoc(loaders, lang, english).then((d) => { if (alive) { setDoc(d); setShownLang(d === english ? 'en' : lang); } });
    return () => { alive = false; };
  }, [lang, english, loaders]);

  useSEO({ title: doc.seoTitle, description: doc.seoDescription, keywords, canonical });

  return (
    <SEOOptimizer>
      <PageLayout title={doc.pageTitle} onBack={() => navigate(-1)}>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <p className="text-sm text-muted-foreground mb-2">{doc.updated.replace('{{date}}', formatDate(new Date(), { dateStyle: 'long' }))}</p>
              {shownLang !== 'en' && <p className="text-sm text-muted-foreground mb-6 italic">{doc.translationNote}</p>}
              {doc.sections.map((section, i) => (
                <section key={i} id={section.id} className={`mb-8${section.id ? ' scroll-mt-24' : ''}`}>
                  {section.title && <h2 className="text-xl font-semibold mb-4">{section.title}</h2>}
                  {section.blocks.map((block, j) => <Block key={j} block={block} lang={shownLang} />)}
                </section>
              ))}
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default LegalDocPage;
