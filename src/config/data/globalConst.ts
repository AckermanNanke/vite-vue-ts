// 全局变量key值
export const ACCESS_TOKEN: dataType.ACCESS_TOKEN = "ACCESS_TOKEN"
export const enum sceneValue {
  "reset-password" = 0
}
export const menu: Array<dataType.menuItem> = [
  {
    id: "1",
    name: "导航菜单1",
    children: [{
      id: "11",
      name: "子菜单1",
      children: [
        {
          id: "112",
          name: "子菜单1",
        },
        {
          id: "113",
          name: "子菜单1",
        }
      ]
    }, {
      id: "12",
      name: "子菜单2",
    }, {
      id: "13",
      name: "子菜单3",
    }, {
      id: "14",
      name: "子菜单4",
    }]
  },
  {
    id: "2",
    name: "导航菜单1",
    children: [{
      id: "21",
      name: "子菜单1",
    }, {
      id: "22",
      name: "子菜单2",
    }, {
      id: "23",
      name: "子菜单3",
    }, {
      id: "24",
      name: "子菜单4",
    }]
  },
  {
    id: "3",
    name: "导航菜单1",
    children: [{
      id: "31",
      name: "子菜单1",
    }, {
      id: "32",
      name: "子菜单2",
    }, {
      id: "33",
      name: "子菜单3",
    }, {
      id: "34",
      name: "子菜单4",
    }]
  }
]