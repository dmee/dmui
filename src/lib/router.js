(function (window, $) {
	var DM = window.DM || {};
	// 重定向
	DM.redirect = (url = '/', options = {}) => {
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
	};
}(window, jQuery));
