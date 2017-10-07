import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Feed } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'
import {List} from 'immutable'
class FeedContainer extends Component {
  componentDidMount () {
    this.props.setAndHandleFeedListeners()
  }

  render () {
    return (
      <Feed
        duckIds = {this.props.duckIds}
        newDucksAvailable = {this.props.newDucksAvailable}
        error= {this.props.error}
        isFetching= {this.props.isFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}/>
    )
  }
}

FeedContainer.propTypes = {
  duckIds: PropTypes.instanceOf(List),
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListeners: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

function mapStateToProps ({feed}) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable :feed.get('newDucksAvailable'),
    error : feed.get('error'),
    isFetching : feed.get('isFetching'),
    duckIds : feed.get('duckIds'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(mapStateToProps,
  mapDispatchToProps)
(FeedContainer)
