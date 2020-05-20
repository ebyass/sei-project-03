import React from 'react'
import { getPendingExpensesToAccept, getPendingExpensesToUser, getUserFriends, acceptPendingExpense } from '../../lib/api'
import { getPayload } from '../../lib/_auth'

class ExpensesRequestIndex extends React.Component {
  state = {
    pendingExpensesToAccept: [],
    pendingExpensesOwedToUser: [],
    friends: []
  }

  async componentDidMount() {
		try {
      const userId = getPayload().sub
      const pendingExpenses = await getPendingExpensesToAccept()
      const pendingExpensesOwedTo = await getPendingExpensesToUser()
      const friends = await getUserFriends(userId)
      this.setState({ pendingExpensesToAccept: pendingExpenses.data, pendingExpensesOwedToUser: pendingExpensesOwedTo.data, friends: friends.data })
      console.log(this.state)
		} catch (err) {
			console.log(err.message)
		}
	}

  findFriendsName = friendId => {
    const index = this.state.friends.findIndex(x => x.user === friendId)
    const name = this.state.friends[index].firstName
    return name
  }

  handleAccept = async event => {
    const expenseId = event.target.value
    try {
      const res = await acceptPendingExpense(expenseId)
      console.log(res)
      this.props.history.push('/users/expenses')
    } catch (err) {
      console.log('no joy')
    }
  }

  render() {
    return (
      <section className="container">
        <label>Owed by you</label>
        <hr />
        {this.state.pendingExpensesToAccept.map(expense => (
          <label value={expense.user}>
            You owe {this.findFriendsName(expense.paidBy)} £{expense.amountOwed.toFixed(2)} for {expense.name}
            <button value={expense._id} onClick={this.handleAccept}>Accept Expense</button>
            <br />
          </label>
        ))}
        <label>Owed by friends</label>
        <hr />
        {this.state.pendingExpensesOwedToUser.map(expense => (
          <label value={expense.user}>{this.findFriendsName(expense.owedBy)} owes you £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>
          
        ))}
      </section>
      
    )
  }




}

export default ExpensesRequestIndex