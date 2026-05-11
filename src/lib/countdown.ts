/**
 * Próxima edición del 11F.
 * Marcamos explícitamente 2027-02-11 como objetivo principal.
 * Si esa fecha ya pasó, calculamos el siguiente 11 de febrero.
 */
export function proximoOnceF(now: Date = new Date()): Date {
  const target = new Date("2027-02-11T00:00:00");
  if (now <= target) return target;
  let year = now.getFullYear();
  if (now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 11)) year++;
  return new Date(year, 1, 11);
}

export function diasHasta(target: Date, now: Date = new Date()): number {
  const ms = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / 86400000));
}
