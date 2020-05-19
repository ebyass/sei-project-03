import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import SearchIndex from './components/friends/SearchIndex'
import FriendSearch from './components/friends/FriendSearch'

class App extends React.Component {

  async componentDidMount() {
    const res = await fetch('/api/users')
    console.log('Fetched the data')
    const data = await res.json()
    console.log(data)
  }

  render() {
    return (
<BrowserRouter>
<Navbar />
<Switch>
<Route exact path="/" component={Home} />
<Route path="/register" component={Register} />
<Route path="/login" component={Login} />
<Route path="/search" component={SearchIndex} />
<Route path="/user/:id/friends" component={FriendSearch} />
</Switch>
</BrowserRouter>
    )
  }
}

export default App
