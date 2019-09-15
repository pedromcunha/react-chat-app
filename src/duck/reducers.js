import types from './types'

const INITIAL_STATE = {
  comments: [],
  users: []
}

let chatReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCHED_CHATROOM:
      let parsedData = parseComments(action.response)
      return {
        comments: parsedData.posts,
        users: parsedData.users
      }
    case types.SEND_COMMENT:
      state.comments.push(localComment(action.message))
      return state
    default:
      return state
  }
}

function parseComments(data) {
  let users = {}
  if (!data || !data.users){ 
    return data
  }

  data.users.map((user) => users[user.id] = user)

  data.posts.map((post) => {
    let timestamp = new Date(post.ts * 1000)
    post.user = users[post.user]
    post.timeAgo = timestamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    post.message = linkify(post.message)
    return post
  })

  return data
}

function localComment(message) {
  if (!message) { 
    console.warn('Creating a comment requires a message')
    return
  }

  let date = new Date()

  return {
    id: date.getTime(),
    user: -1,
    local: true,
    message: linkify(message),
    timeAgo: date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }
}

function linkify(value) {
  if (!value) {
    return value;
  }
  // If the text contains HTML, only linkify the text that precedes it
  let regex = /((http(s?)(:\/\/))?(([w]{3}|(.*))\.)?([a-zA-Z|0-9])+\.(com(\.au)?|org|me|net|ly|be|gl|co|it|info|(co(\.))?uk|ca|nz|tv)(\/[^\s]+)*)+/g;
  let htmlStart = value.indexOf('<');
  let plainText = htmlStart > -1 ? value.substr(0, htmlStart) : value;
  let html = htmlStart > -1 ? value.substr(htmlStart) : '';
  // Replace URLs with links
  let tokens = plainText.split(' ').map((t) => {
    return t.replace(regex, function (url) {
      let href = url.substr(0, 4) !== 'http' ? 'http://' + url : url;
      return '<a href="' + href.replace(/("|').*$/g, '') + '" target="_blank" rel="nofollow noreferrer noopener">' + url.replace(/("|').*$/g, '') + '</a>';
    });
  });
  // Return the result
  return tokens.join(' ') + html;
}

export default chatReducer