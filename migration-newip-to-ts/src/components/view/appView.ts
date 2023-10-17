import News from './news/news';
import Sources from './sources/sources';
import { NewsData, NewsItem, SourcesData, SourcesItem } from '../../types';

export class AppView {
    public news: News;
    public sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsData): void {
        const values: NewsItem[] | [] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: SourcesData): void {
        const values: SourcesItem[] | [] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
