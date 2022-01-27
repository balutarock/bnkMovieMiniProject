import {Component} from 'react'
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
import NavContext from './Context/NavContext'

class App extends Component {
  state = {isShowMenu: false}

  onChangeMenu = () => {
    this.setState(prevState => ({isShowMenu: !prevState.isShowMenu}))
  }

  render() {
    const {isShowMenu} = this.state
    return (
      <NavContext.Provider
        value={{isShowMenu, onChangeMenu: this.onChangeMenu}}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/movies/:id"
              component={SpecificMovieDetails}
            />
            <ProtectedRoute exact path="/popular" component={Popular} />
            <ProtectedRoute exact path="/account" component={Account} />
            <ProtectedRoute exact path="/search" component={SearchedResults} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </NavContext.Provider>
    )
  }
}

export default App
