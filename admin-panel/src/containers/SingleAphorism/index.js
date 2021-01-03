import React from 'react'
import { useSelector } from 'react-redux'

const SingleAphorism = ({ history, match }) => {

  return (
    <div>
      <h1>SingleAphorism</h1>
      <button onClick={history.goBack}>Back</button>
      <p>Content</p>
    </div>
  )
}

export default SingleAphorism
