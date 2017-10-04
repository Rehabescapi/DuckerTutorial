import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { DuckContainer, RepliesContainer } from 'containers'
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css'

import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css'


import { formatReply} from 'helpers/utils'

Reply.propTypes = {
  submit : PropTypes.func.isRequired
}

function Reply ({submit}) {
  const handleSubmit = (e) => {
    if( Reply.ref.value.length ===0) return 
    submit(reply.ref.value, 3)
    Reply.ref.value=''
  }


  return (
    <div className={replyTextAreaContainer}>
      <textarea
      ref = {((ref) => Reply.ref = ref)}
      className={replyTextArea}
      maxLength={140}
      placeholder='Your response'
      type='text'/>
      <button
          className={darkBtn}
          
          onClick={handleSubmit}>
          Reply
        </button>
      </div>
  )
}





DuckDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired
}

export default function DuckDetails ({duckId, isFetching, authedUser, error, addAndHandleReply}) {
  return (
    <div className = {mainContainer}>
      {isFetching === true
        ? <p className={subHeader}> {'Fetching'}</p>
        : <div className={container}>
          <div className ={content}>
            <DuckContainer duckId={duckId}
              hideLikeCount = {false} hideReplyBtn={true}/>
                    <Reply submit={(replyText) => addAndHandleReply(duckId, formatReply(authedUser,replyText))}/>
          </div>
          <div className = {repliesContainer}>
                 <RepliesContainer duckId={duckId}/>
          </div>
        </div> }
      {error ? <p className={errorMsg}> {error} </p> : null}
    </div>
  )
}
