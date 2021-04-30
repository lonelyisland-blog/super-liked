import React, { useEffect, useState } from "react"
import Api from "../../assets/api"
import InfiniteScroll from "react-infinite-scroll-component"
import storage from "localforage"
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
import "../../styles/container/lotteryList.scss"

function LotteryList(props) {
  const { t, i18n } = useTranslation()
  const [lotteryList, setLotteryList] = useState([])
  const [displayList, setDisplayList] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (lotteryList.length === 0) {
      Api.getLotteryList().then(res => {
        if (res.data.data.length === 0) return
        setLotteryList(res.data.data)
        handleSetDisplayList(res.data.data)
      })
    }
  }, [displayList, lotteryList, index])

  const handleSetDisplayList = async lotteryList => {
    const temList = lotteryList.slice(index, index + 5)
    const fn = config => {
      return Api.getLikedList(config)
    }
    Promise.allSettled(
      temList.map(item => {
        const info = {
          id: item.user,
          referrer: item.link,
        }
        return fn(info)
      })
    )
      .then(res => {
        res.forEach((data, ddx) => {
          if (data.status === "fulfilled") {
            temList[ddx].likerList = data.value.data
          }
        })
        setDisplayList(temList)
        setIndex(index + 5)
      })
      .catch(err => {
        console.log("err", err)
      })
  }
  const goDetail = id => {
    navigate(`/lotteryDetail?id=${id}`)
  }
  const loadMore = () => {}

  return (
    <div
      id="LatestContentList"
      className="lottery-list animate__animated animate__fadeInUp animate__faster"
    >
      <InfiniteScroll
        dataLength={10000}
        next={loadMore}
        loader={<h4 className="latest-content-list-loading">loading...</h4>}
        // endMessage={
        //   <h4 className="latest-super-like-list-loading">TheEnd...</h4>
        // }
        scrollableTarget="LatestContentList"
      >
        {displayList.map((item, ltx) => (
          <div className="lottery" key={ltx} onClick={()=>{
            goDetail(item.token)
          }}>
            <div className="title">
              <img className="host-avatar" src={item.userAvatar} />
              <div className="lottery-title">{item.title}</div>
              <div className="host-name">by {item.user}</div>
            </div>
            <FormControl></FormControl>
            <FormControl className="prize">
              {item.desc}
            </FormControl>
            <FormControl>
              <div className="likerList">
                {item.likerList.slice(0, 9).map(liker => (
                  <div key={liker} className="liker">
                    @{liker}
                  </div>
                ))}
                ...
              </div>
              <FormHelperText>參與者</FormHelperText>
            </FormControl>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}
export default LotteryList
