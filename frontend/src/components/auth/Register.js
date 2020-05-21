import React from 'react'
import { registerUser } from '../../lib/api'


class Register extends React.Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
			// username: '', //? <-- Not including
			email: '',
			password: '',
			passwordConfirmation: '',
			phoneNumber: '',
			image: ''
      
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
			await registerUser(this.state.formData)
			this.props.history.push('/login') //* <-- Push user to newsfeed or profile eventually 
    } catch (err) {
      console.log('oops', err.response.data)
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="accountable-brand">Become Accountable</h1>
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input 
                    className="input"
                    placeholder="First Name"
                    name="firstName"
                    onChange={this.handleChange}
                    value={this.state.formData.firstName}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input 
                    className="input"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={this.handleChange}
                    value={this.state.formData.lastName}
                  />
                </div>
              </div>
							<div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input 
                    className="input"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.formData.email}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input 
                    type="password"
                    className="input"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.formData.password}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input 
                    type="password"
                    className="input"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                    value={this.state.formData.passwordConfirmation}
                  />
                </div>
              </div>
							<div className="field">
                <label className="label">Phone Number</label>
                <div className="control">
                  <input 
                    className="input"
                    placeholder="+44"
                    name="phoneNumber"
                    onChange={this.handleChange}
                    value={this.state.formData.phoneNumber}
                  />
                </div>
              </div>
              <div className="field">
                <button type="submit" className="button blue">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default Register