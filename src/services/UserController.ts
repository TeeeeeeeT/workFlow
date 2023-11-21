import request from "umi-request";

export async function queryUserList(
    params: {
        // query
        /** keyword */
        keyword?: string;
        /** current */
        current?: number;
        /** pageSize */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request('/api/v1/getMenuList', {
        method: 'GET',
        params: {
            // ...params,
        },
        ...(options || {}),
    });
}