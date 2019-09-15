import React from 'react';
import './App.css';
import './reset.css';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { createStore } from 'redux';
import chatReducer from './duck';

// Store
let store = createStore(chatReducer)

function App() {
  return (
    <div className="container">
      <ChatListComponent store={store}></ChatListComponent>
      <ChatInputComponent store={store}></ChatInputComponent>
    </div>
  );
}

export default App;
