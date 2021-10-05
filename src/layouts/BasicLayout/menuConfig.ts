const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: 'Home',
    path: '/',
    icon: 'chart-pie',
  },
  {
    name: 'About',
    path: '/about',
    icon: 'chart-pie',
  },
  {
    name: 'Login',
    path: '/login',
    icon: 'account',
  },
  {
    name: 'Register',
    path: '/register',
    icon: 'account',
  },
  {
    name: 'Angular',
    icon: 'set',
    children: [
      {
        path: '/angular',
        name: 'router contact',
      },
      {
        path: '/angular/detail',
        name: 'router detail',
      },
    ],
  },
  {
    name: 'Merchant platform',
    icon: 'atm',
    children: [
      {
        path: '/seller',
        name: 'Merchant Homepage',
      },
      {
        path: '/seller/list',
        name: 'Merchant list',
      },
      {
        path: '/seller/detail',
        name: 'Merchant details',
      },
      {
        path: '/seller/404',
        name: 'Merchant 404',
      },
    ],
  },
  {
    name: 'Small second platform',
    icon: 'account',
    children: [
      {
        path: '/waiter',
        name: 'Home page',
      },
      {
        path: '/waiter/list',
        name: 'Little two list',
      },
      {
        path: '/waiter/detail',
        name: 'Little two details',
      },
      {
        path: '/waiter/404',
        name: 'Koji 404',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
