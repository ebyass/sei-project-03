import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, logout, getPayload } from '../../lib/_auth'

class Navbar extends React.Component {

  state = { isOpen: false }
  

	handleToggle = () => {
		this.setState({ isOpen: !this.state.isOpen })
  }
  

	handleLogout = () => {
		logout()
		console.log('Come back Soon')
		this.props.history.push('/')
	}

	componentDidUpdate(prevProps) { //* prev props is from the render before 
		if (this.props.location.pathname !== prevProps.location.pathname) {  //* props now === props on previous render 
			this.setState({ isOpen: false })
		}
	}

	render() {
		const { isOpen } = this.state
		const userId = getPayload().sub
		// const friendId = req.params.id //! <--Need to sort this out 
		return (
			<nav className="navbar is-link">
				<div className="container">
					<div className="navbar-brand">
						<Link to="/" className="navbar-item">Accountable</Link>
						<span onClick={this.handleToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</span>
					</div>
					<div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
						<div className="navbar-end">
							{!isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
							{!isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
							{isAuthenticated() && <Link to="/users/:id/friends" className="navbar-item">Newsfeed</Link>}
							{isAuthenticated() && <Link to={`/users/friends/requests`} className="navbar-item">Search</Link>}
							{isAuthenticated() && <Link to={`/users/friends/requests/pending`} className="navbar-item">Requests</Link>} 
							{isAuthenticated() && <Link to="/" className="navbar-item">Expenses</Link>}
							{isAuthenticated() && <Link to={`/users/${userId}`}className="navbar-item">Account</Link>}
							{isAuthenticated() && <span onClick={this.handleLogout} className="navbar-item Logout">Logout</span>}
						</div>
					</div>
				</div>
			</nav>
		)
	}

}

export default withRouter(Navbar)



