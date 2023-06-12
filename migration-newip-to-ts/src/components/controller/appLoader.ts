import Loader from './loader';

enum Api { 
    dev = "https://newsapi.org/v2/", 
    prod = "https://nodenews.herokuapp.com/",
};

class AppLoader extends Loader {
    constructor() {
        super(Api.dev, {
            apiKey: '017b55d657094789b986676060a3b835', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
