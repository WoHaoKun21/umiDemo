let test = {
  namespace: 'test',
  state: {
    count: 0,
    name: '石鹏飞',
  },

  reducers: {
    add(state: any, { payload }: any) {
      // console.log(state, payload); // 打印自身state和传过来的数据
      return { ...state, ...payload };
    },

    changeName(state: any, { payload }: any) {
      console.log(state); // 打印自身state和传过来的数据
      return { ...state, ...payload };
    },
  },
  effects: {
    *getUser(action: any, method: any) {
      console.log('异步请求数据：', action, method);
    },
  },
};
export default test;
