import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Flickity from 'flickity'
import 'flickity/dist/flickity.min.css'

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flickityReady: false
    }

    this.refreshFlickity = this.refreshFlickity.bind(this)
  }

  componentDidMount() {
    this.flickity = new Flickity(this.flickityNode, this.props.options || {})
    this.setState({
      flickityReady: true
    })
  }

  refreshFlickity() {
    this.flickity.reloadCells()
    this.flickity.resize()
    this.flickity.updateDraggable()
  }

  componentDidUpdate(prevProps, prevState) {
    const flickityDidBecomeActive = !prevState.flickityReady && this.state.flickityReady
    const childrenDidChange = prevProps.children?.length !== this.props.children?.length

    if (flickityDidBecomeActive || childrenDidChange) {
      this.refreshFlickity()
    }
  }

  renderPortal() {
    if (!this.flickityNode) {
      return null
    }

    const mountNode = this.flickityNode.querySelector('.flickity-slider')

    if (mountNode) {
      return ReactDOM.createPortal(this.props.children, mountNode)
    }
  }

  render() {
    return [
      <div className={'slider'} key='flickityBase' ref={node => (this.flickityNode = node)} />,
      this.renderPortal()
    ].filter(Boolean)
  }
}

export default Slider