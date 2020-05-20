import axios from 'axios'
import { getToken } from './_auth'

const baseUrl = '/api'
const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export const registerUser = formData => {
	try {
		console.log('registering user')
		return axios.post(`${baseUrl}/register`, formData)
	} catch (err) {
		console.log('registrting', err)
	}
  
}

export const loginUser = formData => {
	try{
		console.log('logging in')
		return axios.post(`${baseUrl}/login`, formData)
	} catch(err) {
		console.log('login', err)
	}
  
}

export const createExpense = formData => {
  try{
		console.log('Creating an expense')
		return axios.post(`${baseUrl}/expenses`, formData)
	} catch(err) {
		console.log('login', err)
	}
}

export const getSingleUser = id => {
  return axios.get(`${baseUrl}/users/${id}`, withHeaders() )
}

export const getAllUsers = () => {
	return axios.get(`${baseUrl}/users`)
}

export const getAllFriends = userId => {
	return axios.get(`${baseUrl}/users/${userId}/friends`, withHeaders())
}

export const getUserFriends = userId => {
  return axios.get(`${baseUrl}/user/${userId}/friends`, withHeaders())
}

export const getExpensesOwedByUser = () => {
  return axios.get(`${baseUrl}/users/expenses/owedby`, withHeaders())
}

export const getExpensesOwedToUser = () => {
  return axios.get(`${baseUrl}/users/expenses/owedto`, withHeaders())
}   

export const getPendingExpensesToAccept = () => {
  return axios.get(`${baseUrl}/users/expenses/requests/owedby`, withHeaders())
}

export const getPendingExpensesToUser = () => {
  return axios.get(`${baseUrl}/users/expenses/requests/owedto`, withHeaders())
}

export const acceptPendingExpense = expenseId => {
  return axios.put(`${baseUrl}/expenses/${expenseId}`, {}, withHeaders())
}

export const getSettledExpenses = () => {
  return axios.get(`${baseUrl}/users/expenses/settled/owedby`, withHeaders())
}

export const getSettledWithExpenses = () => {
  return axios.get(`${baseUrl}/users/expenses/settled/owedto`, withHeaders())
}

export const settleExpense = expenseId => {
  return axios.patch(`${baseUrl}/expenses/${expenseId}`, {}, withHeaders())
}
