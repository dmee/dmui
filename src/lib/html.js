(function (window, $) {
	$.fn.iFocus = function (options, value) {
		this.attr('readonly', 'readonly').focus().removeAttr('readonly');
		return this;
	};
	// 手动聚焦方法
	HTMLElement.prototype.iFocus = function (opts = {
		select: false
	}) {
		this.setAttribute('readonly', 'readonly');
		this.focus();
		this.removeAttribute('readonly');
		if (opts.select) {
			this.select();
		}
	};
}(window, jQuery));
