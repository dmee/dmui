(function (window, $) {
	var DM = window.DM || {};
	// 事件中心
	var EventCore = {
		eventList: {},
		// 订阅事件
		sub(eName, eFn) {
			var me = this;
			if (!eName) {
				return false;
			}
			if (!me.eventList[eName]) {
				me.eventList[eName] = []
			}
			me.eventList[eName].push(eFn);
			return true;
		},
		// 取消订阅事件
		removeSub(eName) {
			var me = this;
			if (!eName) {
				return false;
			}
			if (!me.eventList[eName]) {
				return false;
			}
			delete me.eventList[eName];
			return true;
		},
		// 发布事件
		pub(eName, args) {
			var me = this;
			if (!eName) {
				return false;
			}
			var fnList = me.eventList[eName];
			if (!fnList.length) {
				return false;
			}
			for (var i = 0, len = fnList.length; i < len; i++) {
				var tempFn = fnList[i];
				tempFn.apply(me, args);
			}
			return true;
		}
	};
	DM.event = EventCore;
	DM.sub = function (eName, eFn) {
		var me = this;
		return me.event.sub(eName, eFn);
	};
	DM.removeSub = function (eName) {
		var me = this;
		return me.event.removeSub(eName);
	};
	DM.pub = function (eName) {
		var me = this,
			args = Array.prototype.slice.call(arguments, 1);
		return me.event.pub(eName, args);
	};
}(window, jQuery));
