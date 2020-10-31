import React, { useState } from 'react'
import blogs from '../services/blogs'


const BlogForm = ({ createblog , user }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogurl] = useState('')
  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setBlogurl(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    
    createblog({
      title:blogTitle,
      author:blogAuthor,
      url:blogUrl,
      likes:0,
      user: user      
    })    
    setBlogAuthor('')
    setBlogTitle('')
    setBlogurl('')   
  }

  return (
    <div>
      <div>
        <h2> Create new blog </h2>
      </div>

      <form onSubmit={addBlog}>
        <div>
           title
          <input id='title'
            type="text"
            value={blogTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
                url
          <input id='blogurl'
            type="text"
            value={blogUrl}
            onChange={handleUrlChange}
          />
        </div>
        <div>
                author
          <input id='author'
            type="text"
            value={blogAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <button id="submit-create-blog" type="submit" className='createblog'>create</button>
      </form>
    </div>
  )
}

export default BlogForm