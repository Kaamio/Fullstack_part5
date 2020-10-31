import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data.sort((a,b) => (a.likes > b.likes)? -1:1)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  if(window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}`))
    await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const putLike = async (blog) => {
  const likedblog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes+1,
    user: blog.user.id
  }

  const response = await axios.put(`/api/blogs/${blog.id}`, likedblog)
  console.log(response.data.likes)
  return response.data.likes
}

export default { getAll, create, setToken, putLike, remove }