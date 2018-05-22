(function (window, $) {
	var DM = window.DM || {};
	/*
		Mask plugins
	*/

	class Mask {
		// 插件初始化
		constructor() {

		}
		// 显示遮罩层
		open() {
			this.$el = $(this.temp).appendTo('body');
		}
		// 关闭遮罩层
		close() {
			if (this.$el) {
				this.$el.remove();
			}
		}
		// 关闭全部遮罩层
		closeAll() {
			$("body").find(".dm-mask").remove();
		}
		get temp() {
			return '<div class="dm-mask"></div>';
		}
	}
	// 显示遮罩层
	DM.showMask = (options) => {
		let mask = new Mask();
		mask.open();
		return mask;
	};
	// 关闭遮罩层
	DM.closeMask = (instance) => {
		let mask = new Mask();
		mask.closeAll();
		return true;
	};

}(window, jQuery));
