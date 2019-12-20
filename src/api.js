import axios from 'axios'
axios.defaults.withCredentials = true
export const getRequest = url => {
    return axios({
        method: 'get',
        url: url,
    }).then(function(res){
        return res.data
    })
}

export const postRequest = (url, data) => {
    return axios({
        method: 'post',
        url: url,
        data: data,
    })
}