import React, { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [Message, setMessage] = useState(null)
  const [ErrorMessage, setErrorMessage] = useState('False')

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloggerUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Log in to Application</h1>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable id="blogform-visible" buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createblog={addBlog} user={user}/>
    </Togglable>
  )

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)      
    setBlogs(blogs.concat(returnedBlog))
    const bloggas = await blogService.getAll()    
    setBlogs(bloggas)     
    
    setMessage(`${user.name} created the blog ${blogObject.title} with author ${blogObject.author}`)
    blogFormRef.current.toggleVisibility()
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloggerUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`user ${user.name} logged in. Welcome!`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('True')
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    setMessage(`user ${user.name} logged out. Goodbye!`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return(
      <div>
        <Notification message={Message} isError={ErrorMessage}/>
        {loginForm()}
      </div>
    )}

  return(
    <div>
      <Notification message={Message} isError = {ErrorMessage}/>
      <p>{user.name} is logged in</p>
      <button onClick={() => handleLogout()}>
          logout
      </button>
      <div>
        {blogForm()}
      </div>
      <div id="blogs">
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setblog={setBlogs} user={user} setMessage={setMessage}/>
        )}
      </div>

    </div>
  )}


export default App