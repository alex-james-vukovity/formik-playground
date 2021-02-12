import { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { List, Update, Create } from 'screens'

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <List />
        </Route>
        <Route exact path="/posts/create">
          <Create />
        </Route>
        <Route exact path="/posts/:postId">
          <Update />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
