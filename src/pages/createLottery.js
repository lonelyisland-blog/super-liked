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

import _ from "lodash"
import "../styles/container/createLottery.scss"

function CreateLottery(props) {
  const { t, i18n } = useTranslation()
  const [time, setTime] = useState(0)
  const [lotteryInfo, setLotteryInfo] = useState({
    title: "",
    user: "",
    link: "",
    prize: "",
    timer: 0,
    desc: "",
    contact: "",
    token: "",
    isFinished: false,
    userAvatar: "",
  })

  const times = []
  for (let i = 0; i <= 240; i++) {
    times.push(i)
  }

  useEffect(() => {
    if (lotteryInfo.user === "") {
      storage.getItem("user_info", (err, res) => {
        if (err) {
          return
        }
        if (res) {
          const user = JSON.parse(res)
          const temLottery = Object.assign(lotteryInfo)
          temLottery.userAvatar = user.avatar
          temLottery.user = user.user
          temLottery.token = user.access_token
          setLotteryInfo({ ...temLottery })
        }
      })
    }
  }, [
    lotteryInfo.title,
    lotteryInfo.user,
    lotteryInfo.link,
    lotteryInfo.prize,
    lotteryInfo.timer,
    lotteryInfo.desc,
    lotteryInfo.contact,
  ])

  const updateLotteryInfo = (value, key) => {
    const temLottery = Object.assign(lotteryInfo)
    temLottery[key] = value
    console.log(temLottery)
    setLotteryInfo({ ...temLottery })
  }

  const handleCreateLottery = () => {
    if (!validUrl.isUri(lotteryInfo.link)) {
      toast("請輸入正確的鏈接!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
      return
    }
    if (
      lotteryInfo.title.length === 0 ||
      lotteryInfo.prize.length === 0 ||
      lotteryInfo.desc.length === 0 ||
      lotteryInfo.contact.length === 0
    ) {
      toast("每一項都是必填的哦！", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      })
      return
    }
    Api.createLottery(lotteryInfo).then(res => {
      if (res.data.message === "Unauthorized") {
        toast("需要 LogIn !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        })
        setTimeout(() => {
          navigate("/login/")
        }, 2000)
        return
      }
      if(res.data.message === "BadRequestException"){
        handleCreateLottery()
        return
      }
      if (res.data.status === "ok") {
        navigate("/")
      }
    })
  }

  const ListItems = times.map(number => (
    <MenuItem value={number} key={number}>
      {number} Hour
    </MenuItem>
  ))
  const siteTitle = "Superliked"

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
      <div className="lottery-creator animate__animated animate__fadeInUp animate__faster">
        <div className="creator">
          <TextField
            disabled
            id="outlined-basic"
            label={t("LOTTERY_CREATOR")}
            value={lotteryInfo.user}
            variant="outlined"
          />
          <FormControl>
            <TextField
              id="outlined-basic"
              label={t("LOTTERY_TITLE")}
              onChange={e => {
                updateLotteryInfo(e.target.value, "title")
              }}
              value={lotteryInfo.title}
              variant="outlined"
            />
            <FormHelperText>{t("")}</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              id="outlined-basic"
              label={t("LOTTERY_LINK")}
              onChange={e => {
                updateLotteryInfo(e.target.value, "link")
              }}
              value={lotteryInfo.link}
              variant="outlined"
            />
            <FormHelperText>{t("LOTTERY_LINK_TIPS")}</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              id="outlined-basic"
              label={t("LOTTERY_PRIZE")}
              placeholder={t("999 Like")}
              onChange={e => {
                updateLotteryInfo(e.target.value, "prize")
              }}
              value={lotteryInfo.prize}
              variant="outlined"
            />
            <FormHelperText>{t("LOTTERY_PRIZE_TIPS")}</FormHelperText>
          </FormControl>

          <FormControl className="timer-selecter">
            <InputLabel id="demo-simple-select-label">
              {t("LOTTERY_TIMER")}
            </InputLabel>
            <Select
              disabled
              label={t("LOTTERY_TIMER")}
              placeholder={t("LOTTERY_TIMER_TIPS")}
              variant="outlined"
              value={time}
              defaultValue={time}
              onChange={item => {
                setTime(item.target.value)
                updateLotteryInfo(item.target.value, "timer")
              }}
            >
              {ListItems}
            </Select>
            <FormHelperText>{t("LOTTERY_TIMER_TIPS")}</FormHelperText>
          </FormControl>

          <FormControl>
            <TextField
              id="outlined-basic"
              label={t("LOTTERY_DESCRIPTION")}
              multiline
              rows={2}
              onChange={e => {
                updateLotteryInfo(e.target.value, "desc")
              }}
              value={lotteryInfo.desc}
              variant="outlined"
            />
            <FormHelperText>{t("LOTTERY_DESCRIPTION_TIPS")}</FormHelperText>
          </FormControl>

          <FormControl>
            <TextField
              id="outlined-basic"
              label={t("LOTTERY_CONTACT")}
              multiline
              rows={1}
              onChange={e => {
                updateLotteryInfo(e.target.value, "contact")
              }}
              value={lotteryInfo.contact}
              variant="outlined"
            />
            <FormHelperText>{t("LOTTERY_CONTACT_TIPS")}</FormHelperText>
          </FormControl>
          <div className="start-lottery">
            <Button onClick={handleCreateLottery} variant="outlined">
              {t(`START_LOTTERY`)}
            </Button>
          </div>
          <FormControl className="lottery-tips">
                        <FormHelperText>重要說明：給一篇文章按讚就是參與了抽獎，抽獎機會隨機進行排序。發起人可以選定第一名或者多名獲得獎品，規則由發起人自己定義。</FormHelperText>
                        <FormHelperText>如果問題，請聯繫 guanyun。</FormHelperText>
          </FormControl>
        </div>
      </div>
    </Layout>
  )
}
export default CreateLottery
