// actions.js
import types from './types.js';

const fetchedChatroom = (response) => {
  return {
    type: types.FETCHED_CHATROOM,
    response: response
  }
};

const sendComment = (message) => {
  return {
    type: types.SEND_COMMENT,
    message: message,
  }
};

export default {
  fetchedChatroom,
  sendComment
}