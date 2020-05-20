import React from 'react'
import { getUserFriends } from '../../lib/api'
import { getPayload } from '../../lib/_auth'


class ShowFriendsRequests extends React.Component {

	state = {
		friends: [],
	}

	async componentDidMount() {
		try{
			const userId = getPayload().sub
			const res = await getUserFriends(userId)
			console.log('res', res.data)
			this.setState({friends: res.data})
		} catch(err) {
			console.log(err)
		}
	}

	

	render() {
		const { friends } = this.state
		return (
			<>
			<h1>showFriendRequests</h1>
			<div className="section">
				<div className="container">
{friends.map(friend => (
	<div>
		<p>{friend.firstName}</p>
		<button>Accept</button>
		<button>Reject</button>
	</div>
))}
				</div>
			</div>
			</>
		)
	}
}

export default ShowFriendsRequests