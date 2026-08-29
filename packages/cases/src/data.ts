import source from "../../../content/cases/ui/cases.en.json";
import { sourceCaseSchema, uiCaseSchema, type UICase } from "./schema";
import { translations } from "./translations";

export const categories = [
  { id: "Auth Forms", label: "Auth 表单", count: 6 },
  { id: "Pricing", label: "Pricing", count: 8 },
  { id: "Features / Bento", label: "Features / Bento", count: 8 },
  { id: "Hero Sections", label: "Hero 区域", count: 8 },
  { id: "CTA Banners", label: "CTA 横幅", count: 7 },
  { id: "Stats Bars", label: "Stats 数据条", count: 7 },
  { id: "Nav Bars", label: "Nav 导航栏", count: 8 },
  { id: "Testimonials", label: "Testimonials 用户评价", count: 8 },
  { id: "Footer", label: "Footer", count: 5 },
  { id: "FAQ", label: "FAQ", count: 5 },
  { id: "Dashboards", label: "Dashboard 仪表盘", count: 6 },
  { id: "Onboarding", label: "Onboarding", count: 4 },
  { id: "Blog / Content", label: "Blog / Content", count: 4 },
  { id: "Contact", label: "Contact", count: 3 },
  { id: "Bonus", label: "Bonus", count: 5 },
] as const;

const categoryLabels = new Map<string, string>(categories.map((category) => [category.id, category.label]));

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const variables = [
  { key: "brand", label: "品牌或产品名称", placeholder: "例如 Acme Cloud" },
  { key: "audience", label: "目标用户", placeholder: "例如独立开发者" },
  { key: "tone", label: "视觉气质", placeholder: "例如克制、明亮、编辑感" },
];

export const cases: UICase[] = sourceCaseSchema.array().parse(source).map((item) => {
  const translated = translations[item.id];
  if (!translated) throw new Error(`Missing Chinese translation for ${item.id}`);

  const [titleZh, summaryZh] = translated;
  const categoryLabel = categoryLabels.get(item.category);
  if (!categoryLabel) throw new Error(`Unknown category ${item.category}`);

  return uiCaseSchema.parse({
    id: item.id,
    slug: slugify(item.titleEN),
    category: item.category,
    categoryLabel,
    title: {
      zhCN: titleZh,
      sourceEN: item.titleEN,
      aliases: [item.titleEN, item.category, categoryLabel],
    },
    summary: { zhCN: summaryZh, sourceEN: item.summaryEN },
    prompt: {
      zhCN: `为「${categoryLabel}」创建「${titleZh}」界面。${summaryZh}。请补全该结构所需的真实文案、状态与交互，并匹配参考图片的色彩、字体排版、间距和整体视觉语言。输出必须是完整、自包含且可响应式展示的 HTML。`,
      sourceEN: item.promptEN,
      version: "1",
    },
    thumbnail: `diagram:${item.id}`,
    tags: [item.category, categoryLabel, ...item.titleEN.toLowerCase().split(/\W+/).filter(Boolean)],
    variables,
    outputMode: "html-preview",
  });
});

export function getCaseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug);
}

export function getCaseById(id: string) {
  return cases.find((item) => item.id === id);
}

export function searchCases(query = "", category = "All") {
  const normalized = query.trim().toLocaleLowerCase("zh-CN");
  return cases.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    if (!normalized) return true;
    const haystack = [
      item.title.zhCN,
      item.title.sourceEN,
      item.summary.zhCN,
      item.summary.sourceEN,
      ...item.title.aliases,
      ...item.tags,
    ]
      .join(" ")
      .toLocaleLowerCase("zh-CN");
    return haystack.includes(normalized);
  });
}
