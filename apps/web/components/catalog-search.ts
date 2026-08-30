import type { UICase } from "@vibe-case/cases";

// 二级分类的中英同义词：中文用户的自然叫法 -> 数据层的英文分类 id
const categorySynonyms: Record<string, readonly string[]> = {
  定价: ["Pricing"],
  价格: ["Pricing"],
  首屏: ["Hero Sections"],
  英雄区: ["Hero Sections"],
  横幅: ["CTA Banners"],
  行动号召: ["CTA Banners"],
  数据条: ["Stats Bars"],
  导航: ["Nav Bars"],
  导航栏: ["Nav Bars"],
  评价: ["Testimonials"],
  证言: ["Testimonials"],
  页脚: ["Footer"],
  常见问题: ["FAQ"],
  仪表盘: ["Dashboards"],
  引导: ["Onboarding"],
  博客: ["Blog / Content"],
  联系: ["Contact"],
  登录: ["Auth Forms"],
  注册: ["Auth Forms"],
  功能: ["Features / Bento"],
  特性: ["Features / Bento"],
  彩蛋: ["Bonus"],
};

// 目录搜索的匹配规则：标题、摘要、标签、分类（英文 id 与展示标签）之外，
// 还按同义词表把整词中文叫法映射回英文分类，保证“定价”能召回全部 Pricing 案例
export function caseMatchesQuery(item: UICase, query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;
  const normalized = trimmed.toLocaleLowerCase("zh-CN");
  const haystack = [
    item.title.zhCN,
    item.title.sourceEN,
    item.summary.zhCN,
    item.summary.sourceEN,
    item.category,
    item.categoryLabel,
    ...item.tags,
  ]
    .join(" ")
    .toLocaleLowerCase("zh-CN");
  if (haystack.includes(normalized)) return true;
  return (categorySynonyms[trimmed] ?? []).includes(item.category);
}
