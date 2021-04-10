import React, { useState } from "react"
import { Link } from "gatsby"
import '../i18n/i18n';
import 'animate.css'
import { useTranslation } from 'react-i18next';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import List from '../components/latestSuperLike'
import MostLikes from '../components/latestContent'
import MostSuperLikes from '../components/mostSuperLike'
import WatingToBeLiked from '../components/waitingToBeLike'

import Marvel from '../components/list/marvel'
import '../styles/pages/index.scss'

function ListSwiter(key) {
  if (typeof window !== 'undefined') {
    switch (key) {
      case 'Marvel':
        window.location.hash = '#Marvel';
        break;
      case 'MostSuperLikes':
        window.location.hash = '#MostSuperLikes';
        break;

      case 'MostLikes':
        window.location.hash = '#LatestContent';
        break;

      case 'WatingToBeLiked':
        window.location.hash = '#WatingToBeLiked';
        break;

      default:
        return null;
        break;

    }
  }
}
function IndexPage(props) {
  const siteTitle = "Gatsby Starter Personal Website"
  const [switcher, setSwitcher] = useState('MostSuperLikes')
  const { t, i18n } = useTranslation();
  const switchSwitcher = (key) => {
    setSwitcher(key)
    ListSwiter(switcher)
  }
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={switcher}
        keywords={[`superlike`, `likecoin`, `bitcoin`, `ipfs`]}
      />

      <div className={switcher === 'MostSuperLikes' ? 'list-display' : 'list-hide'}><MostSuperLikes />
      </div>
      <div className={switcher === 'LatestSuperLikes' ? 'list-display' : 'list-hide'}><List />
      </div>

      <div className={switcher === 'Marvel' ? 'list-display' : 'list-hide'} >      <Marvel />
      </div>

      <div className={switcher === 'WatingToBeLiked' ? 'list-display' : 'list-hide'}>      <WatingToBeLiked />
      </div>

      <div className="switcher">
        <div onClick={() => switchSwitcher('MostSuperLikes')} className="most-superliked">{t('MOST_SUPER_LIKED')}</div>
        <div onClick={() => switchSwitcher('Marvel')} className="most-liked">{t('MARVEL_SERIES')}</div>
      </div>
    </Layout>
  )

}

export default IndexPage
