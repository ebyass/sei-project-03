import React from 'react'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/_auth'


class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    error: ''
  }
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }
  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      this.props.history.push('/') //* <-- this will need to change - newsfeed maybe??
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }
  render() {
    const { formData, error } = this.state
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : '' }`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${error ? 'is-danger' : ''}`}
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={formData.password}
                  />
                </div>
                {error && <small className="help is-danger">{error}</small>}
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth">Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default Login