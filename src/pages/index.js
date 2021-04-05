import React, { useState } from "react"
import { Link } from "gatsby"
import '../i18n/i18n';
import 'animate.css'
import { useTranslation } from 'react-i18next';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import List from '../components/list'
import MostLikes from '../components/mostLike'
import MostSuperLikes from '../components/mostSuperLike'
import WatingToBeLiked from '../components/waitingToBeLike'
import '../styles/pages/index.scss'

function ListSwiter(key) {
  switch (key) {
    case 'LatestSuperLikes':
      return <List />;
    case 'MostSuperLikes':
      return <MostSuperLikes />;
      break;
    case 'MostLikes':
      return <MostLikes />;
      break;
    case 'WatingToBeLiked':
      return <WatingToBeLiked />;
      break;

    default:
      return <List />;
      break;
  }
}
function IndexPage(props) {
  const siteTitle = "Gatsby Starter Personal Website"
  const [switcher, setSwitcher] = useState('LatestSuperLikes')
  const { t, i18n } = useTranslation();
  const switchSwitcher = (key) => {
    setSwitcher(key)
  }
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="Home"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      {ListSwiter(switcher)}
      <div className="switcher">
        <div onClick={() => switchSwitcher('LatestSuperLikes')} className="latest ">{t('LATEST_SUPER_LIKED')}</div>
        <div onClick={() => switchSwitcher('MostSuperLikes')} className="most-superliked">{t('MOST_SUPER_LIKED')}</div>
        <div onClick={() => switchSwitcher('MostLikes')} className="most-liked">{t('MOST_LIKE')}</div>
        <div onClick={() => switchSwitcher('WatingToBeLiked')} className="waiting-be-liked">{t('WAITING_BE_LIKED')}</div>
      </div>
    </Layout>
  )

}

export default IndexPage
