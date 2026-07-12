import { defineMdastPlugin, type MdastPluginDefinition } from "satteri";
import type { Paragraph, PhrasingContent, Text } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";

const PREFIX = /^\s*([A-Za-z][A-Za-z-]*)\s*:\s*/;

type Section = {
  lang: string;
  children: PhrasingContent[];
};

export default function satteriExample(): MdastPluginDefinition {
  return defineMdastPlugin({
    name: "example",
    containerDirective(node: ContainerDirective) {
      if (node.name !== "ex" && node.name !== "example") return;

      const p = node.children[0];
      if (p?.type !== "paragraph") return;
      const lines = splitLines(p.children);
      const sections = buildSections(lines);

      return {
        ...node,
        data: { ...node.data, hName: "figure" },
        children: sections.map(sectionToNode),
      };
    },
  });
}

function splitLines(nodes: readonly PhrasingContent[]): PhrasingContent[][] {
  const lines: PhrasingContent[][] = [[]];
  for (const node of nodes) {
    if (node.type === "text" && node.value.includes("\n")) {
      node.value.split("\n").forEach((part, i) => {
        if (i > 0) lines.push([]);
        lines[lines.length - 1].push({ type: "text", value: part });
      });
    } else {
      lines[lines.length - 1].push(node);
    }
  }
  return lines.filter((line) =>
    line.some((n) => n.type !== "text" || n.value.trim() !== ""),
  );
}

function buildSections(lines: PhrasingContent[][]): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const line of lines) {
    const head = line[0];
    const match = head?.type === "text" ? head.value.match(PREFIX) : null;
    if (match) {
      const rest = line.slice(1);
      const leading = (head as Text).value.slice(match[0].length);
      if (leading !== "") rest.unshift({ type: "text", value: leading });
      current = { lang: match[1], children: rest };
      sections.push(current);
    } else if (current) {
      current.children.push({ type: "break" }, ...line);
    }
  }
  return sections;
}

function sectionToNode(
  section: Section,
  index: number,
  array: Section[],
): Paragraph {
  return {
    type: "paragraph",
    data: {
      // @ts-expect-error hName doesn't have types but will be used
      hName: index === array.length - 1 ? "figcaption" : "p",
      hProperties: { lang: section.lang },
    },
    children: section.children,
  };
}
