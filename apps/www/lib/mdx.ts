import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import readingTime from 'reading-time';
import type { Article, ArticleFrontmatter, ArticleListItem } from '@/types/mdx';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

// Get all article slugs for a locale
export function getArticleSlugs(locale: 'en' | 'ar'): string[] {
    const localeDir = path.join(articlesDirectory, locale);

    if (!fs.existsSync(localeDir)) {
        return [];
    }

    const files = fs.readdirSync(localeDir);
    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx$/, ''));
}

// Get article by slug (cached for performance)
export const getArticle = cache(async (
    slug: string,
    locale: 'en' | 'ar'
): Promise<Article | null> => {
    try {
        const filePath = path.join(articlesDirectory, locale, `${slug}.mdx`);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const { data, content } = matter(fileContents);

        // Calculate reading time
        const stats = readingTime(content);

        return {
            slug,
            frontmatter: {
                ...data,
                readTime: stats.text,
                locale,
            } as ArticleFrontmatter,
            content,
            locale,
        };
    } catch (error) {
        console.error(`Error reading article ${slug}:`, error);
        return null;
    }
});

// Get all articles for listing (cached)
export const getAllArticles = cache(async (
    locale: 'en' | 'ar'
): Promise<ArticleListItem[]> => {
    const slugs = getArticleSlugs(locale);

    const articles = await Promise.all(
        slugs.map(async (slug) => {
            const article = await getArticle(slug, locale);
            if (!article) return null;

            return {
                slug,
                frontmatter: article.frontmatter,
            };
        })
    );

    // Filter out null values and sort by date
    return articles
        .filter((article): article is ArticleListItem => article !== null)
        .sort((a, b) => {
            const dateA = new Date(a.frontmatter.date).getTime();
            const dateB = new Date(b.frontmatter.date).getTime();
            return dateB - dateA; // Most recent first
        });
});

// Get featured articles
export async function getFeaturedArticles(
    locale: 'en' | 'ar',
    limit = 3
): Promise<ArticleListItem[]> {
    const allArticles = await getAllArticles(locale);
    return allArticles
        .filter((article) => article.frontmatter.featured)
        .slice(0, limit);
}

// Get related articles by tags
export async function getRelatedArticles(
    currentSlug: string,
    tags: string[],
    locale: 'en' | 'ar',
    limit = 3
): Promise<ArticleListItem[]> {
    const allArticles = await getAllArticles(locale);

    return allArticles
        .filter((article) => article.slug !== currentSlug)
        .map((article) => {
            const commonTags = article.frontmatter.tags.filter((tag) =>
                tags.includes(tag)
            );
            return { article, score: commonTags.length };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ article }) => article);
}
