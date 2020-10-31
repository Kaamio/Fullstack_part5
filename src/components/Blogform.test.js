import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './Blogform'

describe('Blogform information tests', () => {
  test('Blogform passes on correct information', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createblog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#blogurl')
    const form = component.container.querySelector('form')
    component.debug()

    fireEvent.change(title, {
      target: { value: 'test_title' }
    })
    fireEvent.change(author, {
      target: { value: 'test_author' }
    })
    fireEvent.change(url, {
      target: { value: 'test_url' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls[0][0].content)
    expect(createBlog.mock.calls[0][0].title).toBe('test_title')
    expect(createBlog.mock.calls[0][0].author).toBe('test_author')
    expect(createBlog.mock.calls[0][0].url).toBe('test_url')
  })

})