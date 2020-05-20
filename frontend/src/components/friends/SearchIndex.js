import React from 'react'

import { getAllUsers } from '../../lib/api'
import SearchInput from './SearchInput'
import MiniUserProfile from './MiniUserProfile'


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
							<div className="display-people">
								{this.filteredUsers().map(user => (
									<MiniUserProfile key={user.id} {...user} />
								))}
							</div>
					</div>
				</div>
				</div>
</>
		)
	}
}

export default SearchIndex