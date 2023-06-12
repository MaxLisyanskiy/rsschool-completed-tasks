import AppLoader from './appLoader';
import { Callback, NewsData, SourcesData } from '../../types';

enum Endpoint { 
    sources = "sources", 
    everything = "everything",
};

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesData>): void {
        super.getResp(
            {
                endpoint: Endpoint.sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<NewsData>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoint.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
