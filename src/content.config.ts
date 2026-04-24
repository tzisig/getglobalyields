import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const commonSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  author: z.string().default('Get Global Yields Team'),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).optional(),
  canonicalURL: z.string().url().optional(),
  draft: z.boolean().default(false),
  readingTime: z.string().optional(),
  featured: z.boolean().optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    twitterCard: z.string().optional(),
  }).optional(),
  schema: z.object({
    type: z.string().optional(),
    headline: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    datePublished: z.string().optional(),
    dateModified: z.string().optional(),
    image: z.string().optional(),
    mainEntityOfPage: z.string().optional(),
  }).optional(),
  productName: z.string().optional(),
  rating: z.number().optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  affiliateLink: z.string().url().optional(),
  products: z.array(z.string()).optional(),
});

const bestBrokers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/best-brokers" }),
  schema: commonSchema,
});

const strategies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/strategies" }),
  schema: commonSchema,
});

const taxes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/taxes" }),
  schema: commonSchema,
});

const usInvesting = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/us-investing" }),
  schema: commonSchema,
});

const caseStudy = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-study" }),
  schema: commonSchema,
});

const optionsIncome = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/options-income" }),
  schema: commonSchema,
});

export const collections = { 
  'best-brokers': bestBrokers, 
  strategies, 
  taxes, 
  'us-investing': usInvesting,
  'case-study': caseStudy,
  'options-income': optionsIncome,
};
