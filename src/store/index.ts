import { createStore } from 'vuex'

// 动态导入 './modules' 目录下的所有 .ts 文件
const modulesFiles = import.meta.glob('./modules/*.ts')

interface Module {
  namespaced?: boolean;
  state?: any;
  mutations?: { [key: string]: (state: any, payload: any) => void };
  actions?: { [key: string]: (context: any, payload: any) => void };
  getters?: { [key: string]: (state: any) => any };
}

const modules: { [key: string]: Module } = {}

// 处理导入的模块
const loadModules = async () => {
  const promises = Object.keys(modulesFiles).filter(path => !path.endsWith('interface.ts')).map(async (path) => {
    const module = await modulesFiles[path]();
    modules[path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')] = (module as { default: Module }).default;
  });

  await Promise.all(promises);
};

// 创建并导出 store
const createStoreAsync = async () => {
  await loadModules(); // 等待所有模块加载完成
  return createStore({
    modules,
    getters: {},
  });
};

// 导出一个函数，调用时返回 store
export const getStore = createStoreAsync();


