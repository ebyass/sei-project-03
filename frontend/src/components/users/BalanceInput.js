import React from 'react'

const BalanceInput = ({ handleChange, handleSubmit, buttonText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label className="label">Enter amount:</label>
      <input
        className="input"
        placeholder=""
        onChange={handleChange}
      />
      <div className="field">
        <button type="submit" className="button">{buttonText}</button>
      </div>
    </form>
  )
}

export default BalanceInput