import React from 'react'
import classes from './notFound.module.css'
import { Link } from 'react-router-dom'

const NotFound = ({message='Nothing Found!', linkRoute='/', linkText='Go To HomePage'}) => {
  return (
    <div className={classes.container}>
      {message}
      <Link to={linkRoute}>{linkText}</Link>
    </div>
  )
}

export default NotFound