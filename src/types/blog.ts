export type BlogCategory =
  | 'Child Health'
  | 'Parenting & Psychology'
  | 'Nutrition & Development'
  | 'Safety & First Aid'
  | 'Myths & Safe Parenting'
  | 'Family Wellbeing';

export interface BlogSource {
  name: string;
  title: string;
  url?: string;
}

export interface BlogAffiliateItem {
  title: string;
  url: string;
  whyItFits: string;
}

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: BlogCategory;
  date: string;
  author: string;
  writtenBy?: string;
  reviewed: boolean;
  reviewedBy?: string;
  coverImage: string;
  coverAlt: string;
  highlight?: string;
  sources?: BlogSource[];
  affiliate?: BlogAffiliateItem[];
  isSample?: boolean;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string; // Raw markdown body
  htmlContent: string; // Parsed HTML content
  readingTimeMinutes: number;
}
