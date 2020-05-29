import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getSingleUser, editUser } from '../../lib/api'
import UserForm from './UserForm'
const uploadUrl = `${process.env.REACT_APP_CLOUDINARY_URL}`
const uploadPreset = `${process.env.REACT_APP_CLOUDINARY_PRESET}`
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
  handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    console.log(data)
    const res = await axios.post(uploadUrl, data)
    const formData = { ...this.state.formData, image: res.data.url }
    this.setState({ formData }, console.log(this.state))
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
    const userId = this.props.match.params.id
    return (
      <section className="section update">
        <Link to={`/users/${userId}`}>Go back</Link>
        <h2 className="accountable-brand">Update Account</h2>
        <div className="image">
          <img src={this.state.formData.image} alt={this.state.formData.firstName}/>
        </div>
        <br />
        <div className="container">
          <div>
            <UserForm
              formData={this.state.formData}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleUpload={this.handleUpload}
            />
          </div>
        </div>
      </section>
    )
  }
}
export default UserUpdate