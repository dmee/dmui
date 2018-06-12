(function (window, $) {
    var DM = window.DM || {};
    class Toast {
        constructor(options) {
            let opts = $.extend(true, {
                type: 'success',
                text: '提示信息',
                timeout: 500
            }, options);
            this.options = opts;
        }
        // 展示
        show() {
            this.$el = $(this.toast_temp).appendTo('body');
        }

        // 关闭
        close() {
            let container = this.$el,
                opts = this.options || {};
            if (container) {
                container.fadeOut({
                    duration: 300,
                    complete() {
                        opts.callback && opts.callback();
                        container.remove();
                    }
                });
            }
        }
        // 模板
        get toast_temp() {
            let iconTemp = '',
                wrapClazz = [
                    'dm-toast'
                ];
            switch (this.options.type) {
                case 'success':
                    iconTemp = this.toast_success_icon_temp;
                    wrapClazz.push('dm-toast-success');
                    break;
                case 'failure':
                    iconTemp = this.toast_failure_icon_temp;
                    wrapClazz.push('dm-toast-failure');
                    break;
                default:
                    iconTemp = this.toast_success_icon_temp;
                    wrapClazz.push('dm-toast-success');
            }
            return [
                '<div class="' + wrapClazz.join(' ') + '">',
                '<div class="dm-toast-icon">',
                iconTemp,
                '</div>',
                '<div class="dm-toast-content">' + this.options.text + '</div>',
                '</div>'
            ].join('');
        }
        // 成功图标
        get toast_success_icon_temp() {
            return '<span class="iconfont">&#xe63f;</span>';
        }
        // 失败图标
        get toast_failure_icon_temp() {
            return '<span class="iconfont">&#xe636;</span>';
        }
    }
    DM.showSuccess = (text, options = {}) => {
        let opts = $.extend(true, {
            timeout: 500,
            type: 'success'
        }, options);
        opts.text = text;
        let toast = new Toast(opts);
        toast.show();
        setTimeout(() => {
            toast.close();
        }, opts.timeout);
    };
    DM.showFailure = (text, options = {}) => {
        let opts = $.extend(true, {
            timeout: 500,
            type: 'failure'
        }, options);
        opts.text = text;
        let toast = new Toast(opts);
        toast.show();
        setTimeout(() => {
            toast.close();
        }, opts.timeout);
    };
}(window, jQuery));