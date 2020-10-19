import AsyncStorage from "@react-native-community/async-storage";

const { default: Axios } = require("axios");
const { default: server } = require("./server");

const rocket = Axios.create({
    // baseURL: server.BASE_URL,
    baseURL: server.BASE_URL,
    timeout: 1000 * 10,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
})

class ApiClient {
    constructor(_instance) {
        this.instance = _instance ? _instance : rocket
    }

    fetch(url, params) {
        return new Promise((resolve, reject) => {
            this.instance.get(url, {
                params
            })
                .then(res => {
                    console.log(res.data, 'FETCH DATA')
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            this.instance.post(url, data)
                .then(res => {
                    console.log(res.data, 'response')
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)

                })
        })
    }

    login(data) {
        return new Promise((resolve, reject) => {
            this.post('login', data)
                .then(response => {
                    console.log(response)
                    const userData = response.data
                    AsyncStorage.setItem('user', JSON.stringify(userData))
                    this.setDefaultHeader(userData)
                    resolve(response)

                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    setDefaultHeader({ userId, authToken }) {
        this.instance.defaults.headers.common['X-User-Id'] = userId
        this.instance.defaults.headers.common['X-Auth-Token'] = authToken
    }
}

export default new ApiClient()