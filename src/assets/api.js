import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.like.co',
    timeout: 10000
});

const likecoinMainNet = axios.create({
    baseURL: "https://mainnet-node.like.co",
    timeout: 10000
})

const superLikedServer = axios.create({
    baseURL: "https://superliked.herokuapp.com/",
    timeout: 10000
})

const api = {
    getPrice() {
        return axios.get('https://api.coingecko.com/api/v3/simple/price?ids=likecoin&vs_currencies=usd')
    },
    getAddressBalance(address) {
        return likecoinMainNet.get(`/bank/balances/${address}`)
    },
    getAddressReward(address) {
        return likecoinMainNet.get(`/distribution/delegators/${address}/rewards
        `)
    },
    getAddressDelegations(address) {
        return likecoinMainNet.get(`/staking/delegators/${address}/delegations
        `)
    },
    getAddressUnDelegations(address) {
        return likecoinMainNet.get(`/staking/delegators/${address}/unbonding_delegations
        `)
    },
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
    },
    getContentById(config) {
        return instance.get(`/like/info/user/${config.likerId}/latest?after=&before&limit=200`)
    },
    getUserProfile(config) {
        const headers = {
            headers: { Authorization: `Bearer ${config.token}` }
        };
        return instance.get(`/users/profile`, headers)
    },
    getLikedList(config) {
        const params = new URLSearchParams();
        // params.append('referrer', encodeURI(config.referrer));
        return instance.get(`/like/likebutton/${config.id}/list?referrer=${config.referrer}`)
    },
    getLotteryList(config) {
        return superLikedServer.get('/lottery/get', config)
    },
    createLottery(config) {
        return superLikedServer.post('/lottery/create', config)
    }
}
export default api;

//   https://api.like.co/like/share/latest?after=&before&limit=20
