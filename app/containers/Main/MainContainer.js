import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Navigation } from 'components'
import { formatUserInfo } from 'helpers/utils'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { container, innerContainer } from './styles.css'
import { firebaseAuth } from 'config/constants'

class MainContainer extends Component {
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        formatUserInfo(userData.displayName, userData.photoURL, userData.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
        if (this.props.location.pathname === '/feed') {
          this.context.router.history.replace('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  }
  render () {
    return this.props.isFetching === true
      ? null
      : <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
  }
}

MainContainer.propTypes = {
  children: PropTypes.any,
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  setUsersLikes: PropTypes.func.isRequired,

}
MainContainer.contextTypes =
{
  router: PropTypes.object.isRequired,
}
// export default MainContainer
export default withRouter(connect(
  (state) => ({isAuthed: state.users.isAuthed, isFetching: state.users.isFetching}),
  (dispatch) => bindActionCreators({...userActionCreators, ...usersLikesActionCreators}, dispatch)
)(MainContainer))
