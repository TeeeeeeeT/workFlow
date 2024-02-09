import { useLocation, Outlet } from 'umi';
import BaseView from '@/common/baseView';

export default function Layout() {
    const location = useLocation();
    if (location.pathname === '/login') {
        return <Outlet />
    }

    return (
        <BaseView><Outlet /></BaseView>
    );
}