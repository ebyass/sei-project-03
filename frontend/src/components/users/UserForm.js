import React from 'react'
import ImageUpload from '../common/ImageUploader'
const UserForm = ({ formData, handleChange, handleUpload, handleSubmit }) => (
  <div className="columns">
    <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter box">
      <div className="field">
        <div className="control">
          <ImageUpload
            onChange={handleChange}
            handleUpload={handleUpload}
            name="image"
            value={formData.image}
            image={formData.image}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">First name</label>
        <div className="control">
          <input
            className="input"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Last name</label>
        <div className="control">
          <input
            className="input"
            placeholder="First name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">E-mail</label>
        <div className="control">
          <input
            className="input"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Phone number</label>
        <div className="control">
          <input
            className="input"
            placeholder="Phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <button type="submit" className="button is-fullwidth blue">Save changes</button>
      </div>
    </form>
  </div>
)
export default UserForm