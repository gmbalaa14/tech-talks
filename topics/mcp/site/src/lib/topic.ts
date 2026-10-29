// Reads this topic's data files (one level above site/). Paths are relative to src/lib.
import meta from "../../../topic.json";
import facts from "../../../facts.json";
import changelog from "../../../changelog.json";

export { meta, facts, changelog };

export function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export interface Act {
  id: string;
  title: string;
  summary?: string;
  order: number;
  diagram?: string;
  diagramCaption?: string;
  Content: any;
}

/** Acts are MDX files in src/content/acts/. Frontmatter: title, summary, order, diagram, diagramCaption. */
export function loadActs(): Act[] {
  const mods = import.meta.glob("../content/acts/*.mdx", { eager: true }) as Record<string, any>;
  return Object.entries(mods)
    .map(([path, m]) => {
      const file = path.split("/").pop()!.replace(/\.mdx$/, "");
      const fm = m.frontmatter ?? {};
      return {
        id: file.replace(/^\d+-/, ""),
        title: fm.title ?? file,
        summary: fm.summary,
        order: fm.order ?? 0,
        diagram: fm.diagram,
        diagramCaption: fm.diagramCaption,
        Content: m.Content,
      } as Act;
    })
    .sort((a, b) => a.order - b.order);
}
