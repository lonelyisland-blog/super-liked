import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import '../styles/pages/about.scss'
class Login extends React.Component {
    login() {
        fetch('http://localhost:3000/api/likecoin-auth', {
            method: 'GET',
            redirect: 'follow',
            // mode: 'no-cors'
        }).then((res) => {
            console.log(res)
            res.json().then((data) => {
                console.log(data)
                window.location.href = data.data;
            })
            // window.location.href = res.data;
        })
    }
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Login with likerId" />
                <div className="login-with-likerId">
                    <div className="login" onClick={this.login.bind(this)}>login</div>
                </div>
            </Layout>
        )
    }
}

export default Login

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
