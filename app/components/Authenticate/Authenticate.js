import React from 'react'
import PropTypes from 'prop-types'
import {centeredContainer, largeHeader, errorMSg} from 'sharedStyles/styles.css'
import {FacebookAuthButton} from 'components'

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default function Authenticate ({onAuth, isFetching, error}) {
  const facebookAuthButton = true
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader}> {'Authenticate'} </h1>
      {facebookAuthButton && <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />}
      {error ? <p className={errorMSg}>{error} </p> : null}
    </div>
  )
}
