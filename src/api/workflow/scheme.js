import request from '@/utils/request';

export async function schemeGetPageList(data) {
    return request({
        url: '/api/workflow/schemeInfo/getPageList',
        method: 'get',
        data
    })
}

export async function schemeInfoGetFormById(data) {
    return request({
        url: '/api/workflow/schemeInfo/GetFormDataById',
        method: 'get',
        params: data
    })
}

export async function schemeInfoSaveForm(data) {
    return request({
        url: '/api/workflow/schemeInfo/SaveForm',
        method: 'post',
        data
    })
}

export async function schemeInfoDeleteInfoById(data) {
    return request({
        url: '/api/workflow/schemeInfo/DeleteInfoById',
        method: 'delete',
        params: data
    })
}

