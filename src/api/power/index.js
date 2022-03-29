import request from '@/utils/request'
export function findTotalCircuit(data) {
    return request({
        url: '/rtst/cabinet/findTotalCircuit',
        headers: {
            isToken: true
        },
        method: 'get',
        params: data
    })
}