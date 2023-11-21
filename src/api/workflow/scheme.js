import request from '@/utils/request';

export async function schemeGetPageList(data) {
    return request({
        url: '/workflow/schemeInfo/getPageList',
        method: 'get',
        data
    })
}

