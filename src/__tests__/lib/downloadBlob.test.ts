import { afterEach, describe, expect, it, vi } from 'vitest';
import { downloadBlob } from '@/lib/downloadBlob';

describe('downloadBlob', () => {
  afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });

  it('clicks a link that is on the page (Safari ignores detached links) and keeps the file alive long enough to save', () => {
    vi.useFakeTimers();
    URL.createObjectURL = vi.fn(() => 'blob:file');
    const revoke = vi.fn(); URL.revokeObjectURL = revoke;
    let attachedAtClick = false; let name = '';
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      attachedAtClick = document.body.contains(this); name = this.download;
    });
    downloadBlob(new Blob(['a,b']), 'members.csv');
    expect(attachedAtClick).toBe(true);
    expect(name).toBe('members.csv');
    expect(document.querySelectorAll('a[download]').length).toBe(0);
    expect(revoke).not.toHaveBeenCalled();
    vi.advanceTimersByTime(30_000);
    expect(revoke).toHaveBeenCalledWith('blob:file');
  });
});
