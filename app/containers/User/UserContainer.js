import React,{Component} from 'react'
import {PropTypes} from 'prop-types'
import {User } from 'components'
import * as usersActionCreators from 'redux/modules/users'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import {staleUsers, staleDucks} from 'helpers/utils'
class UserContainer extends Component{



    render() {
        return(
            <User 
            noUser={this.props.noUser}
            name={this.props.name}
            isFetching = {this.props.isFetching}
            error = {this.props.error}
            duckIds= {this.props.duckIds}/>
        )
    }


}

UserContainer.propTypes = {
noUser : PropTypes.bool.isRequired,
name: PropTypes.string.isRequired,
isFetching : PropTypes.bool.isRequired,
error: PropTypes.string.isRequired,
duckIds: PropTypes.array.isRequired,
fectchAndHandleUsersDucks : PropTypes.func.isRequired,
fetchAndHandleUSer : PropTypes.func.isRequired,
lastUpdatedUser : PropTypes.number.isRequired,
lastUpdatedDucks : PropTypes.number.isRequired
}

function mapStateToProps({users}, props){
    const user =users[props.routeParamps.uid]
    const noUser = typeof user === 'undefined'

    return {
        noUser,
        isFetching: users.isFetching || usersDucks.isFetching,
        error : users.error || usersDucks.error,
        duckIds : specificUsersDucks? specificUsersDucks : [],
        lastUpdatedUser : user? user.lastUpdated : 0,
        lastUpdatedDucks : specifUsersDucks? specificUsersDucks.lastUpdated : 0
    }
}