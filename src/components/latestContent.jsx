import React, { useEffect, useState } from 'react';
import { usePrevious } from '../hooks/hooks'
import Api from '../assets/api';
// import YouTube from 'react-youtube';
import InfiniteScroll from "react-infinite-scroll-component";
import _ from 'lodash'
import '../styles/components/list.scss'
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
            Api.getLatestContent(config).then((res) => {
                res.data.list.forEach((item) => {
                    temList.push(item)
                })
                setLikeList(temList.slice(0))
            });
        } else {
            getMoreContent()
        }
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
            res.forEach((data) => {
                if (data.status === 'fulfilled') {
                    infoList.push(data.value.data)
                }
            })
            setDisplayList(displayList.concat(infoList))
        }).catch((err) => {
            console.log('err', err)
        })
    }
    return (
        <div className="list animate__animated animate__fadeInUp" >
            <InfiniteScroll
                dataLength={displayList.length}
                next={loadMore}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="list">
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
