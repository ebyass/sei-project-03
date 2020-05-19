import React from 'react'
import { getAllFriends } from '../../lib/api'
import SearchInput from './SearchInput'
import MiniUserProfile from './MiniUserProfile'
import { setToken, getPayload } from '../../lib/_auth'


class FriendSearch extends React.Component {

	state={
		friends: [],
		searchTerm: ''
	}

	async componentDidMount() {

		try { 
			
			const res = await getAllFriends(userId)
			this.setState({ friends: res.data })
			// const userId = await setToken(res.data.token)

		} catch (err) {
			console.log(err.message)
		}
	}

	
	handleFilterChange = event => {
    this.setState({ [event.target.name]: event.target.value })
	}

	filteredFriends = () => {
		console.log('state', this.state)
		const { friends, searchTerm } = this.state
		const regexp = new RegExp(searchTerm, 'i')
		return friends.filter(user => {
			return regexp.test(user.firstName) || regexp.test(user.lastName) || regexp.test(user.email) || regexp.test(user.phoneNumber)
		})
	}
	

	render() {
		const { searchTerm } = this.state
		return (
			<>
			<h1>FriendSearch</h1>
			<SearchInput
			handleFilterChange={this.handleFilterChange}
			searchTerm={searchTerm}
			/>
			<div className="display-people">
				{this.filteredFriends().map(friend => (
					<MiniUserProfile key={friend.id} {...friend} />
				))}
			</div>
			</>
		)
	}
}

export default FriendSearch