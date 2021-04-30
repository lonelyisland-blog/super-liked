import React, { useEffect, useState } from "react"
import Api from "../assets/api"
import InfiniteScroll from "react-infinite-scroll-component"
import Layout from "../components/layout"
import SEO from "../components/seo"
import storage from "localforage"
import validUrl from "valid-url"
import { ToastContainer, toast } from "material-react-toastify"
import "material-react-toastify/dist/ReactToastify.css"
import { navigate } from "gatsby"
import queryString from "query-string"
import copy from "copy-to-clipboard"
import LikeCoinButton from '../utils/like.button.sdk'
import {
  TextField,
  Select,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@material-ui/core"
import { useTranslation } from "react-i18next"
import { format } from "date-fns"
import _ from "lodash"
import "../styles/pages/lotteryDetail.scss"

function LotteryDetail(props) {
  const { t, i18n } = useTranslation()
  const [lottery, setLottery] = useState({
    contact: "",
    desc: "",
    endTime: 0,
    isFinished: true,
    link: "",
    prize: "",
    resultList: [],
    timeStamp: 0,
    timer: 0,
    title: "",
    token: "",
    user: "",
    userAvatar: "",
  })

  let url = ""

  if (typeof window !== "undefined") {
    url = window.location.href
  }
  const copyToPaste = () => {
    if (typeof window !== "undefined") {
      copy(window.location.href)
      toast("Success!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
  }

  useEffect(() => {
    const id = queryString.parse(location.search).id

    if (id && id.length > 0) {
      if (!lottery.title) {
        Api.getLotteryDetail({ id: id }).then(res => {
          console.log("res", res.data.data)
          setLottery(res.data.data)
          const likeButton = new LikeCoinButton({
            likerId: "guanyun",
            ref: document.querySelector("#like-button"),
          })
          likeButton.mount()
        })
      }
    }
  }, lottery)
  const siteTitle = "Superliked"
  if (!lottery) return null
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={"Lottery"}
        keywords={[`superlike`, `likecoin`, `activity-creater`, `ipfs`]}
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <div className="lottery-detail animate__animated animate__fadeInUp animate__faster">
        <FormControl>
          <FormHelperText>活動布告欄</FormHelperText>
          <div>{lottery.title}</div>
        </FormControl>
        <FormControl>
          <FormHelperText>發起人</FormHelperText>
          <div className="lottery-user">
            <img src={lottery.userAvatar} />
            <div>{lottery.user}</div>
          </div>
        </FormControl>
        <FormControl>
          <FormHelperText>規則</FormHelperText>
          <div>{lottery.desc}</div>
        </FormControl>
        <FormControl>
          <FormHelperText>開獎時間</FormHelperText>
          <div>{format(lottery.endTime, "yyyy-MM-dd-hh:mm")}</div>
        </FormControl>
        <FormControl>
          <FormHelperText>抽獎名單</FormHelperText>
          <div className="lottery-results">
            {lottery?.resultList.map((item, idx) => (
              <div className="result-item" key={idx}>
                <div className="prefix">
                  {idx === 0 ? (
                    <img src="https://img.icons8.com/doodle/48/000000/first-place-ribbon.png" />
                  ) : idx === 1 ? (
                    <img src="https://img.icons8.com/doodle/48/000000/second-place-ribbon.png" />
                  ) : idx === 2 ? (
                    <img src="https://img.icons8.com/doodle/48/000000/third-place-ribbon.png" />
                  ) : (
                    <div className="number">{idx + 1}</div>
                  )}
                </div>
                <div className="result-content">{item}</div>
              </div>
            ))}
          </div>
        </FormControl>
        <FormControl className="copy-container">
          <FormHelperText>開獎時間</FormHelperText>
          <div className="location-url">{url}</div>
          <Button className="click" onClick={copyToPaste}>
            按我拷貝到粘貼板
          </Button>
        </FormControl>

        <FormControl className="copy-container">
          <FormHelperText>給發起者按個讚吧</FormHelperText>
          <div id="like-button"></div>
        </FormControl>
      </div>
    </Layout>
  )
}
export default LotteryDetail
