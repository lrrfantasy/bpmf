import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import * as DashboardActions from '../../actions/dashboard'

import Icon from '../../ui/Icon'
import HoverInfo from '../../ui/HoverInfo'

import config from '../../config'

import 'font-awesome/css/font-awesome.min.css'
import style from './style.styl'

const sensorMap = {
  'B': {
    className: style.roomBusy,
    icon: 'users',
    text: 'The room is currently occupied.'
  },
  'F': {
    className: style.roomFree,
    icon: null,
    text: ''
  },
  'U': {
    className: style.roomUnknown,
    icon: 'question',
    text: 'Failed to get current status of room.'
  }
}

@connect(state => state, DashboardActions)
export default class App extends Component {
  componentDidMount () {
    this.props.initStatus()
    if (config.polling) {
      setInterval(this.props.initStatus, 60000)
    }
  }

  render () {
    const { status } = this.props.dashboard
    const roomList = status.map((room, idx) => {
      let colorClass
      if (room.calendar.status === 'U') {
        colorClass = style.roomUnknown
      } else if (room.sensor === 'B' || room.calendar.status === 'B') {
        colorClass = style.roomBusy
      } else {
        colorClass = style.roomFree
      }
      const roomClass = classnames(style.room, colorClass)

      const sensorIcon = sensorMap[room.sensor].icon
      const calendarTitle = room.calendar.status === 'U'
        ? 'Failed to get calendar'
        : room.calendar.title
      return (
        <li className={roomClass} key={idx}>
          <div className={style.roomHeader}>
            <h1 className={style.roomTitle}>{room.roomName}</h1>
            <div className={style.roomIcons}>
              {
                sensorIcon && (
                  <HoverInfo text={sensorMap[room.sensor].text}>
                    <Icon icon={sensorIcon} />
                  </HoverInfo>
                )
              }
            </div>
          </div>
          <div className={style.roomCalendar}>
            <p className={style.calendarDesc}>Calendar Detail</p>
            <h2 className={style.calendarTitle}>{calendarTitle}</h2>
            <p>{room.calendar.booker}</p>
          </div>
        </li>
      )
    })
    return (
      <div>
        <ul>
          {roomList}
        </ul>
      </div>
    )
  }
}
