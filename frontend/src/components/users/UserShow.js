import React from 'react'
import { getSingleUser, changeBalance } from '../../lib/api'
import { Link } from 'react-router-dom'

import BalanceButtons from './BalanceButtons'

class UserShow extends React.Component {
  state = {
    user: null,
    showInput: false,
    requestData: {
      operation: 'increase',
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

  handleClick = async event => {
    try {
      if (event.target.value === 'Other') {
        this.setState({ showInput: true })
      } else {
        const userId = this.props.match.params.id
        const requestData = { ...this.state.requestData, amount: event.target.value }
        const res = await changeBalance(userId, requestData)
        this.setState({ user: res.data })
      }
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
    try {
      const res = await changeBalance(userId, this.state.requestData)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    if (!this.state.user) return null
    const { user } = this.state
    return (
      <div>
        <div>
          <h2>Account</h2>
          <h1>£{user.balance.toFixed(2)}</h1>
          <p>Balance</p>
        </div>
        <div>
          <h3>Top-up</h3>
          <BalanceButtons 
            handleClick={this.handleClick} 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit}
            showInput={this.state.showInput}
          />
        </div>
        <div>
          <div>Settings</div>
          <div>
            <img src="#" alt={`${user.firstName}'s profile`} />
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            <span><Link to={`/users/${user._id}/update`}>Arrow</Link></span>
          </div>
          <div>
            <h3>Notification</h3>
            <span>Arrow</span>
          </div>
          <div>
            <h3>Bank</h3>
            <span><Link to={`/users/${user._id}/bank`}>Arrow</Link></span>
          </div>
        </div>
      </div>
    )
  }
}

export default UserShow