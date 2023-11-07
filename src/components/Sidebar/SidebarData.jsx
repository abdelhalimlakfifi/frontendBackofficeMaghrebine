import { CustomersIcon, HomeOutlinedIcon, Permissions, ShoppingCartIcon, StatisticsIcon, HelpOutlineIcon } from "./SidebarIcons"

const sidebarData = [
    {
      title: 'Dashboard',
      items: '/dashboard',
      icon: <HomeOutlinedIcon/>
    },
    {
      title: 'Organization',
      icon: <Permissions/>,
      items: ['Roles and Permissions', 'Actions History'],
    },
    {
      title: 'Orders',
      icon: <ShoppingCartIcon/>,
      items: ['Orders List', 'Order Details', 'Order Tracking'],
    },
    {
      title: 'Customers',
      icon: <CustomersIcon/>,
      items: ['Customer List Page', 'Customer Detail Page', 'Edit Customer Page'],
    },
    {
      title: 'Statistics ',
      icon: <StatisticsIcon/>,
      items: ['Search Terms Report', 'Payments and Transactions'],
    },
    {
      title: 'Help Center',
      icon: <HelpOutlineIcon/>,
      items: ['General', 'Specific'],
    },
  ];
  
export default sidebarData;
  