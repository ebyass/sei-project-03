import React from 'react'
import { getSingleUser, editUser } from '../../lib/api'

import UserForm from './UserForm'

class UserUpdate extends React.Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      image: ''
    }
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const res = await getSingleUser(userId)
      this.setState({ formData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    console.log(formData)
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const userId = this.props.match.params.id
    // console.log(userId)
    try {
      await editUser(userId, this.state.formData)
      this.props.history.push(`/users/${userId}`)
    } catch (err) {
      console.log(err.response)
    }
  }

  render() {
    if (!this.state.formData) return null
    return (
      <section className="section update">
        <h2 className="accountable-brand">Update Account</h2>
        <div className="image">
          <img src={this.state.formData.image} />
        </div>
        <br />
        <div className="container">
          <div>
            <UserForm
              formData={this.state.formData}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default UserUpdate