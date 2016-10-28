import React, { Component } from 'react'
import classnames from 'classnames'

import style from './style.styl'

export default class HoverInfo extends Component {
  state = {
    isHover: false
  }

  handleHoverOn (evt) {
    this.setState({ isHover: true})
  }

  handleHoverOff () {
    this.setState({ isHover: false })
  }

  render () {
    const textClass = classnames(style.hoverText, {
      [`${style.active}`]: this.state.isHover
    })
    if (!this.props.text) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
    return (
      <div className={style.hoverBody}
        onMouseOver={::this.handleHoverOn}
        onMouseOut={::this.handleHoverOff}>
        {this.props.children}
        <div className={textClass}>
          {this.props.text}
        </div>
      </div>
    )
  }
}
