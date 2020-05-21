import React from 'react'
import { getPendingExpensesToAccept, getPendingExpensesToUser, getUserFriends, acceptPendingExpense, deleteExpense } from '../../lib/api'
import { getPayload } from '../../lib/_auth'
import { Link } from 'react-router-dom'
import { notify } from 'react-notify-toast'

class ExpensesRequestIndex extends React.Component {
  state = {
    pendingExpensesToAccept: [],
    pendingExpensesOwedToUser: [],
    friends: [],
    expenseToDeleteId: '',
    isRejected: true
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

  handleAccept = async event => { // * User notification should confirm expense has been accepted
    const expenseId = event.target.value
    try {
      const res = await acceptPendingExpense(expenseId)
      notify.show('Expense Accepted', 'success', 1500)
      this.props.history.push('/users/expenses')
    } catch (err) {
      console.log('no joy')
    }
  }


  handleRejectButton = event => { // * User notification should prompt to confirm, remind that expense is being deleted for all users
    const expenseId = event.target.value
    this.setState({ expenseToDeleteId: expenseId, isRejected: false })
  }


  handleReject = async event => { // * User notification should prompt to confirm, remind that expense is being deleted for all users
    const expenseId = event.target.value
    try {
      const res = await deleteExpense(expenseId)
      notify.show('Expense Deleted', 'success', 1500)
      const pendingExpenses = await getPendingExpensesToAccept()
      this.setState({ pendingExpensesToAccept: pendingExpenses.data, isRejected: true, expenseToDeleteId: '' })
    } catch (err) {
      console.log('Deletion did not work')
    }
  }
  
  handleCancelReject = () => {
    this.setState({ expenseToDeleteId: '', isRejected: true })
  }

  render() {
    return (
      <section className="section expenses">
        <Link to="/users/expenses/new"><h3>Create New Expense</h3></Link>
        <div className="tabs">
          <Link to="/users/expenses" className="accountable-brand shaded">Expenses</Link>
          <span className="accountable-brand highlighted">Pending expenses</span>
        </div>
        <div className="options">
          <div className="option">
            <h2>Owed by you</h2>
          </div>
          <div className="option-content">
            {this.state.pendingExpensesToAccept.map(expense => (
              <>
              <Link to={`/users/expenses/${expense._id}`}>
                <label key={expense._id} value={expense.user}>
                  <p>You owe {this.findFriendsName(expense.paidBy)} £{expense.amountOwed.toFixed(2)} for {expense.name}</p>
                  </label>
              </Link>
                  <div className="buttons">
                  <button value={expense._id} onClick={this.handleAccept} className="button blue">Accept Expense</button>
                  <button value={expense._id} onClick={this.handleRejectButton} className="button other">Reject Expense</button>
                  </div>
              </>
            ))}
          </div>
          <div className="option">
            <h2>Owed by friends</h2>
          </div>
          <div className="option-content">
            {this.state.pendingExpensesOwedToUser.map(expense => (
              <Link to={`/users/expenses/${expense._id}`}>
                <label key={expense._id} value={expense.user}>{this.findFriendsName(expense.owedBy)} owes you £{expense.amountOwed.toFixed(2)} for {expense.name}<br /></label>
              </Link>
            ))}
          </div>
          <div className={`modal ${this.state.isRejected ? '' : 'is-active'}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <section className="modal-card-body has-text-centered">
                <div className="score is-large">Warning! This will delete the expense for you and your friend. Are you sure?</div>
              </section>
              <div className="buttons is-centered">
                <button value={this.state.expenseToDeleteId} onClick={this.handleReject} className="button">Yes. Delete the expense</button>
                <button onClick={this.handleCancelReject} className="button">No. Keep the expense</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
  }




}

export default ExpensesRequestIndex