import { Callback, Options } from "../../types";

class Loader {
    private readonly baseLink: string;
    private readonly options: Options | undefined;
    
    constructor(baseLink: string, options?: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<Data>( 
        { endpoint, options = {} }: { endpoint: string; options?: Options },
        callback: Callback<Data> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint: string): string {
        const urlOptions: Options = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<Data>(method: string, endpoint: string, callback: Callback<Data>, options: Options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<Data> => res.json())
            .then((data: Data): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
