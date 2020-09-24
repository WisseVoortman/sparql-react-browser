import React from 'react'

const Error = ({ message }) =>
  message
    ? <span style={{ color: 'red' }}>Error: {message}</span>
    : null

export default Error