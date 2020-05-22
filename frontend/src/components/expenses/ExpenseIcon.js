import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane, faBed, faUtensils, faFileAlt, faShoppingBag, faHeart, faShoppingCart, faTicketAlt, faGlobe  } from '@fortawesome/free-solid-svg-icons'

const ExpenseIcon = expense => (
  <div>
    {expense.category === 'transport' && <FontAwesomeIcon icon={faPlane} />}
    {expense.category === 'accomodation' && <FontAwesomeIcon icon={faBed} />}
    {expense.category === 'eating out' && <FontAwesomeIcon icon={faUtensils} />}
    {expense.category === 'bills' && <FontAwesomeIcon icon={faFileAlt} />}
    {expense.category === 'shopping' && <FontAwesomeIcon icon={faShoppingBag} />}
    {expense.category === 'family' && <FontAwesomeIcon icon={faHeart} />}
    {expense.category === 'groceries' && <FontAwesomeIcon icon={faShoppingCart} />}
    {expense.category === 'entertainment' && <FontAwesomeIcon icon={faTicketAlt} />}
    {expense.category === 'general' && <FontAwesomeIcon icon={faGlobe} />}
  </div>
)

export default ExpenseIcon