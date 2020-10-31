import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setblog, user, setMessage }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    color: 'red'
  }

  const [details, setDetails]  = useState(false)

  const hideWhenVisible = { display: details ? 'none' : '' }
  const showWhenVisible = { display: details ? '' : 'none' }
  //console.log(user.username)
  //console.log(blog.user.username)
  const showIfLoggedIn = { display: (user.username === blog.user.username) ? '' : 'none' }

  const toggleDetails = () => {
    setDetails(!details)
  }

  const registerLike = async () => {
    const likedBlog = await blogService.putLike(blog)
    blog.likes = likedBlog
    const updatedBlogs = await blogService.getAll()
    setblog(updatedBlogs)
  }

  const removeBlog = async () => {
    await blogService.remove(blog)
    const updatedBlogs = await blogService.getAll()

    setMessage('Blog succesfully deleted')
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    setblog(updatedBlogs)
  }

  return (
    <div style = {blogStyle}>
      <div style={hideWhenVisible} className = 'blogShort'>
        <p>
          {blog.title} - {blog.author} <button id='show' onClick={toggleDetails}>show</button>
        </p>
      </div>

      <div style={showWhenVisible} className = 'blogLong'>
        <p>
          {blog.title} - {blog.author} <button onClick={toggleDetails}>hide</button>  <br />
          {blog.url}<br />
          likes: {blog.likes}<button id="like_button" onClick={registerLike}>like</button><br />
          {blog.user.username}
        </p>
        <div style={showIfLoggedIn}>
          <button style={buttonStyle} onClick={removeBlog}>remove</button>
        </div>
      </div>


    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,

}


export default Blog
