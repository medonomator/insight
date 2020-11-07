import React from 'react'
import { Route, Link } from 'react-router-dom'

const Aphorisms = (props) => {
  const custom = [
    {
      id: 1,
      name: 'name',
      desc: 'desc',
    },
    {
      id: 2,
      name: 'name',
      desc: 'desc',
    },
    {
      id: 3,
      name: 'name',
      desc: 'desc',
    },
  ]

  return (
    <div>
      <h1>Aphorisms</h1>
      {custom.map((item, index) => {
        return (
          <div key={index}>
            {item.name}
            <Link to={`${props.match.path}/${item.id}`}>Click me</Link>
          </div>
        )
      })}
    </div>
  )
}

export default Aphorisms
