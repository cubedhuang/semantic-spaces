import type { Root, Paragraph } from "mdast";
import { toString } from "mdast-util-to-string";
import { visit, SKIP } from "unist-util-visit";
import type { VFile } from "vfile";

export default function remarkOgDescription() {
  return function (tree: Root, file: VFile) {
    const paragraphs: Paragraph[] = [];

    visit(tree, (node) => {
      if (node.type === "containerDirective") {
        return SKIP;
      }
      if (node.type === "paragraph") {
        paragraphs.push(node);
      }
    });

    let plainText = paragraphs
      .map((p) => toString(p))
      .join(" ")
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
