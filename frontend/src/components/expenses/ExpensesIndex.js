import React from 'react'
import { getExpensesOwedByUser, getExpensesOwedToUser, getUserFriends, getSettledExpenses, getSettledWithExpenses, settleExpense } from '../../lib/api'
import { getPayload } from '../../lib/_auth'
import { Link } from 'react-router-dom'

class ExpensesIndex extends React.Component {
  state = {
    expensesOwedByUser: [],
    expensesOwedToUser: [],
    expensesSettledByUser: [],
    expensesSettledWithUser: [],
    friends: []
  }

  async componentDidMount() {
		try {
      const userId = getPayload().sub
      const owedExpenses = await getExpensesOwedByUser()
      const owedToExpenses = await getExpensesOwedToUser()
      const settledExpenses = await getSettledExpenses()
      const settledWithExpenses = await getSettledWithExpenses()
      const friends = await getUserFriends(userId)
      this.setState(
        { expensesOwedByUser: owedExpenses.data, 
          expensesOwedToUser: owedToExpenses.data,
          expensesSettledByUser: settledExpenses.data,
          expensesSettledWithUser: settledWithExpenses.data, 
          friends: friends.data }
      )
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

  handleAccept = async event => { // * Need to bring in error validation/messaging (i.e. not enough balance etc.)
    const expenseId = event.target.value
    console.log(expenseId)
    try {
      const res = await settleExpense(expenseId)
      console.log(res)
      window.location.reload()
    } catch (err) {
      console.log('no joy')
    }
  }

  render() {
    return (
      <section className="container">
        <Link to="/users/expenses/new">Create New Expense</Link>
        <br />
        <Link to="/users/expenses/pending">View Pending Expenses</Link>
        <br />
        <label>Owed by you</label>
        <hr />
        {this.state.expensesOwedByUser.map(expense => (
          <Link to={`/users/expenses/${expense._id}`}>
            <label key={expense._id} value={expense.user}>
            You owe {this.findFriendsName(expense.paidBy)} £{expense.amountOwed.toFixed(2)} for {expense.name}
            <button key={expense._id} value={expense._id} onClick={this.handleAccept}>Settle Expense</button>
          <br />
          </label>
          </Link> 
        ))}
        <label>Owed by friends</label>
        <hr />
        {this.state.expensesOwedToUser.map(expense => (
          <Link to={`/users/expenses/${expense._id}`}>
            <label key={expense._id} value={expense.user}>{this.findFriendsName(expense.owedBy)} owes you £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>
          </Link>       
        ))}
        <label>Settled by you</label>
        <hr />
        {this.state.expensesSettledByUser.map(expense => (
          <Link to={`/users/expenses/${expense._id}`}>
            <label key={expense._id} value={expense.user}>You paid {this.findFriendsName(expense.paidBy)} £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>
          </Link>
        ))}
        <label>Settled by friends</label>
        <hr />
        {this.state.expensesSettledWithUser.map(expense => (
          <Link to={`/users/expenses/${expense._id}`}>
            <label key={expense._id} value={expense.user}>{this.findFriendsName(expense.owedBy)} owes you £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>
          </Link>
          
        ))}
      </section>
      
    )
  }




}

export default ExpensesIndex