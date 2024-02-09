import request from '@/utils/request';

export function login(data) {
    return request({
        url: '/api/workflow/account/login',
        method: 'post',
        data
    })
}

