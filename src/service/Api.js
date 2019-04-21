import axios from 'axios'
import { STORAGE_TOKEN } from '../consts/webConst';

function getHeader() {
    const token = localStorage.getItem(STORAGE_TOKEN)
    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
}

const Api = base => {
    const client = axios.create({
        baseURL: base
    })

    const get = endpoint => client.get(endpoint,
        getHeader()
    )

    const post = (endpoint, data) => client.post(endpoint, data,
        getHeader()
    )

    const del = endpoint => client.delete(endpoint,
        getHeader()
    )

    const update = (endpoint, data) => client.patch(endpoint, data,
        getHeader()
    )

    return {
        getUser: id => get(`/users/${id}`),
        getUsers: () => get('/users'),
        deleteUser: id => del(`/users/${id}`),
        updateUser: user => update(`/users/${user.id}`, user),

        getRuns: filter => get(`/runs${filter}`),
        createRun: run => post(`/runs`, run),
        removeRun: id => del(`/runs/${id}`),

        login: user => post('/users/login', user),
        auth: () => {
            const response = get('/users/me')
            return response
        },

        updateProfile: user => update(`/users/${user.id}`, user),
        createProfile: user => post('/users/', user),
    }
}

export default Api