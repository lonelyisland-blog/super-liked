import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { rhythm, scale } from "../utils/typography"
import '../styles/components/layout.scss'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
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
            <div className="about animate__animated animate__wobble">
              <Link to="/about/">
                <span role="img" aria-label="wave emoji">
                  👋
          </span></Link>
            </div>
          </header>
          <main>{children}</main>
        </div>
        <Footer>
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://www.gatsbyjs.org">LikeCoin DAO</a>
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
