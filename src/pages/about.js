import React from "react"
import { graphql } from "gatsby"
import { FormHelperText, FormControl } from "@material-ui/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LikeCoinButton from '../utils/like.button.sdk'
import "../styles/pages/about.scss"
class About extends React.Component {
  componentDidMount() {
    const likeButton = new LikeCoinButton({
      likerId: "guanyun",
      ref: document.querySelector("#like-button"),
    })
    likeButton.mount()
  }
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="SuperLiked.live opensource statement" />
        <FormControl className="about-form">
          <FormHelperText>注意事項：</FormHelperText>
          規則由發起人制定，但發起人只負責制定規則，抽獎結果由機器算法決定，在結果出來前，不管是本站還是發起人都無法知道抽獎結果。
          <FormHelperText>小貼士：</FormHelperText>
          定時抽獎和更多玩法還在開發中，如果建議和疑問，請聯繫 guanyun。
          <FormHelperText>給發起者按個讚吧</FormHelperText>
          <div id="like-button"></div>
        </FormControl>
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
