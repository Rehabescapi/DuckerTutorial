import React, {Component} from 'react'
import {Authenticate} from 'components'
import PropTypes from 'prop-types'
// import auth from 'helpers/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends Component {
  constructor (props) {
    super(props)
    this.handleAuth = this.handleAuth.bind(this)
  }

  handleAuth (e, authType) {
    e.preventDefault()
    this.props.fetchAndHandleAuthUser()
      .then(() => this.context.router.history.replace('feed'))
  }

  render () {
    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={this.props.isFetching}
        error={this.props.error}/>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

function mapStateToProps (state) {
  return {
    isFetching: state.users.isFetching,
    error: state.users.error,
  }
}
AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthUser: PropTypes.func.isRequired,

}
AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticateContainer)
