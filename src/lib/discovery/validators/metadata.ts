export function hasTitleAndDescription(input: { title?: unknown; description?: unknown }): boolean {
  return Boolean(input.title && input.description);
}
