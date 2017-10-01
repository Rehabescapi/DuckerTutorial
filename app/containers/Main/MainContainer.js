import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Navigation } from 'components'

import {formatUserInfo } from 'helpers/utils'
import * as userActionCreators from 'redux/modules/users'
import { container, innerContainer } from './styles.css'
import {firebaseAuth} from 'config/constants'

class MainContainer extends Component {

  componentDidMount(){
    firebaseAuth().onAuthStateChanged((user)=>{
      if(user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        formatUserInfo(userData.displayName, userData.photoURL, userData.uid )
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo,Date.now())

        if( this.props.location.pathname === '/') {
          this.context.router.replace('feed')
        }
      }else{
        this.props.removeFetchingUser()
      }
    })
  }  
  render () {
    console.log('props', this.props)
    return  this.props.isFetching ===true 
    ?null
    :
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
  }

}

MainContainer.propTypes = { 
isAuthed: PropTypes.bool.isRequired,
authUser :PropTypes.func.isRequired,
fetchingUserSuccess: PropTypes.func.isRequired,
removeFetchingUser: PropTypes.func.isRequired,
}
MainContainer.contextTyoes = 
{
  router : PropTypes.object.isRequired
}
//export default MainContainer
export default withRouter(connect(
  (state) => ({isAuthed: state.isAuthed}) ,
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(MainContainer))
