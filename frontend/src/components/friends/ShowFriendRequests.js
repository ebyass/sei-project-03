import React from 'react'
import { getUserFriends, acceptFriendRequest, rejectFriendRequest } from '../../lib/api'
import { getPayload } from '../../lib/_auth'


class ShowFriendsRequests extends React.Component {

	state = {
		friends: [],
		madeTheRequest: [],
		receivedTheRequest: []
	}

	async componentDidMount() {
		try {
			const userId = getPayload().sub
			const res = await getUserFriends(userId)
			console.log('res', res.data)
			this.setState({ friends: res.data })
		} catch (err) {
			console.log(err)
		}
	}

	handleAccept = async event => {
		console.log('this.state', this.state)
		try {
			const userId = getPayload().sub
			const requestId = event.target.value
			const res = await acceptFriendRequest(userId, requestId)
			console.log('res', res.data)
			
		} catch (err) {
			console.log(err.message)
		}

	}

	handleReject = async event => {
		console.log('this.state', this.state)
		try {
			const userId = getPayload().sub
			const requestId = event.target.value
			const res = await rejectFriendRequest(userId, requestId)
			console.log('res', res.data)
			// window.location.reload()
		} catch (err) {
			console.log(err.message)
		}

	}

	render() {
		
		return (
			<>
				<h1>showFriendRequests</h1>
				<div className="section">
					<div className="container">
						{this.state.friends.filter(friend => (
							friend.madeTheRequest === true && friend.accepted === false
						)).map(friend => (
							<div>
							<p>{friend.firstName}<p>
								</p>{friend.user.lastName}</p>
								<img src={friend.user.image} alt={friend.firstName} />
							<button 
							onClick={this.handleAccept}
							name='acceptRequest'
							value={friend._id}
					>Accept</button>
							<button onClick={this.handleReject}
							name='rejectRequest'
							value={friend._id}
					>Reject</button>
						</div>
						))}
							{this.state.friends.filter(friend => (
							friend.madeTheRequest === false && friend.accepted === false
						)).map(friend => (
							<div>
							<p>{friend.firstName}<p>
								</p> {friend.user.lastName}</p>
								<img src={friend.user.image} alt={friend.firstName} />
							<button 
					>Pending</button>
						</div>
						))}
					</div>
				</div>
			</>
		)
	}
}

export default ShowFriendsRequests