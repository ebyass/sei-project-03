import React from 'react'
import { createExpense } from '../../lib/api'



class ExpenseNew extends React.Component {
  state = {
    formData: {
      name: '',
      category: '',
      totalCost: '',
      dueDate: '',
      paidBy: '',
      owedBy: '',
      amountOwed: '',
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await createExpense(this.state.formData)
      console.log(res)
      this.props.history.push('/expenses')
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Name"
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
                    <option disable value=""></option>
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
                <label className="label">Expense paid by</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Expense paid by"
                    name="paidBy"
                    onChange={this.handleChange}
                    value={this.state.formData.paidBy}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Expense owed by</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Expense owed by"
                    name="owedBy"
                    onChange={this.handleChange}
                    value={this.state.formData.owedBy}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Amount owed</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Expense owed by"
                    name="amountOwed"
                    onChange={this.handleChange}
                    value={this.state.formData.amountOwed}
                  />
                </div>
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">Create New Expense</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }



}

export default ExpenseNew