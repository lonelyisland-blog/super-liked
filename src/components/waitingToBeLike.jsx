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

                setLikeList(_.sortBy(mapList, 'times'))
            });
        } else {
            getMoreContent()
        }
        initLottie('.wait-tobe-like-list-loading')
    }, [config, likeList, index]);


    const loadMore = () => {
        setIndex(index + 5)
    }

    const toUrl = (url) => {
        if (window) {
            window.open(url, "_blank");
        }
    }

    const getMoreContent = () => {
        let temList = likeList.slice(index, index + 5)
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
    console.log(displayList)
    return (
        <div id="WaitToBeLike" className="list animate__animated animate__fadeIn" >
            <InfiniteScroll
                dataLength={displayList.length}
                next={loadMore}
                hasMore={true}
                loader={<h4 className="wait-tobe-like-list-loading list-loading animate__animated animate__fadeIn">loading</h4>}
                scrollableTarget="WaitToBeLike">
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
