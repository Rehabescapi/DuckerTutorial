import {usersDucksExpirationLength, usersExpirationLength, repliesExpirationLength} from 'config/constants'

export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}

export function formatDuck (text, {avatar, name, uid}) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}


export function formatReply({ name, uid , avatar }, reply){
  return {
    name, 
    reply, 
    uid,
    timestamp: Date.now(),
    avatar
  }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleUsers (timestamp) {
  return getMilliseconds(timestamp) > usersExpirationLength
}

export function staleDucks (timestamp) {
  return getMilliseconds(timestamp) > usersDucksExpirationLength
}

export function staleReplies(timestamp) {
  return getMilliseconds(timestamp) > repliesExpirationLength
}