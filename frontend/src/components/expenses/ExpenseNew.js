import React from 'react'
import { createExpense, getUserFriends } from '../../lib/api'
import { getPayload } from '../../lib/_auth'
import { Link } from 'react-router-dom'

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
      const res = await getUserFriends(expenseCreatorId)
      this.setState({ friends: res.data, expenseCreatorId })
      console.log(this.state)
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
      const res = await createExpense(this.state.formData)
      console.log(res)
      this.props.history.push('/users/expenses')
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    return (
      <section className="section">
        <Link to="/users/expenses">Back to Expenses Page</Link>
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <label className="label">Between Me and</label>
              <select
                name="expenseOtherUserId"
                onChange={this.handleUserChange}
                value={this.state.expenseOtherUserId}
              >
                <option disable="true" value=""></option>
                {this.state.friends.map(friend => (
                  <option value={friend.user}>{friend.firstName}</option>
                ))}
                </select>
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
                    name="category" 
                    onChange={this.handleChange} 
                    value={this.state.formData.category}
                  >
                    <option disable="true" value=""></option>
                    <option value="transport">Transport</option>
                    <option value="accomodation">Accomodation</option>
                    <option value="eating out">Eating Out</option>
                    <option value="bills">Bills</option>
                    <option value="shopping">Shopping</option>
                    <option value="family">Family</option>
                    <option value="groceries">Groceries</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="general">General</option>
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
                <button type="submit" className="button is-fullwidth is-warning">Submit New Expense</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default ExpenseNew