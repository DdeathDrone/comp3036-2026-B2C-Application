export function toUrlPath(path: string) {
  // replace all non alphanumerics characters with hyphen
  // then replace all sequential hyphens with single hyphen
  // then remove leading and trailing hyphens
  let normalize = path.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+/, "").replace(/-+$/, "")

  return normalize.toLowerCase();
}
