import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import storage from 'localforage'
import queryString from 'query-string';
import likecoin from '../../content/assets/likecoin.png'

import '../styles/pages/login.scss'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "user": "",
            "displayName": "",
            "avatar": "",
            "access_token": ""
        }
    }
    login() {
        fetch('https://guanyun.nl/api/likecoin-auth', {
            method: 'GET',
            redirect: 'follow',
            // mode: 'no-cors'
        }).then((res) => {
            res.json().then((data) => {
                window.location.href = data.data;
            })
        })
    }
    componentDidMount() {

    }
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Login with likerId" />
                <div className="login-with-likerId">
                    <button className="login-button">
                        <img className="avatar" src={likecoin} />
                        <div className="login" onClick={this.login.bind(this)}>Sign in with Liker ID</div>
                    </button>
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
