import React, { useEffect, useState } from 'react';
import { usePrevious } from '../hooks/hooks'
import Api from '../assets/api';
// import YouTube from 'react-youtube';
import InfiniteScroll from "react-infinite-scroll-component";
import _ from 'lodash'
import '../styles/components/headLine.scss'
import initLottie from '../utils/lottie'

function List() {
    const [likeList, setLikeList] = useState([])
    const [mostSuperLikeList, setMostSuperLikeList] = useState([])
    const [mostLikeList, setMostLikeList] = useState([])
    const [index, setIndex] = useState(0);
    const [displayList, setDisplayList] = useState([])
    const preIndex = usePrevious(index)
    const [config, setConfig] = useState({
        before: '',
        after: '',
        limit: 200,
    })
    const [timer, setTimer] = useState('')
    useEffect(() => {
        if (likeList.length === 0) {
            const temList = []
            const temMap = new Map()
            Api.getGlobalList(config).then((res) => {
                res.data.list.forEach((item) => {
                    temList.push(item)
                    if (temMap.has(item.url)) {
                        let temItem = temMap.get(item.url)
                        temItem.times++
                        if (!temItem.likers.find((ele) => ele === item.liker)) {
                            temItem.likers.push(item.liker)
                        }
                        temMap.set(item.url, temItem)
                    } else {
                        item.times = 0
                        item.likers = [item.liker]
                        temMap.set(item.url, item)
                    }
                })
                const mapList = Array.from(temMap, ([name, value]) => (value));

                setLikeList(_.sortBy(mapList, 'times').reverse())
            });
        } else {
            getMoreContent()
        }
        initLottie('.head-line-list-loading')
    }, [config, likeList, index]);


    const loadMore = () => {
        setIndex(index + 4)
    }

    const toUrl = (url) => {
        if (window) {
            window.open(url, "_blank");
        }
    }

    const getMoreContent = () => {
        let temList = likeList.slice(index, index + 4)
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
            setDisplayList(displayList.concat(infoList))
        }).catch((err) => {
            console.log('err', err)
        })
    }
    return (
        <div id="HeadLineList" className="head-line-list animate__animated animate__fadeIn" >
            <InfiniteScroll
                dataLength={displayList.length}
                next={loadMore}
                hasMore={true}
                loader={<h4 className="head-line-list-loading list-loading animate__animated animate__fadeIn">loading</h4>}
                scrollableTarget="HeadLineList"
            >
                {
                    displayList.map((item, idx) =>
                        <div className="content-container animate__animated animate__fadeIn" key={idx} onClick={() => {
                            toUrl(item.url)
                        }}>
                            {/* <YouTube videoId={item.origin.get('v')} opts={opts} /> */}
                            {item.image ? <div className="img" style={{
                                backgroundImage: `url(${item.image})`, width: '100%',
                                height: '200px',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}></div> : null}
                            <div className="title">
                                {item.title}
                            </div>
                            <div className="desc">
                                {item.description}
                            </div>
                            <div className="actions">
                                <div className="user">@{item.user}</div>
                                <div className="likes">{item.like} Likes</div>
                                <div className="likes">{item.times} SuperLikes</div>

                            </div>
                        </div>
                    )
                }
            </InfiniteScroll>
        </div >
    );
}

export default List;
