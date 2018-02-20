class CertificatesUrlService {
    constructor() {
        this._gcBaseUrl = 'https://localhost:8888/gift-certificate-system/gift-certificates?';
    }

    buildUrlToGC(page, size, filters) {
        return this.buildUrl(this._gcBaseUrl, page, size, filters);
    }

    buildUrl(url, page, size, filters) {
        if (filters) {
            Object.keys(filters).forEach((key) => {
                url += key;
                url += '=';
                url += filters[key];
                url += '&';
            });
        }
        return url + 'page=' + page + '&size=' + size;
    }
}

export default CertificatesUrlService;