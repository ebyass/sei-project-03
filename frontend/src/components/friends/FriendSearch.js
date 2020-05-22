import React from 'react'
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
		const { searchTerm, friends } = this.state
		return (
			<>
				<h1>FriendSearch</h1>
				<div className="section">
					<div className="container">
						<div className="search-user-profile">
							<SearchInput
								handleFilterChange={this.handleFilterChange}
								searchTerm={searchTerm}
							/>
							<div>
								{this.filteredFriends().filter(friend => (
									friend.accepted === true
								)).map(friend => (
									<div>
										<p>{friend.user.firstName}</p> 
										<p>{friend.user.lastName}</p>
										<img src={friend.user.image} alt={friend.user.firstName} />
										<button
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
											<p>{friend.firstName} </p>
											<p>{friend.user.lastName}</p>
											<img src={friend.user.image} alt={friend.firstName} />
											<button
											>Pending</button>
										</div>
									)
								})}

							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default FriendSearch