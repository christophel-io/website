export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: any[]) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: any[]) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
