import Reac, {Component} from 'react'
import PropTypes from 'prop-types'

import { DuckContiner } from 'containers'
import { mainContainer, container, content, repliesContainer,
replyTextAreaContainer, replyTextArea } from './styles.css'

import { RepliesContainer } from 'container'

import { formatReply} from 'helpers/utils'

DuckDetails.propTypes = {
    authedUser: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired,
    isFetching : PropTypes.bool.isRequired,
    error : PropTypes.string.isRequired
}

export default function DuckDetails ({duckId, isFetching, authedUser, error})
{
    return (
        <div className = { mainContainer}>
            {isFetching===true
            ?<p className={subHeader}> {'Fetching'}</p>
            :<div className={container}>
                <div className = {content}>
                    <DuckContiner duckId={duckId}
                    hideLikeCount = {false} hideReplyBtn={true}/>
                    Make replyTextArea
                </div>
                <div className = {repliesContainer}>
                    Reply Section 
                </div>  
            </div> }
            {error ? <p className={errorMsg}> {error} </p> : null}
        </div>
    )
}