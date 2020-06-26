import React from 'react'
import { Link } from 'react-router-dom'

import { getAllUsers, sendFriendRequest, getUserFriends } from '../../lib/api'
import SearchInput from './SearchInput'
import { getPayload } from '../../lib/_auth'




class SearchIndex extends React.Component {

  state = {
    users: [],
    searchTerm: '',

  }

  async componentDidMount() {
    try {
      const res = await getAllUsers()
      this.setState({ users: res.data })
    } catch (err) {
      console.log(err.message)
    }
  }

  handleFilterChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  filteredUsers = () => {
    const { users, searchTerm } = this.state
    const regexp = new RegExp(searchTerm, 'i')
    return users.filter(user => {
      return regexp.test(user.firstName) || regexp.test(user.lastName) || regexp.test(user.email) || regexp.test(user.phoneNumber)
    })
  }

  handleClick = async event => {
    event.preventDefault()
    const loggedInUserId = getPayload().sub
    const userId = event.target.value
    try {
      await sendFriendRequest(userId)
      const { data } = await getAllUsers()
      this.setState({ users: data })
    } catch (err) {
      console.log(err.message)
    }
  }

  handleCreateExpenseClick = () => {
    this.props.history.push('users/expenses/new')
  }

  isFriend = friends => {
    const loggedInUserId = getPayload().sub
    return friends.some(friend => friend.user === loggedInUserId)
  }

  ifNotFriends = friends => {
    const loggedInUserId = getPayload().sub
    friends.some(friend => friend.user !== loggedInUserId)
    return true
  }

  isPending = friends => {
    const loggedInUserId = getPayload().sub
    // friends.some(friend => (friend.user === loggedInUserId && friend.accepted === false))
    // return true
    friends.map(friend => {
      if (friend.user === loggedInUserId && friend.accepted === true) {
        return true
      }
    })
  }


  render() {
    const { searchTerm } = this.state
    return (
      <section className="section search-all-users">
        <Link to="/users/friends">Go back</Link>
        <h1 className="accountable-brand">Find new friends</h1>


        <SearchInput
          handleFilterChange={this.handleFilterChange}
          searchTerm={searchTerm}
        />


        {searchTerm ? <div>

          {this.filteredUsers().map(user => (
            <div className="search-result">
              <img src={user.image} alt={user.firstName} />
              <div className="result-text-and-button">
              <p>{user.firstName} {user.lastName}</p>
              {this.isFriend(user.friends) && <button
                className=" button other"
                name='createExpense'
                value={user._id}
                onClick={this.handleCreateExpenseClick}
              >Create Expense</button>}

              {/* {this.isPending(user.friends) && <button
								className="other"
								name='pendingRequest'
								value={user._id}
							>Pending</button>} */}

              {!this.isFriend(user.friends) &&
                <button
                  className="button blue"
                  key={user.id}
                  name='sendRequestButton'
                  value={user.id}
                  onClick={this.handleClick}
                >Add as Friend
								</button>
              }
              </div>
            </div>
          ))}

        </div> : <div></div>}
      </section>





    )
  }
}

export default SearchIndex