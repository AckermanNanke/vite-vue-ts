/**
 * 声明项目公共属性数据类型
 */
declare namespace dataType {
  type ACCESS_TOKEN = string
  // 用户信息
  interface userInfo {
    userID: string;
    userphone: string;
    userEmail: string;
    username: string;
  }
  interface menuItem {
    id: string
    name: string
    children?: Array<menuItem>
  }
}

