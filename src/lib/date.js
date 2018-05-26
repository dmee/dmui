(function (window, $) {
    var DM = window.DM || {};
    var DateModule = {
        // 时间格式化
        format(value, formatStr = 'yyyy-mm-dd hh:MM:ss') {
            var me = this;
            if (!value) {
                return '';
            }
            let dateObj = new Date(value),
                year = dateObj.getFullYear(), // 年
                month = dateObj.getMonth() * 1 + 1, // 月
                zeroFillMonth = me._fn_zero_fill(month, 2), // 月-补零
                day = dateObj.getDate(), // 日
                zeroFillDay = me._fn_zero_fill(day, 2), // 日-补零
                hours = dateObj.getHours(), // 小时
                zeroFillHours = me._fn_zero_fill(hours, 2), // 小时-补零
                minutes = dateObj.getMinutes(), // 分钟
                zeroFillMinutes = me._fn_zero_fill(minutes, 2), // 分钟-补零
                seconds = dateObj.getSeconds(), // 秒
                zeroFillSeconds = me._fn_zero_fill(seconds, 2); // 秒-补零

            formatStr = formatStr.replace(/yyyy/i, year);
            formatStr = formatStr.replace(/mm/, zeroFillMonth);
            formatStr = formatStr.replace(/m/, month);
            formatStr = formatStr.replace(/dd/i, zeroFillDay);
            formatStr = formatStr.replace(/d/, day);
            formatStr = formatStr.replace(/hh/i, zeroFillHours);
            formatStr = formatStr.replace(/h/, hours);
            formatStr = formatStr.replace(/MM/, zeroFillMinutes);
            formatStr = formatStr.replace(/M/, minutes);
            formatStr = formatStr.replace(/ss/i, zeroFillSeconds);
            formatStr = formatStr.replace(/s/, seconds);
            return formatStr;
        },
        // 位数补零
        _fn_zero_fill(value, totalLen = (value + '').length) {
            let valStr = value + '',
                leftLen = totalLen - valStr.length,
                valArr = valStr.split(''),
                zeroStr = '';
            if (leftLen > 0) {
                for (var i = 0; i < leftLen; i++) {
                    zeroStr += '0';
                }
                valArr.splice(0, 0, zeroStr);
                return valArr.join('');
            } else {
                return valStr;
            }
        }
    };
    DM.date = DateModule;
}(window, jQuery));