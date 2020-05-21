import React from 'react'
import { getUsersAndIds, getSingleExpense } from '../../lib/api'
import { Link } from 'react-router-dom'

class ExpenseShow extends React.Component{
  state = {
    expense: {},
    usersInfo: [],
    paidByName: '',
    owedByName: ''
  }

  async componentDidMount() {
		try {
      const expenseId = this.props.match.params.id
      const users = await getUsersAndIds()
      const expense = await getSingleExpense(expenseId)
      this.setState({ usersInfo: users.data, expense: expense.data })
      this.findNames(this.state.expense.paidBy, this.state.expense.owedBy)
		} catch (err) {
			console.log(err.message)
		}
  }
  
  findNames = (paidBy, owedBy) => {
    const indexPaid = this.state.usersInfo.findIndex(x => x._id === paidBy)
    const paidByName = this.state.usersInfo[indexPaid].firstName
    const indexOwed = this.state.usersInfo.findIndex(x => x._id === owedBy)
    const owedByName = this.state.usersInfo[indexOwed].firstName
    this.setState({ paidByName, owedByName})
  }

  render() {
    if (!this.state.expense) return null
    const { expense, paidByName, owedByName } = this.state
    return (
      <section className="section">
        <Link to="/users/expenses">Back to Expenses Page</Link>
        <h1 className="accountable-brand">Expense details</h1>
        <div className="container expenses-show">
          <h2>Description of the expense</h2>
          <h3>{expense.name}</h3>
          <h2>Expense was paid by</h2>
          <h3>{paidByName}</h3>
          <h2>Expense was owed by</h2>
          <h3>{owedByName}</h3>
          <h2>Category of the expense</h2>
          <h3>{expense.category}</h3>
          <h2>Total cost of the expense</h2>
          <h3>£{expense.totalCost}</h3>
          <h2>Amount owed on the expense</h2>
          <h3>£{expense.amountOwed}</h3>
          <h2>Has the expense been accepted?</h2>
          {expense.accepted === true && <h3>Yes</h3>}
          {expense.accepted === false && <h3>No</h3>}
          <h2>Has the expense been settled?</h2>
          {expense.settled === true && <h3>Yes</h3>}
          {expense.settled === false && <h3>No</h3>}
          <h2>Date expense was created</h2>
          <h3>{expense.createdAt}</h3>
          <h2>Due date of the expense</h2>
          <h3>{expense.dueDate}</h3>
        </div>
      </section>
    )
  }
}



export default ExpenseShow