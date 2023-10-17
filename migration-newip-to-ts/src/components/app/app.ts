import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsData, SourcesData } from '../../types';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void  {
        (document.querySelector('.sources') as HTMLTemplateElement)
            .addEventListener(
                'click', 
                (e: MouseEvent) => this.controller.getNews(e, (data: NewsData): void => this.view.drawNews(data))
            );
        this.controller.getSources((data: SourcesData): void => this.view.drawSources(data));
    }
}

export default App;
