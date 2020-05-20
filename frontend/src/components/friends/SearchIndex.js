import React from 'react'

import { getAllUsers, sendFriendRequest } from '../../lib/api'
import SearchInput from './SearchInput'
// import MiniUserProfile from './MiniUserProfile'
import { getPayload } from '../../lib/_auth'


class SearchIndex extends React.Component {

	state = {
		users: [],
		searchTerm: ''
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
		const userId = event.target.value
		console.log('friendId', userId)

		try {
			const res = await sendFriendRequest(userId)
			console.log('res', res.data)

		} catch (err) {
			console.log(err.message)
		}

	}




	render() {
		const { searchTerm } = this.state
		return (
			<>
				<h1>Search Index</h1>
				<div className="section">
					<div className="container">
						<div className="search-user-profile">

							<SearchInput
								handleFilterChange={this.handleFilterChange}
								searchTerm={searchTerm}
							/>

							<>
								{searchTerm ? <div>
									{this.filteredUsers().map(user => (
										<div>
											<p>{user.firstName} {user.lastName}</p>
											<p>{user.email}</p>
											<p>{user.image}</p>
											<button
												key={user.id}
												name='sendRequestButton'
												value={user.id}
												onClick={this.handleClick}
											>Send Request</button>
										</div>
									))}

								</div> : <div><p>Search</p></div>}
							</>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default SearchIndex