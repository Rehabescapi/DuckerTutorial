
import { bindActionCreators} from 'redux'
import { Modal } from 'components'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'

function mapStateToProps ({modal, users}) {
  const duckTextLength = modal.duckText.length
  return {
    user: users[users.authedID] ? users[users.authedID].info : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled:duckTextLength <= 0 || duckTextLength > 140
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators({...modalActionCreators}, dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps)
(Modal)
