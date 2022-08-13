interface ReqConfig {
    url: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'OPTIONS';
    header?: object;
    data?: object;
    params?: object;
}
// TODO 适配xhr的header设置
export async function http(config: ReqConfig) {
    const baseUrl = '/auth'
    console.log(config);
    let url = config.url
    const params = config.params;
    let body;
    if (config.data) {
        body = JSON.stringify(config.data);
    }
    url = `${baseUrl}${url}`;
    if (params && JSON.stringify(params) !== '{}') {
        url += `${Object.values(params).join('&')}`
    }
    if (window.fetch) {
        const fetchConf = {
            ...config,
            body,
            Credential: '*same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await window.fetch(url, fetchConf);     
        return res.json();
    } else {
        return new Promise((resolve, reject) => {
            let xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xhr.setRequestHeader('Content-Type', 'application-/x-www-form-urlencoded')
            xhr.open(config.method, url, true);
            if (config.method === 'POST' || config.method === 'PUT') {
                xhr.send(JSON.stringify(config.data))
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        let res = xhr.response;
                        if (typeof res !== 'object') {
                            res = JSON.parse(res);
                        }
                        resolve(res);
                    }   
                }
            }
        })
    }
}

export default function (app, options) {
    app.config.globalProperties.$http = http;
}