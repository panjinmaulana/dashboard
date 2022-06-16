import { MdSpaceDashboard } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import { FaUserPlus, FaSearch } from 'react-icons/fa';

const routes = [
  {
    title: 'Dashboard',
    path: '/',
    icon: MdSpaceDashboard,
  },
  {
    title: 'Users',
    path: '/users',
    icon: HiUsers,
  },
  {
    title: 'Registration',
    path: '/registration',
    icon: FaUserPlus,
  },
  {
    title: 'Search',
    path: '/search',
    icon: FaSearch,
  },
];

export default routes;