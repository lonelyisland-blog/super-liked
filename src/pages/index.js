import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import '../i18n/i18n';
import 'animate.css'
import { useTranslation } from 'react-i18next';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import List from '../components/latestSuperLike'
import MostLikes from '../components/latestContent'
import Superliked from '../components/mostSuperLike'
import WatingToBeLiked from '../components/waitingToBeLike'
import storage from 'localforage'
import Marvel from '../components/list/marvel'
import '../styles/pages/index.scss'

function ListSwiter(key) {
  if (typeof window !== 'undefined') {
    switch (key) {
      case 'Marvel':
        window.location.hash = '#Marvel';
        break;
      case 'Superliked':
        window.location.hash = '#Superliked';
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
  const siteTitle = "Superliked"
  const [switcher, setSwitcher] = useState('Superliked')
  const { t, i18n } = useTranslation();
  const switchSwitcher = (key) => {
    setSwitcher(key)
    ListSwiter(switcher)
  }
  useEffect(() => {
    // Update the document title using the browser API
  });

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={switcher}
        keywords={[`superlike`, `likecoin`, `bitcoin`, `ipfs`]}
      />

      <div className={switcher === 'Superliked' ? 'list-display' : 'list-hide'}><Superliked />
      </div>
      <div className={switcher === 'LatestSuperLikes' ? 'list-display' : 'list-hide'}><List />
      </div>

      <div className={switcher === 'Marvel' ? 'list-display' : 'list-hide'} >      <Marvel />
      </div>

      <div className={switcher === 'WatingToBeLiked' ? 'list-display' : 'list-hide'}>      <WatingToBeLiked />
      </div>

      <div className="switcher">
        <div onClick={() => switchSwitcher('Superliked')} className="most-superliked">{t('MOST_SUPER_LIKED')}</div>
        <Link to="/myWallet/"><div className="most-liked">{t('FIAT')}</div></Link>
      </div>
    </Layout>
  )

}

export default IndexPage
