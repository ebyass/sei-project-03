import React from 'react'
import { createExpense, getUserFriends2 } from '../../lib/api'
import { getPayload } from '../../lib/_auth'
import { Link } from 'react-router-dom'
import { notify } from 'react-notify-toast'

class ExpenseNew extends React.Component {
  state = {
    friends: [],
    expenseCreatorId: '',
    expenseOtherUserId: '',
    otherUserName: '',
    paymentSplit: 'equal split creator owed',
    formData: {
      name: '',
      category: '',
      totalCost: 0,
      dueDate: '',
      paidBy: '',
      owedBy: '',
      amountOwed: 0,
    }
  }

  async componentDidMount() {
    try {
      const expenseCreatorId = getPayload().sub
      const res = await getUserFriends2(expenseCreatorId)
      this.setState({ friends: res.data, expenseCreatorId })
		} catch (err) {
			console.log(err.message)
		}
	}

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData }, this.finalizeAmountOwed)
  }

  handleUserChange = event => {
    this.setState({ expenseOtherUserId: event.target.value }, this.populateOtherName)
  }

  handleSplitChange = event => {
    this.setState({ paymentSplit: event.target.value }, this.finalizeAmountOwed)
  }

  finalizeAmountOwed = () => {
    if (this.state.paymentSplit === 'equal split creator owed') {
      const amountOwed = this.state.formData.totalCost / 2
      this.setState({
        formData: {
          ...this.state.formData,
          paidBy: this.state.expenseCreatorId,
          owedBy: this.state.expenseOtherUserId,
          amountOwed: amountOwed
        }
      })
    } else if (this.state.paymentSplit === 'creator is owed total') {
      const amountOwed = this.state.formData.totalCost
      this.setState({
        formData: {
          ...this.state.formData,
          paidBy: this.state.expenseCreatorId,
          owedBy: this.state.expenseOtherUserId,
          amountOwed: amountOwed
        }
      })
    } else if (this.state.paymentSplit === 'equal split other owed') {
      const amountOwed = this.state.formData.totalCost / 2
      this.setState({
        formData: {
          ...this.state.formData,
          paidBy: this.state.expenseOtherUserId,
          owedBy: this.state.expenseCreatorId,
          amountOwed: amountOwed
        }
      })
    } else if (this.state.paymentSplit === 'other is owed total') {
      const amountOwed = this.state.formData.totalCost
      this.setState({
        formData: {
          ...this.state.formData,
          paidBy: this.state.expenseOtherUserId,
          owedBy: this.state.expenseCreatorId,
          amountOwed: amountOwed
        }
      })
    }
  }

  populateOtherName = () => {
    const index = this.state.friends.findIndex(x => x.user === this.state.expenseOtherUserId)
    const name = this.state.friends[index].firstName
    this.setState({ otherUserName: name })
  }


  handleSubmit = async event => { // * Need error validation/messaging implemented (fields not filled in, etc. )
    event.preventDefault()
    try {
      await createExpense(this.state.formData)
      this.props.history.push('/users/expenses')
    } catch (err) {
      if (err.response.status === 403) {
        notify.show('The other user must accept your friend request before creating an expense', 'error', 2500)
      } else {
        notify.show('All fields are required before submitting an expense!', 'error', 2500)
      }      
    }
  }

  render() {
    return (
      <section className="section new-expense">
        <Link to="/users/expenses">Go to expenses page</Link>
        <div className="container">
          <h1 className="accountable-brand">Create a new expense</h1>
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">Between Me and</label>
                <select
                  className="select is-fullwidth"
                  name="expenseOtherUserId"
                  onChange={this.handleUserChange}
                  value={this.state.expenseOtherUserId}
                >
                  <option
                    className="option"
                    disable="true"
                    value="">
                  </option>
                  {this.state.friends.map(friend => (
                    <option value={friend.user}>{friend.firstName}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Description of expense"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.formData.name}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <select
                    className="select is-fullwidth"
                    name="category"
                    onChange={this.handleChange}
                    value={this.state.formData.category}
                  >
                    <option className="option" disable="true" value=""></option>
                    <option className="option" value="transport">Transport</option>
                    <option className="option" value="accomodation">Accomodation</option>
                    <option className="option" value="eating out">Eating Out</option>
                    <option className="option" value="bills">Bills</option>
                    <option className="option" value="shopping">Shopping</option>
                    <option className="option" value="family">Family</option>
                    <option className="option" value="groceries">Groceries</option>
                    <option className="option" value="entertainment">Entertainment</option>
                    <option className="option" value="general">General</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Due Date</label>
                <input
                  className="input"
                  type="date"
                  name="dueDate"
                  onChange={this.handleChange}
                  value={this.state.formData.dueDate}
                />
              </div>
              <div className="field">
                <label className="label">Total cost of expense</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    placeholder="Total cost of expense"
                    name="totalCost"
                    onChange={this.handleChange}
                    value={this.state.formData.totalCost}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Payment Split</label>
                <div className="control">
                  <select
                    name="paymentSplit"
                    onChange={this.handleSplitChange}
                    value={this.state.paymentSplit}
                  >
                    <option value="equal split creator owed">Paid by me and split equally</option>
                    <option value="creator is owed total">I am owed the full amount</option>
                    <option value="equal split other owed">Paid by friend and split equally</option>
                    <option value="other is owed total">Friend is owed the full amount</option>
                  </select>
                </div>
              </div>
              {(this.state.formData.amountOwed !== 0 && (this.state.paymentSplit === 'equal split creator owed' || this.state.paymentSplit === 'creator is owed total')) && <label className="label">{this.state.otherUserName} will owe you £{this.state.formData.amountOwed}</label>}
              {(this.state.formData.amountOwed !== 0 && (this.state.paymentSplit === 'equal split other owed' || this.state.paymentSplit === 'other is owed total')) && <label className="label">You will owe {this.state.otherUserName} £{this.state.formData.amountOwed}</label>}
              <div className="field">
                <button type="submit" className="button is-fullwidth blue">Submit New Expense</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default ExpenseNew