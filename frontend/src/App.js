import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import UserShow from './components/users/UserShow'
import SearchIndex from './components/friends/SearchIndex'
import FriendSearch from './components/friends/FriendSearch'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/users/:id" component={UserShow} />
        <Route path="/search" component={SearchIndex} />
        <Route path="/user/:id/friends" component={FriendSearch} />
      </Switch>
    </BrowserRouter>
  )
}

  export default App
