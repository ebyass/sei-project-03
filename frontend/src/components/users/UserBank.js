import React from 'react'
import { getSingleUser, changeBalance } from '../../lib/api'
import { Link } from 'react-router-dom'
import { notify } from 'react-notify-toast'

import BalanceInput from './BalanceInput'

class UserBank extends React.Component {
  state = {
    user: null,
    requestData: {
      operation: 'decrease',
      amount: 0
    }
  }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id
      const res = await getSingleUser(userId)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err.response)
    }
  }

  handleChange = event => {
    const requestData = { ...this.state.requestData, amount: event.target.value }
    this.setState({ requestData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const userId = this.props.match.params.id
    if (this.state.user.balance < this.state.requestData.amount) throw new Error()
    try {
      const res = await changeBalance(userId, this.state.requestData)
      notify.show('Funds transferred to your bank', 'success', 1500)
      this.setState({ user: res.data })
    } catch (err) {
      notify.show('Not enough funds in your account', 'error', 1500)
    }
  }

  render() {
    if (!this.state.user) return null
    const { user } = this.state
    return (
      <section className="section bank">
        <Link to={`/users/${user._id}`}>Go back</Link>
        <div>
          <h2>Account</h2>
          <h1 className="accountable-brand">£{user.balance.toFixed(2)}</h1>
          <p>Balance</p>
          <BalanceInput
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            buttonText="Transfer to bank" />
        </div>
      </section>
    )
  }

}

export default UserBank