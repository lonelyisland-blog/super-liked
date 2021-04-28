import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import "../i18n/i18n"
import "animate.css"
import { useTranslation } from "react-i18next"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Lottery from "../components/activity/activityList"
import LotteryList from '../container/lottery/lotteryList'
import "../styles/pages/index.scss"

//imgs
import Create from '../assets/imgs/lottery/create.png'

function ListSwiter(key) {
  if (typeof window !== "undefined") {
    switch (key) {
      case "Lottery":
        window.location.hash = "#Lottery"
        break
      default:
        return null
        break
    }
  }
}
function IndexPage(props) {
  const siteTitle = "Superliked"
  const [switcher, setSwitcher] = useState("Lottery")
  const [isLottery, setIsLottery] = useState(false)
  const { t, i18n } = useTranslation()
  const switchSwitcher = key => {
    setSwitcher(key)
    ListSwiter(switcher)
  }
  const setLottery = () => {
    setIsLottery(!isLottery)
  }
  useEffect(() => {
    console.log('log')
    // Update the document title using the browser API
  }, [isLottery, switcher])

  return (
    <Layout location={props.location} title={siteTitle} className="animate__animated animate__fadeInUp animate__faster">
      <SEO
        title={switcher}
        keywords={[`superlike`, `likecoin`, `activity-creater`, `ipfs`]}
      />
      {switcher === "Lottery" ? (
        <div className="Lottery">
          <LotteryList />
        </div>
      ) : null}

      <div className="switcher">
        <div onClick={() => switchSwitcher("Lottery")} className="Lotterys">
          {t("LOTTERY")}
        </div>
        <Link to="/myWallet/">
          <div className="most-liked">{t("FIAT")}</div>
        </Link>
      </div>
      <Link to="/createLottery/">
        <div className="create-lottery" onClick={setLottery}>
          <img src={Create} />
        </div>
      </Link>
    </Layout >
  )
}

export default IndexPage
