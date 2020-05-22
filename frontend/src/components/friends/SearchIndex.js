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
    console.log('friendId', userId)
    try {
      const res = await sendFriendRequest(userId)
      const getAllUsers = await getAllUsers()

      this.setState({ users: getAllUsers.data })
      console.log(res.data.friends, loggedInUserId)

    } catch (err) {
      console.log(err.message)
    }

  }




  render() {
    const { searchTerm, friends } = this.state
    const loggedInUserId = getPayload().sub
    console.log(this.filteredUsers().map(user => (
      user.friends.filter(user => (
        user.user !== loggedInUserId
      ))
    )))
    return (
      <section className="section search-all-users">
        <Link to="/users/friends">Go back</Link>
        <h1 className="accountable-brand">Find new friends</h1>


        <SearchInput
          handleFilterChange={this.handleFilterChange}
          searchTerm={searchTerm}
        />


        {searchTerm ?
          <div>
            {this.filteredUsers().map(user => (
              <div>
                <div>
                  <p>{user.firstName}</p>
                  <p>{user.lastName}</p>
                  <img src={user.image} alt={user.firstName} />
                </div>
                <div>
                  {user.friends.user === loggedInUserId && <button>Friends</button>}
                  {user.friends.user !== loggedInUserId && <button>Friends</button>}
                </div>
              </div>
            ))}
            {/* {this.filteredUsers().map(user => {
						return (
							user.friends.map(friend => (
							(friend.user === loggedInUserId ? (<div>{friend.firstName} {friend.lastName}</div>) : (<button>Add friend</button>)
								
							))	
							
						) */}
				{/* 
					{this.filteredUsers().map(user => (
						user.friends.filter(friend => (
							friend.friends.map(friend => (
								
								friend.user === loggedInUserId

								<div>
									<p>{user.firstName} {user.lastName}</p>
									<img src={user.image} alt={user.firstName} />
								</div>

							))
							
							
								
							
					))))} */}


            {/* {this.filteredUsers().filter(user => (
									user.friends.user !== loggedInUserId
								)).map(user => (
									<div>
										<p>{user.firstName} {user.lastName}</p>
										<img src={user.image} alt={user.firstName} />
										<button
											key={user.id}
											name='sendRequestButton'
											value={user.id}
											onClick={this.handleClick}
										>Add as Friend</button>
									</div>
								))} */}

          </div> : <div></div>
        }



      </section>
    )
  }
}

export default SearchIndex