import React from 'react'

import BalanceInput from './BalanceInput'

const BalanceButtons = ({ handleClick, showInput, handleChange, handleSubmit }) => {

    return (
    <>
      <div>
        <button onClick={handleClick} type="button" className="button blue" value="20">£20</button>
        <button onClick={handleClick} type="button" className="button blue" value="50">£50</button>
        <button onClick={handleClick} type="button" className="button blue" value="100">£100</button>
      </div>
      <button onClick={handleClick} type="button" className="button other" value="Other">Other</button>
      {showInput && 
        <BalanceInput 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
          buttonText="Top up"
        />}
    </>
    )
  }

export default BalanceButtons