import request from '@/utils/request';

export async function processCreateFlow(data) {
    return request({
        url: '/api/workflow/process/createFlow',
        method: 'post',
        data
    })
}