import axios from "axios"

const instance = axios.create({
  baseURL: "https://api.like.co",
  timeout: 10000,
})

const likecoinMainNet = axios.create({
  baseURL: "https://mainnet-node.like.co",
  timeout: 10000,
})

const superLikedServer = axios.create({
  baseURL: "https://superliked-backend-elk7x.ondigitalocean.app/",
  // baseURL: "http://localhost:5000/",
  timeout: 10000,
})

const loginPlatfroms = axios.create({
  baseURL: "https://guanyun.nl",
  // baseURL: "http://localhost:3000",
  timeout: 10000,
})

const api = {
  getPrice() {
    return axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=likecoin&vs_currencies=usd"
    )
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
    const params = new URLSearchParams()
    params.append("after", config.after)
    params.append("before", config.before)
    params.append("limit", config.limit)
    return instance.get(`/like/share/latest`, { params })
  },
  getLatestContent(config) {
    const params = new URLSearchParams()
    params.append("after", config.after)
    params.append("before", config.before)
    params.append("limit", config.limit)
    return instance.get(`/like/info/latest`, { params })
  },
  getSuperLikeInfo(config) {
    const params = new URLSearchParams()
    params.append("url", config.url)
    params.append("LIKE", config.LIKE)
    return instance.get(`/like/info`, { params })
  },
  getContentById(config) {
    return instance.get(
      `/like/info/user/${config.likerId}/latest?after=&before&limit=200`
    )
  },
  getUserProfile(config) {
    const headers = {
      headers: { Authorization: `Bearer ${config.token}` },
    }
    return instance.get(`/users/profile`, headers)
  },
  getTokenInfo(config) {
    const headers = {
      headers: { Authorization: `Bearer ${config.token}` },
    }
    return instance.get(`/oauth/tokeninfo`, headers)
  },
  getLikedList(config) {
    const params = new URLSearchParams()
    // params.append('referrer', encodeURI(config.referrer));
    return instance.get(
      `/like/likebutton/${config.id}/list?referrer=${config.referrer}`
    )
  },
  getLotteryList(config) {
    return superLikedServer.get("/lottery/get", config)
  },
  createLottery(config) {
    return superLikedServer.post("/lottery/create", config)
  },
  getLotteryDetail(config) {
    const params = new URLSearchParams()
    params.append("id", config.id)
    return superLikedServer.get("/lottery/lottery", {params})
  },
  getLikeCoinAuth() {
    return loginPlatfroms.get("/api/likecoin-auth")
  },
  getLikeCoinProfile(config) {
    const params = new URLSearchParams()
    params.append("code", config.code)
    return loginPlatfroms.get(`/api/likecoin-profile`, { params })
  },
  refreshLikeCoinAuth(config) {
    const params = new URLSearchParams()
    params.append("refresh_token", config.refresh_token)
    return loginPlatfroms.get(`/api/likecoin-refresh`, { params })
  },
}
export default api

//   https://api.like.co/like/share/latest?after=&before&limit=20
