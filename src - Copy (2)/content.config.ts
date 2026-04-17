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
  draft: z.boolean().default(false),
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

export const collections = { 
  'best-brokers': bestBrokers, 
  strategies, 
  taxes, 
  'us-investing': usInvesting 
};
