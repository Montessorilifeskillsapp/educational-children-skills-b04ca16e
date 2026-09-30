// Generates a 30-second WAV preview clip from an audio file, entirely in the
// browser, so full tracks never need to leave the private bucket for preview.
export interface PreviewResult {
  blob: Blob;
  durationSeconds: number;
}

const PREVIEW_LENGTH_SECONDS = 30;
const TARGET_SAMPLE_RATE = 22050; // mono 16-bit — small files, clear voice/piano

export async function generateAudioPreview(file: File, startSeconds = 0): Promise<PreviewResult> {
  const arrayBuffer = await file.arrayBuffer();
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const decodeCtx = new AudioCtx();
  const decoded = await decodeCtx.decodeAudioData(arrayBuffer.slice(0));
  void decodeCtx.close();

  const start = Math.max(0, Math.min(startSeconds, Math.max(0, decoded.duration - 1)));
  const length = Math.min(PREVIEW_LENGTH_SECONDS, decoded.duration - start);
  if (length <= 0) throw new Error('The audio file is too short to make a preview.');

  // Resample + downmix to mono at the target rate.
  const offline = new OfflineAudioContext(1, Math.ceil(length * TARGET_SAMPLE_RATE), TARGET_SAMPLE_RATE);
  const source = offline.createBufferSource();
  source.buffer = decoded;
  source.connect(offline.destination);
  source.start(0, start, length);
  const rendered = await offline.startRendering();
  const samples = rendered.getChannelData(0);

  return {
    blob: encodeWav(samples, TARGET_SAMPLE_RATE),
    durationSeconds: Math.round(decoded.duration),
  };
}

function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i += 1) view.setUint8(offset + i, value.charCodeAt(i));
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  writeString(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i += 1) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}
