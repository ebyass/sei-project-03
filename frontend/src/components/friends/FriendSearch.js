import React from 'react'

import { getSingleUser } from '../../lib/api'
import SearchInput from './SearchInput'
import MiniUserProfile from './MiniUserProfile'
import { setToken, getPayload } from '../../lib/_auth'



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
		try{
			const { friends, searchTerm } = this.state
			const regexp = new RegExp(searchTerm, 'i')
			return friends.filter(user => {
				return regexp.test(user.firstName) || regexp.test(user.lastName) || regexp.test(user.email) || regexp.test(user.phoneNumber)
			})
		} catch(err) {
			console.log(err.message)
		}

	}


	render() {
		const { searchTerm } = this.state
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
							<div className="display-people">
								{this.filteredFriends().map(friend => (
									<MiniUserProfile key={friend.id} {...friend} />
								))}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default FriendSearch