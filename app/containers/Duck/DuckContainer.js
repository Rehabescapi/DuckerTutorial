import React , {Component}from 'react'
import PropTypes from 'prop-types'
import { connnect } from 'react-redux'
import { Duck } from 'components'
const { func, object, bool, number } = PropTypes


class DuckContainer extends Component {


    getDefaultProps() {
        return {
            hideReplyBtn:false,
            hideLikeCount: true,
        }
    }

    goToProfile (e) {
        e.stopPropagation()
        this.context.router.push('/' + this.props.duck.duckId)
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
    numberOfLikes: PropTypes.number.isRequired,
    addAndHandleLike : PropTypes.func.isRequired,
    handleDeleteLike : PropTypes.func.isRequired,
}
DuckContainer.contextTypes = {
    router : PropTypes.object.isRequired
}

function mapStateToProps ({ducks, likeCount, userLikes}, props) {
    return {
        duck: ducks[props.duckId],
        hideLikeCount: props.hideLikeCount, 
        hideReplyBtn: props.hideReplyBtn,
        isLiked: usersLikes[props.duckId] ===true,
        numberOfLikes: likeCount[props.duckId],
    }
}

export default connnect(
    mapStateToProps)(DuckContainer)
