import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe ('rendertest', () => {

  test('Only title and author are rendered in shortmode ', () => {
    const user = {
      name: 'jorma',
      username: 'jorkka'
    }

    const blogi= {
      title: 'Component testing',
      author: 'testaaja',
      url: 'www.test.fi',
      likes: 1,
      user:user
    }

    const component = render(
      <Blog blog={blogi} user={user}/>
    )

    const elements = component.container.querySelector('.blogShort')
    expect(elements).toHaveTextContent('Component testing', 'testaaja')
    expect(elements).not.toHaveTextContent('www.test.fi', '1')

  })

  test('Url and likes are visible after show-button is pressed', () => {
    const user = {
      name: 'jorma',
      username: 'jorkka'
    }

    const blogi= {
      title: 'Component testing',
      author: 'testaaja',
      url: 'www.test.fi',
      likes: 1,
      user:user
    }

    const component = render(
      <Blog blog={blogi} user={user} />
    )

    const button = component.getByText('show')
    fireEvent.click(button)

    const elements = component.container.querySelector('.blogLong')
    expect(elements).toHaveTextContent('Component testing', 'testaaja', 'www.test.fi', '1')

  })
})