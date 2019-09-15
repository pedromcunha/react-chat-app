import React from 'react';
import './chat-input.component.css';
import { ReactComponent as SendButtonSvg } from './send-button.svg';
import { chatActions } from '../../duck';

export class ChatInputComponent extends React.Component {
  maxCharacterCount = 140
  textArea
  placeholderText = "whats happening"

  constructor(props) {
    super(props)
    this.state = {
      inputValue: "",
      remainingCharacterCount: this.maxCharacterCount
    }
  }

  // Handlers

  sendButtonClicked() {
    if (this.isInputInvalid()) {
      alert("The character limit is " + this.maxCharacterCount + ". Please edit your message and try again.")
      return
    }

    if (this.isInputEmpty()) {
      alert("The message is empty. Please add a message and try again.")
      return
    }

    this.sendComment()
  }

  onInputChanged(e) {
    let target = e && e.target && e.target.innerText !== undefined ? e.target : undefined
    if (target) {
      let text = e.target.innerText === "" ? this.placeholderText : e.target.innerText

      this.setState({
        inputValue: text,
        remainingCharacterCount: this.remainingCharacterCount(e.target.innerText.length)
      })
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.sendComment()
      e.preventDefault()
    }
  }
  
  // Rendering

  isInputInvalid() {
    if (this.state.remainingCharacterCount < 0) {
      return true
    }
  }

  isInputEmpty() {
    return this.state.inputValue.length === 0 || this.state.inputValue === this.placeholderText
  }

  render() {
    let characterCountClasses = "remaining-character-count font-theme"
    let sendButtonClasses = "send-button-image"
    if (this.isInputInvalid()) {
      characterCountClasses += " error"
    } else if (!this.isInputEmpty()) {
      sendButtonClasses += " send-button-active"
    }

    return (
      <div className="chat-input">
        <span className={characterCountClasses}>{this.state.remainingCharacterCount}</span>
        <div 
        contentEditable="true"
        data-text={this.placeholderText}
        className="input font-theme"
        onInput={(e) => this.onInputChanged(e)}
        onKeyDown={(e) => this.onKeyDown(e)}
        ref={(ref) => this.textArea = ref}></div>
        <button onClick={() => this.sendButtonClicked()} className="send-button font-theme">
          <SendButtonSvg alt="" className={sendButtonClasses} width="25px" height="25px"/>
        </button>
      </div>
    );
  }

  remainingCharacterCount(count) {
    return count ? this.maxCharacterCount - count : this.maxCharacterCount
  }

  // Requests

  sanitizeInput() {
    return this.state.inputValue.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim()
  }

  sendComment() {
    if (this.isInputInvalid()) {
      return
    }

    if (!this.props.store) {
      console.warn('ChatInputComponent is misconfigured, requires a store')
      return
    }

    let comment = this.sanitizeInput()
    
    this.props.store.dispatch(chatActions.sendComment(comment))

    //Make post request
    let postData = {
      comment: comment
    }

    fetch('http://localhost:3000/chat', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    this.textArea.innerText = ""
    this.setState({
      inputValue: "",
      remainingCharacterCount: this.maxCharacterCount
    })
  }
}
