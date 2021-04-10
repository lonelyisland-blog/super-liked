import React, { useEffect, useState } from 'react';
import Api from '../../assets/api';
// import YouTube from 'react-youtube';
import InfiniteScroll from "react-infinite-scroll-component";
import _ from 'lodash'
import '../../styles/components/list.scss'
import { last30dates } from '../../utils/util'
const temMap = new Map()

function List() {
    const [likeList, setLikeList] = useState([])
    const [index, setIndex] = useState(0);
    const [displayList, setDisplayList] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const dates = last30dates().reverse()
    let day = 0
    let yes = 1
    let config = {
        likerId: 'marvelamazing',
    }
    useEffect(() => {
        if (likeList.length > 0) {
            getMoreContent()
        } else {
            getContent(config)
        }
    }, [likeList, index]);

    const getContent = (config) => {
        const temList = []
        Api.getContentById(config).then((res) => {
            console.log(res)
            res.data.list.forEach((item) => {
                if (temMap.has(item.referrer)) {
                    return
                } else {
                    temMap.set(item.referrer, item)
                }
                const temUrl = new URL(item.referrer)
                if (temUrl.origin === "https://www.youtube.com") {
                    temList.push(item)
                }
            })
            let infoList = []
            const fn = (info) => {
                return Api.getSuperLikeInfo(info)
            }
            Promise.allSettled(temList.map((item) => {
                const info = {
                    url: item.referrer,
                    LIKE: ''
                }
                return fn(info)
            })).then((res) => {
                res.forEach((data) => {
                    if (data.status === 'fulfilled') {
                        infoList.push(data.value.data)
                    }
                })
                setDisplayList(displayList.concat(infoList))
            }).catch((err) => {
                console.log('err', err)
            })
            // setLikeList(likeList.concat(temList.slice(0)))
            // setDisplayList(likeList.concat(temList.slice(0)))

        });
    }


    const loadMore = () => {
        setIndex(index + 5)
    }

    const toUrl = (url) => {
        if (window) {
            window.open(url, "_blank");
        }
    }

    const getMoreContent = () => {
        // let temList = likeList.slice(index, index + 5)
        // let infoList = []
        // const fn = (info) => {
        //     return Api.getSuperLikeInfo(info)
        // }
        // Promise.allSettled(temList.map((item) => {
        //     const info = {
        //         url: item.url,
        //         LIKE: ''
        //     }
        //     return fn(info)
        // })).then((res) => {
        //     res.forEach((data) => {
        //         if (data.status === 'fulfilled') {
        //             infoList.push(data.value.data)
        //         }
        //     })
        //     setDisplayList(displayList.concat(infoList))
        // }).catch((err) => {
        //     console.log('err', err)
        // })
    }
    return (
        <div id="LatestContentList" className="list animate__animated animate__fadeIn" >
            <InfiniteScroll
                dataLength={displayList.length}
                next={loadMore}
                loader={<h4 className="latest-content-list-loading">loading...</h4>}
                endMessage={<h4 className="latest-super-like-list-loading">TheEnd...</h4>}
                scrollableTarget="LatestContentList"
            >
                {
                    displayList.map((item, idx) =>
                        <div className="content-container" key={idx} onClick={() => {
                            toUrl(item.url)
                        }}>
                            {/* <YouTube videoId={item.origin.get('v')} opts={opts} /> */}
                            <div className="banner">
                                {item.image ? <div className="img" style={{
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}></div> : null}
                            </div>
                            <div className="title">
                                <div className="title-content">{item.title}</div>
                            </div>
                            <div className="desc">
                                <div className="desc-content">{item.description}</div>
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
