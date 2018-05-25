(function (window, $) {
    var DM = window.DM || {};
    var RouterModule = {
        // 重定向
        redirect(url = '/', options = {}) {
            let redirectUrl = url,
                hasOwn = Object.prototype.hasOwnProperty,
                opts = $.extend(true, {
                    query: {}
                }, options);
            if (url === '') {
                return false;
            }
            let query = opts.query,
                queryArr = [];
            if (!DM.isUndefined(query)) {
                for (let key in query) {
                    if (key && hasOwn.call(query, key) && !DM.isUndefined(query[key])) {
                        queryArr.push(key + '=' + query[key]);
                    }
                }
            }
            if (queryArr.length) {
                location.href = redirectUrl + '?' + queryArr.join('&');
            } else {
                location.href = redirectUrl;
            }
        },
        // 获取请求参数
        getQuery() {
            let searchStr = location.search.substr(1);
            if (!searchStr.length) {
                return {};
            }
            let queryObj = {},
                searchArr = searchStr.split('&');
            for (let i = 0, len = searchArr.length; i < len; i++) {
                let tempSearch = searchArr[i];
                if (tempSearch) {
                    let tempSearchArr = tempSearch.split('=');
                    queryObj[tempSearchArr[0]] = tempSearchArr[1];
                }
            }
            return queryObj;
        }
    };
    DM.redirect = RouterModule.redirect;
    DM.route = RouterModule;
}(window, jQuery));