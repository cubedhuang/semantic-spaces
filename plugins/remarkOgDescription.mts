import type { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import type { VFile } from "vfile";

export default function remarkOgDescription() {
  return function (tree: Root, file: VFile) {
    let plainText = toString(tree)
      .replaceAll(".", ". ")
      .replaceAll(",", ", ")
      .replace(/\s+/g, " ")
      .trim();
    if (plainText.length >= 160) {
      plainText = plainText.substring(0, 159) + "…";
    }
    file.data.astro!.frontmatter!.ogDescription = plainText;
  };
}
