import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { App } from './App'
import { AppFormProps } from './interfaces'

const url = 'https://jsonplaceholder.typicode.com/posts/1'

const expectedPutBody: AppFormProps = {
  id: '1',
  title: 'Fake title',
  body: 'Fake body'
}

const expectedGetBody: AppFormProps = {
  id: '1',
  title: 'Bogus title',
  body: 'Bogus body'
}

const server = setupServer()

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'warn'
  })
)
afterEach(() => server.resetHandlers())
beforeEach(() => {
  server.use(rest.get(url, (req, res, ctx) => res(ctx.status(200), ctx.json(expectedGetBody))))
})
afterAll(() => server.close())

test('should render the heading', async () => {
  render(<App />)

  await waitForElementToBeRemoved(() => screen.getByRole('spinbutton'))

  const heading = screen.getByRole('heading', { name: 'Hey im h1' })
  expect(heading).toBeInTheDocument()
})

test('should render values from the response body ', async () => {
  render(<App />)

  await waitForElementToBeRemoved(() => screen.getByRole('spinbutton'))

  const title = screen.getByRole('textbox', { name: 'Title' })
  expect(title).toHaveValue('Bogus title')

  const body = screen.getByRole('textbox', { name: 'Body' })
  expect(body).toHaveValue('Bogus body')
})

test('should render the button', async () => {
  render(<App />)

  await waitForElementToBeRemoved(() => screen.getByRole('spinbutton'))

  const button = screen.getByRole('button', { name: 'Send it' })
  expect(button).toBeInTheDocument()
  expect(button).toBeDisabled()
})

test('should render the success notification after form submission', async () => {
  server.use(
    rest.put(url, (req, res, ctx) => {
      if (JSON.stringify(req.body) === JSON.stringify(expectedPutBody)) {
        return res(ctx.status(200), ctx.json(expectedPutBody))
      }
      return res(ctx.status(404))
    })
  )

  render(<App />)

  await waitForElementToBeRemoved(() => screen.getByRole('spinbutton'))

  const title = await screen.findByRole('textbox', { name: 'Title' })
  userEvent.clear(title)
  userEvent.type(title, 'Fake title')

  const body = await screen.findByRole('textbox', { name: 'Body' })
  userEvent.clear(body)
  userEvent.type(body, 'Fake body')

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

  await waitForElementToBeRemoved(() => screen.getByRole('spinbutton'))

  const title = await screen.findByRole('textbox', { name: 'Title' })
  userEvent.clear(title)
  userEvent.type(title, 'Fake title')

  const body = await screen.findByRole('textbox', { name: 'Body' })
  userEvent.clear(body)
  userEvent.type(body, 'Fake body')

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
  server.use(
    rest.put(url, (req, res, ctx) => {
      if (JSON.stringify(req.body) === JSON.stringify(expectedPutBody)) {
        return res(ctx.status(200), ctx.json(expectedPutBody))
      }
      return res(ctx.status(404))
    })
  )

  render(<App />)

  await waitForElementToBeRemoved(() => screen.getByRole('spinbutton'))

  const title = await screen.findByRole('textbox', { name: 'Title' })
  userEvent.clear(title)

  const button = await screen.findByRole('button', { name: 'Send it' })
  expect(button).toBeInTheDocument()
  expect(button).toBeEnabled()
  userEvent.click(button)

  const article = await screen.findByRole('article')
  expect(article).toBeInTheDocument()
  expect(article).toHaveTextContent('Error: Required')
})
