import { v4 as uuid } from 'uuid';

export const DashboardMenu = (userRole) => {
  // Define menu items based on user role
  let menuItems = [
    {
      id: uuid(),
      title: 'Dashboard',
      icon: 'home',
      link: '/admin/dashboard'
    },
    // {
    //   id: uuid(),
    //   title: 'Users',
    //   icon: 'users',
    //   link: '/admin/pages/users'
    // },
  // {
  //   id: uuid(),
  //   title: 'Blog Category',
  //   icon: 'book',
  //   link: '/admin/pages/blogscategoty/category'
  // },
	{
		id: uuid(),
		title: 'Blogs',
		icon: 'book',
		link: '/admin/pages/blogs/blogs'
	},

  ];

//   // Add additional menu items based on user role
  if (userRole === 'Admin') {
    menuItems.push({
		id: uuid(),
		title: 'Users',
		icon: 'users',
		link: '/admin/pages/users'
    });
  }

  if (userRole === 'Admin') {
    menuItems.push({
		id: uuid(),
    title: 'Blog Category',
    icon: 'book',
    link: '/admin/pages/blogscategoty/category'
    });
  }


//   // Example of using submenus based on role
//   if (userRole === 'Admin' || userRole === 'Sub-Admin') {
//     menuItems.push({
//       id: uuid(),
//       title: 'Settings',
//       icon: 'cog',
//       children: [
//         { id: uuid(), link: '/admin/settings/profile', name: 'Profile' },
//         { id: uuid(), link: '/admin/settings/general', name: 'General' }
//       ]
//     });
//   }

  return menuItems;
};

export default DashboardMenu;
