import React from 'react'
import { getExpensesOwedByUser, getExpensesOwedToUser, getUserFriends, getSettledExpenses, getSettledWithExpenses, settleExpense } from '../../lib/api'
import { getPayload } from '../../lib/_auth'
import { Link } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import ExpenseIcon from './ExpenseIcon'

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
        {
          expensesOwedByUser: owedExpenses.data,
          expensesOwedToUser: owedToExpenses.data,
          expensesSettledByUser: settledExpenses.data,
          expensesSettledWithUser: settledWithExpenses.data,
          friends: friends.data
        }
      )
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
    try {
      await settleExpense(expenseId)
      notify.show('Expense settled', 'success', 1500)
      const owedExpenses = await getExpensesOwedByUser()
      const settledExpenses = await getSettledExpenses()
      this.setState({ expensesOwedByUser: owedExpenses.data, expensesSettledByUser: settledExpenses.data })
    } catch (err) {
      notify.show('Not enough money in your account to settle', 'error', 1500)
    }
  }

  render() {
    return (
      <section className="section expenses">
        <h1 className="accountable-brand">Expenses</h1>
        <Link to="/users/expenses/new"><h3>Create New</h3></Link>
        <div className="tabs">
          <span className="accountable-brand highlighted">Expenses</span>
          <Link to="/users/expenses/pending" className="accountable-brand shaded">Pending expenses</Link>
        </div>
        <div className="options">
          <div className="option">
            <h2>Owed by you</h2>
            </div>
            <div className="option-content">
            {this.state.expensesOwedByUser.map(expense => (
              <>
              <Link to={`/users/expenses/${expense._id}`}>
                <ExpenseIcon {...expense} />
                <label key={expense._id} value={expense.user}>
                  <p>You owe {this.findFriendsName(expense.paidBy)} £{expense.amountOwed.toFixed(2)} for {expense.name}</p>
                  </label>
              </Link>
                  <div className="buttons">
                  <button key={expense._id} value={expense._id} onClick={this.handleAccept} className="button blue">Settle Expense</button>
                  </div>
              </>
            ))}
            </div>
          <div className="option">
            <h2>Owed by friends</h2>
            </div>
            <div className="option-content">
            {this.state.expensesOwedToUser.map(expense => (
              <Link to={`/users/expenses/${expense._id}`}>
                <ExpenseIcon {...expense} />
                <label key={expense._id} value={expense.user}>{this.findFriendsName(expense.owedBy)} owes you £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>
              </Link>
            ))}
            </div>
          <div className="option">
            <h2>Settled by you</h2>
            </div>
            <div className="option-content">
            {this.state.expensesSettledByUser.map(expense => (
              <Link to={`/users/expenses/${expense._id}`}>
                <ExpenseIcon {...expense} />
                <label key={expense._id} value={expense.user}>You paid {this.findFriendsName(expense.paidBy)} £{expense.amountOwed.toFixed(2)} for {expense.name}</label>
                <br />
              </Link>
            ))}
            </div>
          <div className="option">
            <h2>Settled by friends</h2>
            </div>
            <div className="option-content">
            {this.state.expensesSettledWithUser.map(expense => (
              <Link to={`/users/expenses/${expense._id}`}>
                <label key={expense._id} value={expense.user}>{this.findFriendsName(expense.owedBy)} owes you £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>
              </Link>
            ))}
            </div>
        </div>
      </section>

    )
  }




}

export default ExpensesIndex