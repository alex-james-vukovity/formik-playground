import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

const url = 'https://jsonplaceholder.typicode.com/posts/1'

const expectedPutBody = {
  firstName: 'John',
  lastName: 'Doe'
}

const server = setupServer(
  rest.put(url, (req, res, ctx) => {
    if (JSON.stringify(req.body) === JSON.stringify(expectedPutBody)) {
      return res(ctx.status(200), ctx.json(expectedPutBody))
    }
    return res(ctx.status(404))
  })
)

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'warn'
  })
)
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should render the heading', async () => {
  render(<App />)

  const heading = screen.getByRole('heading', { name: 'Hey im h1' })
  expect(heading).toBeInTheDocument()
})

test('should render the button', async () => {
  render(<App />)

  const button = screen.getByRole('button', { name: 'Send it' })
  expect(button).toBeInTheDocument()
  expect(button).toBeEnabled()
})

test('should render the success notification after form submission', async () => {
  render(<App />)

  const firstName = await screen.findByRole('textbox', { name: 'First name' })
  userEvent.type(firstName, 'John')

  const lastName = await screen.findByRole('textbox', { name: 'Last name' })
  userEvent.type(lastName, 'Doe')

  const button = await screen.findByRole('button', { name: 'Send it' })
  expect(button).toBeInTheDocument()
  expect(button).toBeEnabled()
  userEvent.click(button)

  const article = await screen.findByRole('article')
  expect(article).toBeInTheDocument()
  expect(article).not.toHaveTextContent('Error: Required')

  const notification = await screen.findByText('Form successfully submitted')
  expect(notification).toBeInTheDocument()
})

test('should render server side error', async () => {
  server.use(rest.put(url, (req, res, ctx) => res(ctx.status(404))))

  render(<App />)

  const firstName = await screen.findByRole('textbox', { name: 'First name' })
  userEvent.type(firstName, 'John')

  const lastName = await screen.findByRole('textbox', { name: 'Last name' })
  userEvent.type(lastName, 'Doe')

  const button = await screen.findByRole('button', { name: 'Send it' })
  expect(button).toBeInTheDocument()
  expect(button).toBeEnabled()
  userEvent.click(button)

  const article = await screen.findByRole('article')
  expect(article).toBeInTheDocument()
  expect(article).not.toHaveTextContent('Error: Required')

  const notification = await screen.findByText('Server side error')
  expect(notification).toBeInTheDocument()
})

test('should render client side validation errors', async () => {
  render(<App />)

  const button = await screen.findByRole('button', { name: 'Send it' })
  expect(button).toBeInTheDocument()
  expect(button).toBeEnabled()
  userEvent.click(button)

  const article = await screen.findByRole('article')
  expect(article).toBeInTheDocument()
  expect(article).toHaveTextContent('Error: Required')
})
