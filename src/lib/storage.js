(function (window, $) {
    var DM = window.DM || {};
    var StorageModule = {
        set(key, value) {
            if (!localStorage) {
                return false;
            }
            if (typeof key != 'undefined' && key != '' && key != null) {
                localStorage.setItem(key, value)
            }
        },
        get(key) {
            if (!localStorage) {
                return null;
            }
            return localStorage.getItem(key);
        }
    };
    DM.storage = StorageModule;
}(window, jQuery));