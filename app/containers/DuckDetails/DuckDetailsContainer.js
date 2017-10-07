import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { DuckDetails } from 'components'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'

class DuckDetailsContainer extends Component {
  componentDidMount () {
    this.props.initLikeFetch(this.props.duckId)
    if (this.props.duckAlreadyFetched === false) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
  }
  render () {
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId = {this.props.duckId}
        error = {this.props.error}
        isFetching= {this.props.isFetching}
        addAndHandleReply= {this.props.addAndHandleReply}/>
    )
  }
}

function mapStateToProps ({ducks, likeCount, users}, props) {
  const duckId = props.match.params.duckId
  
    return {
    isFetching: ducks.get('isFetching') || likeCount.isFetching,
    error: ducks.get('error'),
    authedUser: users[users.authedId].info,
    duckId,
    duckAlreadyFetched: !!ducks.get(props.match.params.duckId)
   
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators
  }, dispatch)
}

DuckDetailsContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  removeFetching: PropTypes.func.isRequired,
  fetchAndHandleDuck: PropTypes.func.isRequired,
  duckAlreadyFetched: PropTypes.bool.isRequired,
  initLikeFetch: PropTypes.func.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckDetailsContainer)
