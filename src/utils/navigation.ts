/**
 * Safe navigation and link opening helper for iFrames and pop-up constrained environments
 */
export function safeOpenUrl(url: string, target: string = '_blank'): void {
  if (!url) return;
  try {
    const newWindow = window.open(url, target, 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Fallback: create temporary anchor
      const a = document.createElement('a');
      a.href = url;
      a.target = target;
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch (err) {
    console.warn('safeOpenUrl blocked or failed:', err);
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = target;
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (innerErr) {
      console.warn('Anchor fallback also failed:', innerErr);
    }
  }
}
