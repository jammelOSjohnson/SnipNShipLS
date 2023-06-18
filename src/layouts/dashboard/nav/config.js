// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'view packages',
    path: '/dashboard/packages',
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

export default navConfig;
