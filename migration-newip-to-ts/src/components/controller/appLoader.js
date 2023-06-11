import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '017b55d657094789b986676060a3b835', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
