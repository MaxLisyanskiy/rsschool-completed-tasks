import './sources.css';
import { SourcesItem, TemplateElementOrNull } from '../../../types';

class Sources {
    public draw(data: SourcesItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: TemplateElementOrNull = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone: TemplateElementOrNull = sourceItemTemp?.content.cloneNode(true) as HTMLTemplateElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
