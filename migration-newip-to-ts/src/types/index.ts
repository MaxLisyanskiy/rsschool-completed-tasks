// Options
export type TemplateElementOrNull = HTMLTemplateElement | null
export type Options = Record<string, unknown>
export type Callback<T> = (data: T) => void;


// News
export interface NewsData {
    articles: NewsItem[];
    status: string;
    totalResults: number;
}
export interface NewsItem {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}



// Sources
export interface SourcesData {
    sources: SourcesItem[];
    status: string;
}
export interface SourcesItem {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}