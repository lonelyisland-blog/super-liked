import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.like.co',
    timeout: 10000
});

const api = {
    getGlobalList(config) {
        const params = new URLSearchParams();
        params.append('after', config.after);
        params.append('before', config.before);
        params.append('limit', config.limit);
        return instance.get(`/like/share/latest`, { params })
    },
    getLatestContent(config) {
        const params = new URLSearchParams();
        params.append('after', config.after);
        params.append('before', config.before);
        params.append('limit', config.limit);
        return instance.get(`/like/info/latest`, { params })
    },
    getSuperLikeInfo(config) {
        const params = new URLSearchParams();
        params.append('url', config.url);
        params.append('LIKE', config.LIKE);
        return instance.get(`/like/info`, { params })
    }
}
export default api;

//   https://api.like.co/like/share/latest?after=&before&limit=20
