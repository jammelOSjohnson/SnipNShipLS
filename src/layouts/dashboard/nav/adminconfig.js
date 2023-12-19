// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navadminConfig = [
  {
    title: 'dashboard',
    path: '/admindashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'add package',
    path: '/admindashboard/addpackage',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'view users',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('ic_user'),
  },
  {
    title: 'calculator',
    path: '/dashboard/calculator',
    icon: icon('ic_calculator'),
  },
  {
    title: 'logout',
    path: '/',
    icon: icon('ic_logout'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navadminConfig;
