import React from 'react';
import './chat-comment.component.css';

export class ChatCommentComponent extends React.Component {

  render() {
    if (!this.props.comment || !this.props.comment.user) {
      return null;
    }

    let chatCommentClasses = "chat-comment"

    if (this.props.comment.local) {
      chatCommentClasses += " own-comment"
    }

    return (
      <li>
        <div className={chatCommentClasses}>
          {this.thumbnailImage()}
          <div className="chat-comment-message-wrapper">
            <div className="message-top">
              <div className="chat-comment-username font-theme truncate">{this.props.comment.user.real_name} - @{this.props.comment.user.username}</div>
              <div className="chat-comment-time font-theme">{this.props.comment.timeAgo}</div>
            </div>
            <div className="message-bottom font-theme">
              <div className="message-frontside" dangerouslySetInnerHTML={{ __html: this.props.comment.message }}></div>
              <div className="message-backside">
                <img className="message-backside-icon" alt="" src="./assets/calendar-icon.svg"/> 
                active since July 13, 2017
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }

  thumbnailImage() {
    if (!this.props.comment.local) {
      return (
        <div className="chat-comment-thumb-wrapper">
          <img alt="" className="chat-comment-thumb" src={"./assets/" + this.props.comment.user.username + ".jpg"}/>
        </div>)
    } else {
      return (
      <div className="chat-comment-thumb-wrapper chat-local-thumb-wrapper">  
        <div className="chat-comment-thumb">
          <img alt="" src="./assets/better-icon.svg"/> 
        </div>
      </div>)
    }
  }
}
