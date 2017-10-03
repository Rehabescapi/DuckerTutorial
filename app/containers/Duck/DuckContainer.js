import React , { Component}from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Duck } from 'components'

import * as usersLikesAction from 'redux/modules/usersLikes'
const { func, object, bool, number } = PropTypes


class DuckContainer extends Component {
    constructor(props){
        super(props)

        this.handleClick= this.handleClick.bind(this)
        this.goToProfile = this.goToProfile.bind(this)
    }
    goToProfile (e) {
        e.stopPropagation()
        this.context.router.history.push(`${this.props.duck.duckId}`)
    }
    handleClick (e) {
        e.stopPropagation()
        this.context.router.history.push(`/duck-details/${this.props.duck.duckId}`)
    }
    

    render () {
        return (
            <Duck 
            goToProfile={this.goToProfile}
            onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
            {...this.props}/>
        )
    }
}

DuckContainer.propTypes = {
    duck : PropTypes.object.isRequired,
    handleClick : PropTypes.func.isRequired,
    hideLikeCount: PropTypes.bool.isRequired,
    hideReplyBtn: PropTypes.bool.isRequired,
    isLiked : PropTypes.bool.isRequired,
    numberOfLikes: PropTypes.number,
    addAndHandleLike : PropTypes.func.isRequired,
    handleDeleteLike : PropTypes.func.isRequired,
}
DuckContainer.contextTypes = {
    router : PropTypes.object.isRequired
}





function mapStateToProps ({ducks, likeCount, usersLikes}, props) {
    return {
        duck: ducks[props.duckId],
        hideLikeCount: props.hideLikeCount, 
        hideReplyBtn: props.hideReplyBtn,
        isLiked: usersLikes[props.duckId] ===true,
        numberOfLikes: likeCount[props.duckId],
    }
}

function mapDispathToProps(dispatch) {
    return bindActionCreators(usersLikesActions, dispatch)
}

export default connect(
    mapStateToProps,
(dispatch)=> bindActionCreators(usersLikesAction,dispatch))(DuckContainer)
