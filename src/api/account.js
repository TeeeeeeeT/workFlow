import request from '@/utils/request';

export function login(data) {
    return request({
        url: '/workflow/account/login',
        method: 'post',
        data
    })
}

