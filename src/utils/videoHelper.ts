/**
 * Generates realistic randomized video durations and progress widths
 * Examples: '01:47', '04:23', '08:15', '02:59', '12:04', '06:38', '16:51'
 */
export function getRandomVideoDuration(seed?: string): string {
  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    const minutes = (absHash % 17) + 1; // 1 to 18 minutes
    const seconds = (absHash * 7) % 60; // 0 to 59 seconds
    const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minStr}:${secStr}`;
  }

  const minutes = Math.floor(Math.random() * 16) + 1;
  const seconds = Math.floor(Math.random() * 60);
  const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minStr}:${secStr}`;
}

export function getRandomProgressWidth(seed?: string): number {
  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 33 + seed.charCodeAt(i)) | 0;
    }
    return 20 + (Math.abs(hash) % 65); // 20% to 85%
  }
  return 20 + Math.floor(Math.random() * 65);
}
