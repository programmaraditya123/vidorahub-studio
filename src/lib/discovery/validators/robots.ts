export function isRobotRule(input: unknown): boolean {
  return Boolean(input && typeof input === "object");
}
