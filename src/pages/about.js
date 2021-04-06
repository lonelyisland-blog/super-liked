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
