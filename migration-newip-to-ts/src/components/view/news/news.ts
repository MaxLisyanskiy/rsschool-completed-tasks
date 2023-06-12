import './news.css';
import { NewsItem, TemplateElementOrNull } from '../../../types';

class News {
    public draw(data: NewsItem[]): void {
        const news: NewsItem[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: TemplateElementOrNull = document.querySelector('#newsItemTemp');

        news.forEach((item: NewsItem, idx: number) => {
            const newsClone: TemplateElementOrNull = newsItemTemp?.content.cloneNode(true) as HTMLTemplateElement;

            if (idx % 2) (newsClone.querySelector('.news__item') as HTMLElement).classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        (document.querySelector('.news') as HTMLInputElement).innerHTML = '';
        (document.querySelector('.news') as HTMLInputElement).appendChild(fragment);
    }
}

export default News;
