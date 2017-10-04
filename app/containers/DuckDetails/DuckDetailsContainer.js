import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import {DuckDetails } from 'components'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'

const { funct, object, string , bool} = PropTypes

class DuckDetailsContainer extends Component{
    constructor(props)
    {
        super(props)

        //bindshit to this
    }
    componentDidMount () { 
        this.props.initLikeFetch(this.props.duckId)
        if(this.props.duckAlreadyFetched=== false){
            this.props.fetchAndHandleDuck(this.props.duckId)
        }else { 
            this.props.removeFetching()
        }
    }
    render(){
        return (
            <DuckDetails
            authedUser={this.props.authedUser}
            duckId = {this.props.duckId}
            error = {this.props.error}
            isFetching= {this.props.isFetching}
            />
        )
    }
}

function mapStateToProps ({ducks,likeCount, users} , props)
{
    return {
        isFetching: ducks.isFetching || likeCount.isFetching,
        error : ducks.error,
        authedUser: users[users.authedUser].info,
        duckId : props.routeParams.duckId,
        duckAlreadyFetched : !!ducks[props.routeParams.duckId]
    }
}


function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        ...duckActionCreators,
        ...likeCountActionCreators
    },dispatch)
}

DuckDetailsContainer.propTypes = {
    authedUser : PropTypes.object.isRequired,
    duckId : PropTypes.string.isRequired,
    error : PropTypes.string.isRequired,
    isFetching : PropTypes.bool.isFetching,
    removeFetching : PropTypes.func.isRequired,
    fetchAndHandleDuck : PropTypes.func.isRequired,
    duckAlreadyFetched: PropTypes.bool.isRequired,
    initLikeFetch : PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (DuckDetailsContainer)