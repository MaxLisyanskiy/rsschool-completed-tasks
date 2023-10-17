import Loader from './loader';

enum Api { 
    dev = "https://newsapi.org/v2/", 
    prod = "https://rss-news-api.onrender.com/",
};

class AppLoader extends Loader {
    constructor() {
        super(Api.prod, {
            apiKey: '3907f9547d364fdaa36a6b87c92e8015', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
