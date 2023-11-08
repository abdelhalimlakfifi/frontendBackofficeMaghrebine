
export const SidebarData = [
    {
      title: 'Dashboard',
      link: '/dashboard',
      icon: "pi pi-home flex justify-center",
      items: [],
    },
    {
      title: 'Organization',
      link: '/Organization',
      icon: "pi pi-lock flex justify-center",
      items: [{title:'Roles and Permissions', link:'/Roles-Permissions'}, {title:'Actions Log', link:'/Actions-Log'}],
    },
    {
      title: 'Orders',
      link: '/Orders',
      icon: "pi pi-shopping-bag  flex justify-center",
      items: [{title:'Orders List', link:'/Orders-List'}, {title:'Order Tracking', link:'/Order-Tracking'}],
    },
    {
      title: 'Customers',
      link: '/Customers',
      icon: "pi pi-users flex justify-center",
      items: [{title:'Customers List', link:'/Customers-List'}],
    },
    {
      title: 'Statistics ',
      link: '/Statistics',
      icon: "pi pi-chart-bar flex justify-center",
      items: [{title:'Reports List', link:'/Reports'}, {title:'Transactions', link:'/Transactions'}],
    },
    {
      title: 'Help Center',
      link: '/Help-Center', // or '/HelpCenter'
      icon: "pi pi-shopping-bag  flex justify-center",
      items: [],
    }
  ];
  
