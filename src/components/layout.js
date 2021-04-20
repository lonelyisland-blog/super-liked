import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import queryString from 'query-string';
import storage from 'localforage'

import { rhythm, scale } from "../utils/typography"
import '../styles/components/layout.scss'
import likecoin from '../../content/assets/likecoin.png'
import Api from '../assets/api'
import api from "../assets/api";
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      "user": "",
      "displayName": "",
      "avatar": "",
      "cosmosWallet": "",
      "isSubscribedCivicLiker": true,
      "civicLikerSince": 0,
      "refresh_token": "",
      "access_token": "",
    }
  }
  login() {
    fetch('http://guanyun.nl/api/likecoin-auth', {
      method: 'GET',
      redirect: 'follow',
      // mode: 'no-cors'
    }).then((res) => {
      res.json().then((data) => {
        window.location.href = data.data;
      })
      // window.location.href = res.data;
    })
  }
  getUserProfile(token) {
    const config = { token: token }
    Api.getUserProfile(config).then((res) => {
      const state = { ...this.state, ...res.data }
      state.isLogin = true
      this.setState(state)
    })
  }
  getAccess(code) {
    fetch('http://guanyun.nl/api/likecoin-profile', {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify({ code: code })
      // mode: 'no-cors'
    }).then((res) => {
      if (res.status !== 200) {
        this.setState({ isLogin: false })
      } else {
        res.json().then((data) => {
          const temState = { ...this.state, ...JSON.parse(data.data) }
          temState.isLogin = true
          this.setState(temState)
          storage.setItem('access_token', temState.access_token)
          this.getUserProfile(temState.access_token)
        })
      }
    })
  }
  componentDidMount() {
    // if access_token does not exist
    if (!storage.getItem('access_token')) {
      this.setState({
        isLogin: false
      })
      return
    } else {
      storage.getItem('access_token', (err, res) => {
        if (err) {
          console.log('err_access_token', err)
        }
        if (res) {
          this.getUserProfile(res)
        }
      })
    }

    const code = queryString.parse(location.search).code
    if (code && code.length > 0) {
      storage.setItem('auth_code', code)
    } else {
      storage.getItem('auth_code', (err, res) => {
      })
    }
  }
  render() {
    const { location, title, children } = this.props
    const { isLogin, avatar } = this.state
    const rootPath = `${__PATH_PREFIX__}/`
    const blogPath = `${__PATH_PREFIX__}/blog/`
    return (
      <Wrapper>
        <div
        >
          <header>
            <div className="avatar">
              <Link to="/"> SuperLiked</Link>
            </div>
            <div className="user-state animate__animated animate__fadeIn">
              <Link to={!isLogin ? '/login/' : ''}>
                {!isLogin ? '登录' : (
                  <img src={avatar} />
                )}
              </Link>
            </div>
          </header>
          <main>{children}</main>
        </div>
        <Footer>
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://discord.com/invite/W4DQ6peZZZ">LikeCoin DAO</a>
        </Footer>
      </Wrapper >
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
