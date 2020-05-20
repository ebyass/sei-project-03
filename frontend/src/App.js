import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import UserShow from './components/users/UserShow'
import SearchIndex from './components/friends/SearchIndex'
import FriendSearch from './components/friends/FriendSearch'
import ExpensesNew from './components/expenses/ExpenseNew'
import ExpensesIndex from './components/expenses/ExpensesIndex'
import ExpensesRequestIndex from './components/expenses/ExpensesRequestIndex'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/user/:id/friends" component={FriendSearch} />
        <Route path="/users/expenses/pending" component={ExpensesRequestIndex} />
        <Route path="/users/expenses" component={ExpensesIndex} />
        
        <Route path="/users/:id" component={UserShow} />
        <Route path="/search" component={SearchIndex} />
        
        <Route path="/expenses/new" component={ExpensesNew} />
      </Switch>
    </BrowserRouter>
  )
}

  export default App
