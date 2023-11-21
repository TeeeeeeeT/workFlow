import React, { useEffect, useState } from 'react';
import {  history } from "umi";

import '@/assets/style/login.scss';
import accountPng from '@/assets/images/login/default_account0.png';
import bgPng from '@/assets/images/login/defaultbg.png';
import leftPng from '@/assets/images/login/default_left.png';
import pswPng from '@/assets/images/login/default_psw0.png';

import { login } from '@/api/account';
import { getToken, setToken, removeToken } from '@/utils/auth';

const Temp = (props:any) => {
    let [account, setAccount] = useState<string>('');
    let [password, setPassword] = useState<string>('');

    useEffect(() => {
    }, []);

    const onLoginSubmit = (e: any) => {
        e.preventDefault();
        console.log(account);
        // let { account, password } = _this.state.data;
        login({ account: account.trim(), password: password }).then((res: any) => {
            if (res.data) {
                setToken(res.data.token);
            }
            history.push('/');
        }).catch((error: any) => {
            console.log(error);
        });
    }


    return (<form onSubmit={(e) => { onLoginSubmit(e) }}>
        <img src={bgPng} />
        <div className="lr-login-body">
            <div className="lr-login-logo">
                <div className="lr-login-title">
                    科研项目管理平台
                </div>
            </div>
            <div className="lr-login-middle">
                <img src={leftPng} />
                {/* 登录框 正常登录 */}
                <div className="lr-login-main lr-login-normal">

                    {/* 密码登录 */}
                    <div className="lr-login-bypsw noreg">
                        <div className="error_info">*&nbsp;<span>密码不正确</span></div>
                        <div className="lr-login-input">
                            <img className="inp_icon" src={accountPng} alt="" />
                            <input id="lr_username" type="text" placeholder="手机号/帐号" value={account} onChange={(e) => { setAccount(e.target.value) }} />
                        </div>
                        <div className="lr-login-input">
                            <img className="inp_icon" src={pswPng} alt="" />
                            <input id="lr_password" type="password" placeholder="密码" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <span id="psw_change"></span>
                        </div>
                        <button className="lr-login-btn" id="lr_login_btn"><span>登录</span></button>
                        <div className="lr-login-version">版本号：1</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="lr-login-footer"> <p>Copyright © 2019 同方知网技术股股份有限公司</p></div>
    </form>);
}

export default Temp;
