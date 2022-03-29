import request from '@/utils/request'
export function findTAHIO(data) {
    return request({
        url: `/rtst/cabinet/findTAHIO?id=${data}`,
        headers: {
            isToken: true
        },
        method: 'get',

    })
}