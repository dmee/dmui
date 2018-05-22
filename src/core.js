(function (window, $) {
	var DM = {
		// 返回基本类型
		typeof (value) {
			return typeof value;
		},

		// 是否是undefined
		isUndefined(value) {
			return this.typeof(value) === 'undefined';
		},

		// 是否boolean
		isBoolean(value) {
			return this.typeof(value) === 'boolean';
		},

		// 是否字符串类型
		isString(value) {
			return typeof value === 'string';
		},
		// 是否对象类型
		isObject(value) {
			return this.toString(value) === '[object Object]';
		},
		toString(value) {
			return Object.prototype.toString.call(value);
		}
	};
	window.DM = DM;
}(window, jQuery));
