import React from 'react'
import { getSingleUser } from '../../lib/api'
import { Link } from 'react-router-dom'

class UserShow extends React.Component {
  state = { user: null }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id
      const res = await getSingleUser(userId)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    if (!this.state.user) return null
    const { user } = this.state
    console.log(user)
    return (
      <div>
        <div>
          <h2>Account</h2>
          <h1>${user.balance.toFixed(2)}</h1>
          <p>Balance</p>
        </div>
        <div>
          <h3>Top-up</h3>
          <div>
            <button type="button">£20</button>
            <button type="button">£50</button>
            <button type="button">£100</button>
          </div>
          <button type="button">Other</button>
        </div>
        <div>
          <div>Settings</div>
          <div>
            <img src="#" alt={`${user.firstName}'s profile`} />
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            <span><Link to="/users/"></Link>Arrow</span>
          </div>
          <div>
            <h3>Notification</h3>
            <span>Arrow</span>
          </div>
          <div>
            <h3>Bank</h3>
            <span>Arrow</span>
          </div>
        </div>
      </div>
    )
  }
}

export default UserShow