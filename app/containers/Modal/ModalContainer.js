import React from 'react'
import { bindActionCreators} from 'redux'
import {Modal } from 'components'
import {connect} from 'react-redux'
import * as modalActionCreators from 'redux/modules'


function mapStateToProps({modal, users}){
    const duckTextLength= modal.duckText.length
    return {
        user: users[users.authedID]
    }
}

function mapDispatchToProps (dispatch, props) {
    return bindActionCreators(modalActionCreators, dispatch)
}

export default connect(
    mapStateToProps, mapDispatchToProps)
    (Modal)
