import React from 'react';
import { useLocation, Outlet, useOutletContext, useOutlet } from 'umi';
import Login from '@/pages/login/index';
import BaseView from '@/common/baseView';
import { getUrlVars } from '@/common/common';
// import List from '@/pages/workflow/scheme/list';

export default function Layout() {
    const location = useLocation();
    if (location.pathname === '/login') {
        return <Login></Login>
    }

    // let params: any = {};
    // let urlParams = getUrlVars(location.search);
    // Object.assign(urlParams, params);
    // params = { ...urlParams };

    // console.log(useOutletContext());
    // let tt = useOutlet()
    // console.log('useOutlet', tt);
    // if (tt) {
    //     // tt.props.params = urlParams;
    //     // let tempProps = { ...tt.props };
    //     // Object.assign(tempProps, { params: urlParams });
    //     // tt.props = { ...tempProps };

    //     console.log('tt.props',tt.props)
    //     Object.assign(tt.props, { value: urlParams });
    // }

    return (
        <BaseView><Outlet /></BaseView>
    );
}