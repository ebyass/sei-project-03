import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import UserShow from './components/users/UserShow'
import UserUpdate from './components/users/UserUpdate'
import SearchIndex from './components/friends/SearchIndex'
import FriendSearch from './components/friends/FriendSearch'
import ExpensesNew from './components/expenses/ExpenseNew'
import ShowFriendRequests from './components/friends/ShowFriendRequests'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
				<Route path="/users/friends/requests/pending" component={ShowFriendRequests}/>

				{/* <Route path="/users/:id/search/friends" component={FriendSearch} /> */}
        <Route path="/users/friends/requests" component={SearchIndex} />
				<Route path="/users/:id" component={UserShow} />
        <Route path="/users/:id/update" component={UserUpdate} />
        <Route path="/expenses/new" component={ExpensesNew} />
				<Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

  export default App
