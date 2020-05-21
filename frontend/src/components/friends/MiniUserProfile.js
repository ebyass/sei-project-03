import React from 'react'

const MiniUserProfile = ({ firstName, lastName, email, image, handleClick, id }) => (

	<div>
		<img src={image} alt={email} />
		<p>{firstName} {lastName}</p>
		<button
			onClick={handleClick}
			value={id}
			name={firstName}
		>
			Create Expense</button>
	</div>
)

export default MiniUserProfile
