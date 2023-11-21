import { useLocation, Outlet } from 'umi';
// import styles from './index.less';
import Login from '@/pages/login/index';
import BaseView from '@/common/baseView';

export default function Layout() {
  const location = useLocation();
  if (location.pathname === '/login') {
    return <Login></Login>
  }

  return (
    <BaseView><Outlet /></BaseView>
    // <div className={styles.navs}>
    //   <ul>
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/docs">Docs</Link>
    //     </li>
    //     {/* <li>
    //       <a href="https://github.com/umijs/umi">Github</a>
    //     </li> */}
    //   </ul>
    //   <Outlet />
    // </div>
  );
}

