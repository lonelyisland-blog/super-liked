import React from "react"
import { graphql } from "gatsby"
import { TextField, Button, Tooltip } from '@material-ui/core'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'; import storage from 'localforage'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Api from '../assets/api'
import i18n from '../i18n/i18n'
import '../styles/pages/myWallet.scss'
class myWallet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            reward: 0,
            delegation: 0,
            unDelegation: 0,
            priceUsd: 0,
            haveAddress: false,
            isWrong: false,
            address: ''
        }
        this.addresses = []
    }
    componentDidMount() {
        storage.getItem('address', (err, value) => {
            if (err) {
                this.setState({
                    haveAddress: false
                })
                return
            }
            if (value) {
                this.setState({
                    address: value.replaceAll('"', '')
                }, () => {
                    this.getBalance()
                })
                this.setState({
                    haveAddress: true
                })
            }
        })
    }

    getBalance() {
        const address = this.state.address
        const getBalance = (address) => {
            return Api.getAddressBalance(address)
        }
        const getReward = (address) => {
            return Api.getAddressReward(address)
        }
        const getAddressDelegations = (address) => {
            return Api.getAddressDelegations(address)
        }
        const getAddressUnDelegations = (address) => {
            return Api.getAddressUnDelegations(address)
        }
        Promise.allSettled([getBalance(address), getReward(address), getAddressDelegations(address), getAddressUnDelegations(address), Api.getPrice()]).then((res) => {
            console.log(res)
            res.forEach(({ value }) => {
                console.log(value)
            })
            let delegations = 0
            let unDelegations = 0
            res[2].value?.data?.result.forEach((item) => {
                console.log('balance', item.balance)
                delegations += (item.balance / 1000000000)
            })
            res[3].value?.data?.result.forEach((item) => {
                unDelegations += (item.balance / 1000000000)
            })
            console.log(delegations, unDelegations)
            this.setState(({
                balance: res[0].value?.data?.result[0]?.amount,
                reward: res[1].value?.data?.result?.total[0]?.amount,
                delegation: delegations,
                unDelegation: unDelegations,
                priceUsd: res[4].value.data.likecoin.usd
            }))
        })
    }
    onAddressChange(val) {
        this.setState({
            address: val?.target?.value
        })
    }
    confirmAddress() {
        const { address } = this.state
        if (address.length > 30) {
            storage.setItem('address', JSON.stringify(address))
            this.setState({
                haveAddress: true
            })
            this.getBalance()
        } else {
            alert('wrong address')
        }
    }

    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        console.log(this)
        const { balance, reward, delegation, unDelegation, priceUsd, haveAddress } = this.state;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="MyWallet" />
                <div className="wallet-container" >
                    {
                        haveAddress ? null : <div className="address-location animate__animated animate__fadeInDown">

                            <div className="address">
                                <TextField label="Cosmos address" id="standard-size-small" defaultValue="" size="small" onChange={this.onAddressChange.bind(this)} />
                                <div className="tips">{ }</div>
                            </div>
                            <Button variant="contained" color="primary" onClick={this.confirmAddress.bind(this)}>
                                Confirm
                    </Button>
                        </div>
                    }
                    {
                        haveAddress ? <div className="total-coins animate__animated animate__fadeInUp">
                            <div className="usd">{i18n.t('FIAT')} : {(((balance / 1000000000 || 0) + (reward / 1000000000 || 0) + (delegation || 0) + (unDelegation || 0)) * priceUsd).toFixed(2)} USD
                                <div className="tips">
                                    <Tooltip title={i18n.t('WALLET_TIPS')}>
                                        <Button><LiveHelpIcon /></Button>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="balance">{i18n.t('BALANCE')} : {(balance / 1000000000 || 0).toFixed(2)} Like</div>
                            <div className="balance">{i18n.t('REWARD')} : {(reward / 1000000000 || 0).toFixed(2)} Like</div>
                            <div className="balance">{i18n.t('DELEGATION')} : {(delegation || 0).toFixed(2)} Like</div>
                            <div className="balance">{i18n.t('UN_DELEGATION')} : {(unDelegation || 0).toFixed(2)} Like</div>
                            <div className="balance">{i18n.t('TOTAL')} : {(((balance / 1000000000 || 0) + (reward / 1000000000 || 0) + (delegation || 0) + (unDelegation || 0))).toFixed(2)} Like</div>

                        </div> : null
                    }
                    <div className="change-address animate__animated animate__fadeIn" onClick={() => {
                        this.setState({
                            haveAddress: false
                        })
                    }}>
                        {i18n.t('CHANGE_ADDRESS')}
                    </div>
                </div>
            </Layout >
        )
    }
}

export default myWallet

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
