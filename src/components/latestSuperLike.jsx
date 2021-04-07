import React, { useEffect, useState } from 'react';
import { usePrevious } from '../hooks/hooks'
import Api from '../assets/api';
// import YouTube from 'react-youtube';
import InfiniteScroll from "react-infinite-scroll-component";
import _ from 'lodash'
import '../styles/components/list.scss'
import initLottie from '../utils/lottie'

function List() {
  const [likeList, setLikeList] = useState([])
  const [index, setIndex] = useState(0);
  const [displayList, setDisplayList] = useState([])
  const [config, setConfig] = useState({
    before: '',
    after: '',
    limit: 200,
  })
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    if (likeList.length === 0) {
      const temList = []
      Api.getGlobalList(config).then((res) => {
        res.data.list.forEach((item) => {
          temList.push(item)
        })
        setLikeList(_.uniqBy(temList.slice(0), 'url'))
      });
    } else {
      getMoreContent()
    }
  }, [config, likeList, index]);


  const loadMore = () => {
    setIndex(index + 10)
  }

  const toUrl = (url) => {
    if (window) {
      window.open(url, "_blank");
    }
  }

  const getMoreContent = () => {
    if (index > likeList.length) {
      setHasMore(false)
      return
    }
    let temList = likeList.slice(index, index + 10)
    let infoList = []
    const fn = (info) => {
      return Api.getSuperLikeInfo(info)
    }
    Promise.allSettled(temList.map((item) => {
      const info = {
        url: item.url,
        LIKE: ''
      }
      return fn(info)
    })).then((res) => {
      res.forEach((data, ddx) => {
        if (data.status === 'fulfilled') {
          data.value.data.times = temList[ddx].times
          infoList.push(data.value.data)
        }
      })
      if (infoList.length < 5) {
        loadMore()
      }
      setDisplayList(displayList.concat(infoList))
    }).catch((err) => {
      console.log('err', err)
    })
  }
  return (
    <div id="LatestSuperLikeList" className="list animate__animated animate__fadeIn" >
      <InfiniteScroll
        dataLength={displayList.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4 className="latest-super-like-list-loading">loading...</h4>}
        endMessage={<h4 className="latest-super-like-list-loading">TheEnd...</h4>}
        scrollableTarget="LatestSuperLikeList"
      >
        {
          displayList.map((item, idx) =>
            <div className="content-container" key={idx} onClick={() => {
              toUrl(item.url)
            }}>
              {/* <YouTube videoId={item.origin.get('v')} opts={opts} /> */}
              <div className="title">
                <div className="banner">
                  {item.image ? <div className="img" style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}></div> : null}
                </div>
                <div className="title-content">                {item.title}</div>
              </div>
              <div className="actions">
                <div className="user">@{item.user}</div>
                <div className="likes">{item.like} Likes</div>
              </div>
            </div>
          )
        }
      </InfiniteScroll>
    </div >
  );
}

export default List;
