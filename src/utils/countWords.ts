export function countWords(html: string): number {
  const plainText = html
    .replace(/<[^>]*>/g, "")
    .replace(/&[#a-z0-9]+;/gi, "")
    .replaceAll(".", ". ")
    .replaceAll(",", ", ")
    .replace(/\s+/g, " ")
    .trim();
  const words = plainText.split(/\W+/).filter(word => word.length);
  return words.length;
}
