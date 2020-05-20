import React from 'react'

import BalanceInput from './BalanceInput'

const BalanceButtons = ({ handleClick, showInput, handleChange, handleSubmit }) => {

    return (
    <div>
      <div>
        <button onClick={handleClick} type="button" value="20">£20</button>
        <button onClick={handleClick} type="button" value="50">£50</button>
        <button onClick={handleClick} type="button" value="100">£100</button>
      </div>
      <button onClick={handleClick} type="button" value="Other">Other</button>
      {showInput && 
        <BalanceInput 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
          buttonText="Top up"
        />}
    </div>
    )
  }

export default BalanceButtons