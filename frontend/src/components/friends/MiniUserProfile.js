import React from 'react'

const MiniUserProfile = ({ firstName, lastName, email, image }) => (

	<div>
		<img src={image} alt={email} />
		<p>{firstName} {lastName}</p>
		<p>{email}</p> 
		<button>Send request</button>
	</div>
)

export default MiniUserProfile
