// 运行时配置
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '石鹏飞' };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  // console.log("运行时的配置：", initialState);
  return {
    logo: null,
    menu: {
      locale: false,
    },
    // onPageChange: () => {
    //   const { currentUser } = initialState;
    //   const { location } = history;
    //   // 如果没有登录，重定向到 login
    //   if (!currentUser && location.pathname !== "/user/login") {
    //     history.push("/user/login");
    //   }
    // },
    ...initialState?.settings,
  };
};
