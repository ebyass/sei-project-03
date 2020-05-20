import React from 'react'

const MiniUserProfile = ({ firstName, lastName, email, image, handleClick, id }) => (

	<div>
		<img src={image} alt={email} />
		<p>{firstName} {lastName}</p>
		<p>{email}</p>
		<button
			onClick={handleClick}
			value={id}
			name={firstName}
		>
			Send request</button>
	</div>
)

export default MiniUserProfile
