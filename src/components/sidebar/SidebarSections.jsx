import IconExample from "../../assets/Icons/shoppingBag.svg"

const sidebarData = [
    {
      title: 'Dashboard',
      link: '/dashboard',
      icon: <img src={IconExample} alt="icon"/>,
      items: [''],
    },
    {
      title: 'Organization',
      link: '/Organization',
      icon: <img src={IconExample} alt="icon"/>,
      items: [{title:'Roles and Permissions', link:'/Roles-Permissions'}, {title:'Actions Log', link:'/Actions-Log'}],
    },
    {
      title: 'Orders',
      link: '/Orders',
      icon: <img src={IconExample} alt="icon"/>,
      items: [{title:'Orders List', link:'/Orders-List'}, {title:'Order Tracking', link:'/Order-Tracking'}],
    },
    {
      title: 'Customers',
      link: '/Customers',
      icon: <img src={IconExample} alt="icon"/>,
      items: [{title:'Customers List', link:'/Customers-List'}],
    },
    {
      title: 'Statistics ',
      link: '/Statistics',
      icon: <img src={IconExample} alt="icon"/>,
      items: [{title:'Reports List', link:'/Reports'}, {title:'Transactions', link:'/Transactions'}],
    },
    {
      title: 'Help Center',
      link: '/Help Center',
      icon: <img src={IconExample} alt="icon"/>,
      items: [''],
    },
  ];
  
export default sidebarData;