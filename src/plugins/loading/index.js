(function (window, $) {
	var DM = window.DM || {};
	/*
		Loading plugins
	*/
	class Loading {
		constructor(options = {}) {
			if (typeof options === 'string') {
				this.content = options;
			} else if (DM.isObject(options)) {
				this.loadingType = options.type || 'snake';
			}
		}
		// 打开loading
		open() {
			this.$el = $(this.temp_loader).appendTo('body');
		}
		// 关闭loading
		close() {
			if (this.$el) {
				this.$el.remove();
			}
		}
		// 关闭全部loading
		closeAll() {
			$("body").find('.dm-loading').remove();
		}
		get temp_loader() {
			let loadingContent = '';
			switch (this.loadingType) {
				case 'snake':
					loadingContent = this.temp_snake_loader;
					break;
				case 'circle':
					loadingContent = this.temp_circle_loader;
					break;
				default:
					loadingContent = this.temp_snake_loader;

			}

			let loadTemp = [
				'<div class="dm-mask dm-loading">',
				loadingContent,
				'</div>'
			];
			return loadTemp.join('');
			this.temp_snake_loader;
		}
		// 模板
		get temp_circle_loader() {
			return [
				'<div class="loading-circle">',
				'<div class="circle-line">',
				'<div class="circle circle-blue"></div>',
				'<div class="circle circle-blue"></div>',
				'<div class="circle circle-blue"></div>',
				'</div>',
				'<div class="circle-line">',
				'<div class="circle circle-yellow"></div>',
				'<div class="circle circle-yellow"></div>',
				'<div class="circle circle-yellow"></div>',
				'</div>',
				'<div class="circle-line">',
				'<div class="circle circle-red"></div>',
				'<div class="circle circle-red"></div>',
				'<div class="circle circle-red"></div>',
				'</div>',
				'<div class="circle-line">',
				'<div class="circle circle-green"></div>',
				'<div class="circle circle-green"></div>',
				'<div class="circle circle-green"></div>',
				'</div>',
				'</div>',
			].join('');
		}
		get temp_snake_loader() {
			return [
				'<div class="snake-loader">',
				'<div class="dot">',
				'<div class="first"></div>',
				'</div>',
				'<div class="dot"></div>',
				'<div class="dot"></div>',
				'<div class="dot"></div>',
				'</div>'
			].join('')
		}
	}
	// 显示loading
	DM.showLoading = (options) => {
		let loading = new Loading(options);
		loading.open();
		return loading;
	};
	// 关闭loading
	DM.closeLoading = () => {
		let loading = new Loading();
		loading.closeAll();
		return true;
	};
}(window, jQuery));
