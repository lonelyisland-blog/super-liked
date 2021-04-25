import React, { useEffect, useState } from "react"
import Api from "../../assets/api"
import InfiniteScroll from "react-infinite-scroll-component"
import { TextField } from "@material-ui/core"
import { useTranslation } from "react-i18next"

import _ from "lodash"
import "../../styles/container/createLottery.scss"

function CreateLottery() {
  const { t, i18n } = useTranslation()

  return (
    <div className="lottery-creator">
      <div className="creator">
        <TextField
          disabled
          id="standard-required"
          label={t("LOTTERY_CREATOR")}
          defaultValue="Hello World"
        />
        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
        />

        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
        />

        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
        />

        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
        />
      </div>
    </div>
  )
}
export default CreateLottery
