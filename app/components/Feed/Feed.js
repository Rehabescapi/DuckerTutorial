import React from 'react'
import PropTypes from 'prop-types'
import { newDuckContainer, header} from './styles.css'
import { DuckContainer } from 'containers'
import { errorMsg } from 'sharedStyles/styles.css'
import { fromJS, List } from 'immutable'
NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

function NewDucksAvailable ({handleClick}) {
  return (
    <div className={newDuckContainer} onClick={handleClick}>
      {'New Ducks Available'}
    </div>
  )
}
Feed.propTypes = {
  duckIds: PropTypes.instanceOf(List),
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

export default function Feed (props) {
  return props.isFetching === true
    ? <h1 className={header}> {'Fetching'}</h1>
    : <div>
      {props.newDucksAvailable &&
    <NewDucksAvailable handleClick={props.resetNewDucksAvailable}/> }
      {props.duckIds.size === 0 &&
   <p className={header}> {'This is unfortunate'}<br/>
     {'It appears there are no ducks yet'} </p>}
      {props.duckIds.map((id) => (

        <DuckContainer
          duckId={id}
          key={id}/>
      ))}
      {props.error ? <p className={errorMsg}> {props.error}</p> : null}
    </div>
}
