import React from 'react'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  if (isError ==='True') {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

export default Notification