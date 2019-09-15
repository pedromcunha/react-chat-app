import React from 'react';
import ReactDOM from 'react-dom'
import {ChatCommentComponent} from '../chat-comment/chat-comment.component';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './chat-list.component.css';
import { chatActions } from '../../duck/index';

export class ChatListComponent extends React.Component {
  listEl = null

  constructor(props) {
    super(props)

    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    this.props.store
    .subscribe(() => {
      if (!this.props.store) { 
        return 
      }

      let state = this.props.store.getState()

      this.setState({
        comments: state.comments ? state.comments : []
      })
    })

    this.fetchChatRoom()
  }

  componentDidUpdate() {
    let listDomEl = ReactDOM.findDOMNode(this.listEl)
    
    if (listDomEl) {
      listDomEl.scrollTop = listDomEl.scrollHeight
    }
  }

  fetchChatRoom() {
    fetch('http://localhost:3000/chatRoom')
    .then(data => data.json())
    .then((response) => {
      if (!response || !response.posts) {
        return
      }
      
      this.props.store.dispatch(chatActions.fetchedChatroom(response))
    })
  }

  render() {
    if (this.state.comments.length === 0) {
      return null
    }
    
    const commentElements = this.state.comments.map((comment) => {
      return (
        <CSSTransition classNames="chat-comment" key={comment.id} timeout={500} appear>
          <ChatCommentComponent comment={comment}></ChatCommentComponent>
        </CSSTransition>
      )
    })

    return (
      <TransitionGroup className="chat-list" component="ul" ref={(ref) => this.listEl = ref}>
          {commentElements}
      </TransitionGroup>
    );
  }
}