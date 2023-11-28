import request from '@/utils/request';

export async function schemeGetPageList(data) {
    return request({
        url: '/workflow/schemeInfo/getPageList',
        method: 'get',
        data
    })
}

export async function schemeInfoSaveForm(data) {
    return request({
        url: '/workflow/schemeInfo/SaveForm',
        method: 'post',
        data
    })
}

