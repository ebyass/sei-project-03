import React from 'react'
import { getExpensesOwedByUser, getExpensesOwedToUser, getUserFriends, getSettledExpenses, getSettledWithExpenses, settleExpense } from '../../lib/api'
import { getPayload } from '../../lib/_auth'

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

  handleAccept = async event => {
    const expenseId = event.target.value
    console.log(expenseId)
    try {
      const res = await settleExpense(expenseId)
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
        {this.state.expensesOwedByUser.map(expense => (
          <label value={expense.user}>
            You owe {this.findFriendsName(expense.paidBy)} £{expense.amountOwed.toFixed(2)} for {expense.name}
            <button value={expense._id} onClick={this.handleAccept}>Settle Expense</button>
          <br />
          </label>
        ))}
        <label>Owed by friends</label>
        <hr />
        {this.state.expensesOwedToUser.map(expense => (
          <label value={expense.user}>{this.findFriendsName(expense.owedBy)} owes you £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>         
        ))}
        <label>Settled by you</label>
        <hr />
        {this.state.expensesSettledByUser.map(expense => (
          <label value={expense.user}>You paid {this.findFriendsName(expense.paidBy)} £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>
          
        ))}
        <label>Settled by friends</label>
        <hr />
        {this.state.expensesSettledWithUser.map(expense => (
          <label value={expense.user}>{this.findFriendsName(expense.owedBy)} owes you £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>
          
        ))}
      </section>
      
    )
  }




}

export default ExpensesIndex