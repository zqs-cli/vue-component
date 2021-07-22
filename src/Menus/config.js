const MenusRouteConfig = [
  {
    path: '/admin/a',
    name: 'admina',
    menuName: '菜单一',
    hidden: false,
    // component: Test,
    meta: {
      title: '后台'
    }
  },
  {
    path: '/admin/b',
    name: 'adminb',
    menuName: '菜单2',
    hidden: false,
    // component: Test,
    meta: {
      title: '后台'
    },
    children: [
      {
        path: '/admin/b/a',
        menuName: '222',
      // component: Test
      },
      {
        path: '/admin/b/b',
        menuName: '2333',
      // component: Test
      }
    ]
  },
  {
    path: '/admin/c',
    name: 'adminc',
    menuName: '菜单2',
    hidden: false,
    // component: Test,
    meta: {
      title: '后台'
    },
    children: [
      {
        path: '/admin/c/a',
        menuName: 'ccc',
      // component: Test
      },
      {
        path: '/admin/c/b',
        menuName: '233cc3',
      // component: Test
      }
    ]
  },
]

export default MenusRouteConfig;
