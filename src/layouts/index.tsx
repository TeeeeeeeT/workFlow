import { useLocation, Outlet } from 'umi';
import Login from '@/pages/login/index';
import BaseView from '@/common/baseView';

export default function Layout() {
    const location = useLocation();
    if (location.pathname === '/login') {
        return <Login></Login>
    }
    // var url = window.location.href;

    // var params: any = {}, hash;
    // var hashes: any = [];
    // if (url.indexOf('?') > -1) {
    //     hashes = url.slice(url.indexOf('?') + 1).split('&');
    // }

    // for (var i = 0; i < hashes.length; i++) {
    //     hash = hashes[i].split('=');
    //     params[hash[0]] = hash[1];
    // }
    // console.log('params', params);

    return (
        <BaseView><Outlet /></BaseView>
    );
}