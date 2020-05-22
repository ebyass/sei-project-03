import React from 'react'
import { getSingleUser, changeBalance } from '../../lib/api'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { notify } from 'react-notify-toast'

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
        notify.show('Balance succesfully topped up', 'success', 1500)
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
      notify.show('Balance succesfully topped up', 'success', 1500)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    if (!this.state.user) return null
    const { user } = this.state
    return (
      <section className="section user-account">
        <div className="account-balance">
          <h2>Account</h2>
          <h1 className="accountable-brand">£{user.balance.toFixed(2)}</h1>
          <p>Balance</p>
        </div>
        <div className="top-up">
          <h3>Top up</h3>
          <BalanceButtons
            handleClick={this.handleClick}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            showInput={this.state.showInput}
          />
        </div>
        <div>
          <hr />
          <h3>Settings</h3>
          <div className="settings">
            <div className="user-info">
              <img src="#" alt={`${user.firstName}'s profile`} />
              <div>
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <Link to={`/users/${user._id}/update`}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>
          <div className="settings">
            <h3>Notifications</h3>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <div className="settings">
            <h3>Bank</h3>
            <Link to={`/users/${user._id}/bank`}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default UserShow