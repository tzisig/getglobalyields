import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    author: z.string().default('Get Global Yields Team'),
    categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reviews" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    productName: z.string(),
    rating: z.number().min(0).max(5),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    affiliateLink: z.string().url().optional(),
    author: z.string().default('Get Global Yields Team'),
    draft: z.boolean().default(false),
  }),
});

const comparisons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/comparisons" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    products: z.array(z.string()),
    author: z.string().default('Get Global Yields Team'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides, reviews, comparisons };
