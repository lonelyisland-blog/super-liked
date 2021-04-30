import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import queryString from "query-string"
import storage from "localforage"
import { ToastContainer, toast } from "material-react-toastify"

import "../styles/components/layout.scss"
import Api from "../assets/api"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      user: "",
      displayName: "",
      avatar: "",
      cosmosWallet: "",
      isSubscribedCivicLiker: true,
      civicLikerSince: 0,
      refresh_token: "",
      access_token: "",
    }
  }
  login() {
    Api.getLikeCoinAuth().then(res => {
      window.location.href = res.data.data
    })
  }
  getUserProfile(token) {
    const config = { token: token }
    Api.getUserProfile(config).then(res => {
      const state = { ...this.state, ...res.data }
      state.isLogin = true
      this.setState(state)
    })
  }
  getAccess(code) {
    Api.getLikeCoinProfile({ code: code }).then(res => {
      const temState = { ...this.state, ...JSON.parse(res.data.data) }
      temState.isLogin = true
      this.setState(temState)
      storage.setItem("access_token", temState.access_token)
      storage.setItem("user_info", JSON.stringify(temState))
      this.getUserProfile(temState.access_token)
    })
  }
  componentDidMount() {
    // if access_token does not exist
    if (!storage.getItem("access_token")) {
      this.setState({
        isLogin: false,
      })
      return
    } else {
      storage.getItem("access_token", (err, res) => {
        if (err) {
          console.log("err_access_token", err)
        }
        if (res) {
          storage.getItem("user_info", (err, res) => {
            if (res) {
              const state = { ...this.state, ...JSON.parse(res) }
              state.isLogin = true
              this.setState(state)
            }
          })
        }
      })
    }

    // if code exist
    const code = queryString.parse(location.search).code

    if (code && code.length > 0) {
      storage.setItem("auth_code", code)
      this.getAccess(code)
    }
  }
  render() {
    const { location, title, children } = this.props
    const { isLogin, avatar } = this.state
    const rootPath = `${__PATH_PREFIX__}/`
    const blogPath = `${__PATH_PREFIX__}/blog/`
    return (
      <Wrapper>
        <div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
          />
          <header>
            <div className="avatar">
              <Link to="/"> SuperLiked</Link>
            </div>
            <div className="user-state animate__animated animate__fadeIn">
              <Link to={!isLogin ? "/login/" : "/about"}>
                {!isLogin ? "登录" : <img src={avatar} />}
              </Link>
            </div>
          </header>
          <main>{children}</main>
        </div>
        <Footer>
          {/* © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://discord.com/invite/W4DQ6peZZZ">LikeCoin DAO</a> */}
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #f6ffff;
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`

export default Layout
