(function (window, $) {
	var DM = window.DM || {};
	// 模块核心对象
	var ModuleCore = {
		// 模块集合
		module_map: new Map(),

		// 添加模块
		add_module(name, moduleObj) {
			if (!DM.isString(name) || name === '') {
				console.error('[DM]模块名称不合法...');
				return false;
			}
			if (this.module_map.has(name)) {
				console.error('[DM]模块重复定义...');
				return false;
			}
			this.module_map.set(name, moduleObj);
			return moduleObj;
		}, // 获取模块
		get_Module(name) {
			if (!DM.isString(name) || name === '') {
				console.error('[DM]模块名称不合法...');
				return false;
			}
			if (this.module_map.has(name)) {
				return this.module_map.get(name);
			}
			return false;
		}
	};

	// 模块定义
	DM.define = (name, moduleObj) => {
		return ModuleCore.add_module(name, moduleObj);
	};

	// 模块获取
	DM.require = (name) => {
		return ModuleCore.get_Module(name);
	};
}(window, jQuery));
