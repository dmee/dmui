(function (window, $) {
    var DM = window.DM || {};
    /*
    	Dialog plugins
    */

    // 弹框
    DM.dialog = (options) => {
        let dialog = new Dialog(options);
        dialog.show();
        return dialog;
    };
    // 提示框
    DM.alert = (content, okFn) => {
        let dialog = new Dialog({
            type: 'alert',
            showHead: false,
            showTitle: false,
            content: content,
            ok: okFn || function () {},
            showOk: true,
            showCancel: false,
            showFoot: true,
            showClose: false
        });
        dialog.show();
        return dialog;
    };
    // 确认框
    DM.confirm = (options) => {
        let opts = $.extend(true, {
            type: 'confirm',
            showHead: false,
            showTitle: false,
            content: '',
            ok: function () {},
            okVal: '确 定',
            cancel: function () {},
            cancelVal: '取 消',
            showOk: true,
            showCancel: true,
            showFoot: true,
            showClose: false
        }, options);
        let dialog = new Dialog(opts);
        dialog.show();
        return dialog;
    };
    // 输入框
    DM.prompt = (options) => {
        let defaultPrompt = [
            '<div class="dm-dialog-prompt-wrap">',
            '<span class="note-wrap">请输入：</span>',
            '<span class="input-wrap"><input class="dm-dialog-prompt-input" type="text" /></span>',
            '</div>',
        ].join('');
        let opts = $.extend(true, {
            type: 'prompt',
            showHead: false,
            showTitle: false,
            content: defaultPrompt,
            ok: function () {},
            okVal: '确 定',
            cancel: function () {},
            cancelVal: '取 消',
            showOk: true,
            showCancel: true,
            showFoot: true,
            showClose: false
        }, options);
        if (!options.content) {
            opts.isDefault = true;
        }
        let dialog = new Dialog(opts);
        dialog.show();
        return dialog;
    };

    class Dialog {
        constructor(options = {}) {
            if (!DM.isObject(options)) {
                console.error('[DM]弹窗构造函数参数类型有误...');
                return false;
            }
            let opts = $.extend(true, {
                title: '新建弹窗',
                showHead: true,
                showTitle: false,
                content: '',
                ok() {},
                okVal: '确 定',
                showOk: false,
                okClass: 'dm-btn-primary',
                cancel() {},
                cancelVal: '取 消',
                showCancel: true,
                cancelClass: 'dm-btn-danger',
                showFoot: false,
                showClose: false,
                animation: 'bounceIn'
            }, options);
            this.options = opts;
        }

        // 显示弹框
        show() {
            this.$el = $(this.dialog_temp).appendTo('body');
            this.options.$el = this.$el;
            this.bind_event();
        }
        // 关闭弹框
        close() {
            var options = this.options || {};
            options.close && options.close();
            this.unbind_event();
            this.options = null;
            if (this.$el) {
                this.$el.remove();
                this.$el = null;
            }
        }
        // 显示后回调
        time(timeout, fn) {
            var me = this;
            setTimeout(() => {
                fn && fn.call(me);
            }, timeout);
            return this;
        }
        // 事件绑定
        bind_event() {
            let me = this,
                container = this.$el,
                options = me.options || {};
            container.on('click', function (e) {
                var target = $(e.target);
                if (target.hasClass('btn-ok')) {
                    var okFnRes = true;
                    if (options.type == 'prompt') {
                        if (options.isDefault) {
                            var promptVal = $.trim(container.find('.dm-dialog-prompt-input').val());
                            okFnRes = options.ok && options.ok(promptVal);
                        } else {
                            okFnRes = options.ok && options.ok(me);
                        }
                    } else {
                        okFnRes = options.ok && options.ok(me);
                    }
                    if (DM.isUndefined(okFnRes) || (DM.isBoolean(okFnRes) && okFnRes)) {
                        me.close();
                    }
                } else if (target.hasClass('btn-cancel')) {
                    me.close();
                }
            });
            // 默认输入框聚焦
            if (options.type == 'prompt') {
                if (options.isDefault) {
                    container.find('.dm-dialog-prompt-input').focus();
                }
            }
        }
        // 事件解绑
        unbind_event() {
            let container = this.$el;
            container.off('click');
        }
        // 返回弹窗模板
        get dialog_temp() {
            let options = this.options,
                dialogClass = [
                    'dm-dialog',
                    'animated',
                    options.animation
                ];
            switch (options.type) {
                case 'alert':
                    dialogClass.push('dm-dialog-alert');
                    break;
                case 'confirm':
                    dialogClass.push('dm-dialog-confirm');
                    break;
                case 'prompt':
                    dialogClass.push('dm-dialog-prompt');
                    break;
                default:
            }
            return [
                '<div class="dm-mask dm-dialog-wrap">',
                '<div class="' + dialogClass.join(' ') + '">',
                options.showHead ? this.dialog_head_temp : '',
                this.dialog_content_temp,
                options.showFoot ? this.dialog_foot_temp : '',
                '</div>',
                '</div>'
            ].join('');
        }
        // 返回标题模板
        get dialog_head_temp() {
            let options = this.options;
            return [
                '<div class="dm-dialog-head">',
                options.showTitle ? options.title || '' : '',
                '</div>',
            ].join('');
        }

        // 返回内容模板
        get dialog_content_temp() {
            let options = this.options;
            return [
                '<div class="dm-dialog-content">',
                options.content || '',
                '</div>',
            ].join('');
        }

        // 返回底部模板
        get dialog_foot_temp() {
            let options = this.options;
            return [
                '<div class="dm-dialog-foot">',
                '<a href="javascript:void(0);" class="dm-btn ' + options.okClass + ' ' + (!options.showCancel ? 'dm-btn-block' : '') + ' btn-ok">',
                options.okVal || '',
                '</a>',
                options.showCancel ? '<a href="javascript:void(0);" class="dm-btn ' + options.cancelClass + ' btn-cancel">' + (options.cancelVal || '') + '</a>' : '',
                '</div>',
            ].join('');
        }
    }
}(window, jQuery));