export function getOgDescription(html: string, maxLength = 160): string {
  let plainText = html
    .replace(/<[^>]*>/g, "")
    .replace(/&[#a-z0-9]+;/gi, "")
    .replaceAll(".", ". ")
    .replaceAll(",", ", ")
    .replace(/\s+/g, " ")
    .trim();
  if (plainText.length >= maxLength) {
    plainText = plainText.substring(0, maxLength - 1) + "…";
  }
  return plainText;
}
