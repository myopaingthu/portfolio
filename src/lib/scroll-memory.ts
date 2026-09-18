const positions = new Map<string, number>();

export function rememberScroll(pathname: string, value: number) {
  positions.set(pathname, value);
}

export function recallScroll(pathname: string) {
  return positions.get(pathname);
}
