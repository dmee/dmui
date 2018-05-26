(function (window, $) {
    var DM = window.DM || {};

    var HTTPModule = {
        // get请求
        get(url, options = {}) {
            let opts = $.extend(true, {
                url: url,
                type: 'GET'
            }, options);
            return this.request(opts);
        },

        // post请求
        post(url, options) {
            let opts = $.extend(true, {
                url: url,
                type: 'POST'
            }, options);
            return this.request(opts);
        },

        // jsonp跨域
        jsonp(url) {
            let opts = $.extend(true, {
                url: url,
                type: 'JSONP'
            }, options);
            return this.request(opts);
        },

        // 发送服务器请求
        request(options) {
            let me = this,
                opts = $.extend(true, {
                    type: 'GET',
                    dataType: 'json',
                    async: true,
                    timeout: 20000, // 超时时间
                }, options);
            return new Promise((resolve, reject) => {
                // dataType: '' // xml, json, script, or html
                let ajaxParams = {};
                ajaxParams = {
                    url: opts.url,
                    method: opts.type,
                    dataType: opts.dataType,
                    async: opts.async,
                    data: opts.data,
                    timeout: opts.timeout,
                    success(json) {
                        if (json.code == 300) {
                            reject(json);
                        } else if (json.code == 901) {
                            DM.pub('common.user.session.out', json);
                        } else {
                            resolve(json);
                        }
                    },
                    error(json) {
                        reject(json);
                    }
                };
                if (opts.params) {
                    var reqParamsStr = me.convert_params_2_query(opts.params);
                    if (reqParamsStr) {
                        ajaxParams.url = opts.url + '?' + reqParamsStr;
                    }
                }
                $.ajax(ajaxParams);
            });
        },

        // convert request params
        convert_params_2_query(params = {}) {
            let hasOwn = Object.prototype.hasOwnProperty,
                queryArr = [];
            for (var key in params) {
                if (hasOwn.call(params, key)) {
                    let value = params[key];
                    if (!DM.isUndefined(value)) {
                        queryArr.push(key + '=' + params[key]);
                    }
                }
            }
            return queryArr.length ? queryArr.join('&') : '';
        }
    };
    DM.http = HTTPModule;
}(window, jQuery));