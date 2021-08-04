import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import PageNotFound from './components/PageNotFound'
import SpecificMovieDetails from './components/SpecificMovieDetails'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import SearchedResults from './components/SearchedResults'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/specificMovieDetails/:id"
        component={SpecificMovieDetails}
      />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/search" component={SearchedResults} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
