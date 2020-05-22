import React from 'react'
import { Link } from 'react-router-dom'
import { getSingleUser } from '../../lib/api'
import SearchInput from './SearchInput'
import { getPayload } from '../../lib/_auth'



class FriendSearch extends React.Component {

  state = {
    friends: [],
    searchTerm: ''
  }

  async componentDidMount() {
    try {
      const userId = getPayload().sub
      const res = await getSingleUser(userId)
      console.log('res', res.data.friends)
      this.setState({ friends: res.data.friends })
    } catch (err) {
      console.log(err.message)
    }
  }


  handleFilterChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  filteredFriends = () => {
    try {
      const { friends, searchTerm } = this.state
      const regexp = new RegExp(searchTerm, 'i')
      const theArray = friends.filter(friend => {
        return regexp.test(friend.firstName) || regexp.test(friend.lastName) || regexp.test(friend.email) || regexp.test(friend.phoneNumber)
      })
      console.log(theArray)
      return theArray
    } catch (err) {
      console.log(err.message)
    }

  }

  handleClick = async event => {
    event.preventDefault()
    const userId = event.target.value
    console.log('userId', userId, 'with', event.target.name)
    this.props.history.push(`/users/expenses/new/${userId}`)
  }


  render() {
    const { searchTerm } = this.state
    return (
      <section className="section friends">
        <h1 className="accountable-brand">Friends</h1>
        <Link to="/search"><h3>Add new friends</h3></Link>
        <div className="tabs">
          <span className="accountable-brand highlighted">Friends</span>
          <Link to="/users/friends/requests/pending" className="accountable-brand shaded">Pending requests</Link>
        </div>
        <div className="options">
          <div className="search">
            <SearchInput
              handleFilterChange={this.handleFilterChange}
              searchTerm={searchTerm}
            />
          </div>
          <div>
            {this.filteredFriends().filter(friend => (
              friend.accepted === true
            )).map(friend => (
              <div className="option-content">
                <img src={friend.user.image} alt={friend.firstName} />
                <p>{friend.firstName} {friend.user.lastName}</p>
                {/* <p>{friend.lastName}</p> */}
                <button
                  className="button blue"
                  key={friend._id}
                  name='createExpenseButton'
                  value={friend._id}
                  onClick={this.handleClick}
                >Create Expense</button>
              </div>
            ))}
            {this.filteredFriends().filter(friend => (
              friend.accepted === false
            )).map(friend => {
              console.log('friend', friend.firstName)
              return (
                <div>
                  <img src={friend.user.image} alt={friend.firstName} />
                  <p>{friend.firstName} {friend.user.lastName}</p>
                  <button className="button blue">Pending</button>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

export default FriendSearch