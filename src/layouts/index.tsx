import { Outlet } from 'umi';
// import styles from './index.less';
import BaseView from '@/common/baseView';

export default function Layout() {
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

