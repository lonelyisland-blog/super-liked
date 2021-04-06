import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import '../styles/pages/about.scss'
class About extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="SuperLiked.live opensource statement" />
        <div className="open-source">OPENSOURCE STATEMENT</div>
        <a className="open-source-text" href="https://github.com/LikeCoinDAO/super-liked" target="_blank">LikeCoin DAO</a>
        <div className="about">
          <ul>
            <li>流行：最新被 SuperLike 的文章</li>
            <li>頭條：最多 SuperLike 的文章</li>
            <li>最新：在 LikeCoinChain 上最新產生的文章</li>
            <li>無人問津：還未被很多人讚賞的文章</li>
          </ul>
        </div>
      </Layout>
    )
  }
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
