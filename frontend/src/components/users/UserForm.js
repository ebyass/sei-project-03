import React from 'react'

const UserForm = ({ formData, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>First name</label>
    <input 
      className="input"
      placeholder="First name"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
    />
    <label>Last name</label>
    <input 
      placeholder="First name"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
    />
    <label>E-mail</label>
    <input 
      placeholder="E-mail"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />
    <label>Phone number</label>
    <input 
      placeholder="Phone number"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
    />
    <button type="submit">Save changes</button>
  </form>
)

export default UserForm