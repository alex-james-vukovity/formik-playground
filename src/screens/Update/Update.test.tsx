import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { Update } from './Update'
import { AppFormProps } from 'interfaces'

const { getByRole, findByRole, findByText } = screen

const url = 'https://jsonplaceholder.typicode.com/posts/1'

jest.mock('react-router-dom', () => {
  const reactRouterDom = jest.requireActual('react-router-dom')
  return {
    ...reactRouterDom,
    useHistory: () => ({
      push: jest.fn()
    }),
    useParams: () => ({ postId: '1' })
  }
})

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
afterAll(() => server.close())

describe('promise resolved', () => {
  beforeEach(() => {
    server.use(rest.get(url, (req, res, ctx) => res(ctx.json(expectedGetBody))))
  })

  test('should render the heading', async () => {
    render(
      <MemoryRouter>
        <Update />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => getByRole('spinbutton'))

    const heading = getByRole('heading', { name: 'Update' })
    expect(heading).toBeInTheDocument()
  })

  test('should render values from the response body ', async () => {
    render(
      <MemoryRouter>
        <Update />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => getByRole('spinbutton'))

    const title = getByRole('textbox', { name: 'Title' })
    expect(title).toHaveValue('Bogus title')

    const body = getByRole('textbox', { name: 'Body' })
    expect(body).toHaveValue('Bogus body')
  })

  test('should render the button', async () => {
    render(
      <MemoryRouter>
        <Update />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => getByRole('spinbutton'))

    const button = getByRole('button', { name: 'Send it' })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  test('should render the success notification after form submission', async () => {
    server.use(
      rest.put(url, (req, res, ctx) => {
        if (JSON.stringify(req.body) === JSON.stringify(expectedPutBody)) {
          return res(ctx.json(expectedPutBody))
        }
        return res(ctx.status(404))
      })
    )

    render(
      <MemoryRouter>
        <Update />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => getByRole('spinbutton'))

    const title = await findByRole('textbox', { name: 'Title' })
    userEvent.clear(title)
    userEvent.type(title, 'Fake title')

    const body = await findByRole('textbox', { name: 'Body' })
    userEvent.clear(body)
    userEvent.type(body, 'Fake body')

    const button = await findByRole('button', { name: 'Send it' })
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()
    userEvent.click(button)

    const article = await findByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).not.toHaveTextContent('Error: Required')

    const notification = await findByText('Successfully saved')
    expect(notification).toBeInTheDocument()
  })

  test('should render server side error', async () => {
    server.use(rest.put(url, (req, res, ctx) => res(ctx.status(503))))

    render(
      <MemoryRouter>
        <Update />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => getByRole('spinbutton'))

    const title = await findByRole('textbox', { name: 'Title' })
    userEvent.clear(title)
    userEvent.type(title, 'Fake title')

    const body = await findByRole('textbox', { name: 'Body' })
    userEvent.clear(body)
    userEvent.type(body, 'Fake body')

    const button = await findByRole('button', { name: 'Send it' })
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()
    userEvent.click(button)

    const article = await findByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).not.toHaveTextContent('Error: Required')

    const error = await findByRole('status')
    expect(error).toHaveTextContent('Something went wrong')
  })

  test('should render client side validation errors', async () => {
    server.use(
      rest.put(url, (req, res, ctx) => {
        if (JSON.stringify(req.body) === JSON.stringify(expectedPutBody)) {
          return res(ctx.json(expectedPutBody))
        }
        return res(ctx.status(404))
      })
    )

    render(<Update />)

    await waitForElementToBeRemoved(() => getByRole('spinbutton'))

    const title = await findByRole('textbox', { name: 'Title' })
    userEvent.clear(title)

    const button = await findByRole('button', { name: 'Send it' })
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()
    userEvent.click(button)

    const article = await findByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveTextContent('Error: Required')
  })
})

test('should render server side error', async () => {
  server.use(rest.get(url, (req, res, ctx) => res(ctx.status(503))))

  render(
    <MemoryRouter>
      <Update />
    </MemoryRouter>
  )

  await waitForElementToBeRemoved(() => getByRole('spinbutton'))

  const error = await findByRole('status')
  expect(error).toHaveTextContent('Something went wrong')
})
