import React from 'react'
import './ChatBot.css'

const Chats = ({chatQuestion, chatAnswer}) => {
  return (
    <>
    <div className='chats chats-client'>
      {chatQuestion}
    </div>
    <div className='chats chats-bot'>
      {chatAnswer}
    </div>
    
    </>
  )
}

export default Chats