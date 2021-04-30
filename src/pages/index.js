import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import "../i18n/i18n"
import "animate.css"
import { useTranslation } from "react-i18next"
import { ToastContainer, toast } from "material-react-toastify"
import Api from "../assets/api"
import storage from "localforage"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LotteryList from "../container/lottery/lotteryList.jsx"
import "../styles/pages/index.scss"
import { navigate } from "gatsby"

//imgs
import Create from "../assets/imgs/lottery/create.png"

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
    storage.getItem("access_token", (err, res) => {
      if (err) {
        toast("請重新登錄!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        })
        setTimeout(() => {
          navigate('/login')
        }, 1000)
        return
      }
      if (res) {
        Api.getTokenInfo({ token: res })
          .then(res => {
            console.log('res', res)
            setIsLottery(!isLottery)
          })
          .catch(err => {
            toast("請重新登錄!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            })
            setTimeout(() => {
              navigate('/login')
            }, 1000)
            return
          })
      }
    })
  }
  useEffect(() => {
    // Update the document title using the browser API
  }, [isLottery, switcher])

  return (
    <Layout
      location={props.location}
      title={siteTitle}
      className="animate__animated animate__fadeInUp animate__faster"
    >
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
    </Layout>
  )
}

export default IndexPage
