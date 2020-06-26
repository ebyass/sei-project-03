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
		return axios.post(`${baseUrl}/register`, formData)
	} catch (err) {
		console.log('registering', err)
	}
  
}

export const loginUser = formData => {
	try{
		return axios.post(`${baseUrl}/login`, formData)
	} catch(err) {
		console.log('login', err)
	}
  
}

export const createExpense = formData => {
  try{
		return axios.post(`${baseUrl}/expenses`, formData)
	} catch(err) {
		console.log('login', err)
	}
}

export const getSingleUser = id => {
  return axios.get(`${baseUrl}/users/${id}`, id, withHeaders() )
}

export const editUser = (id, formData) => {
  return axios.put(`${baseUrl}/users/${id}`, formData, withHeaders())
}

export const changeBalance = (id, requestData) => {
  return axios.put(`${baseUrl}/users/${id}/balance`, requestData, withHeaders())
}

export const getAllUsers = () => {
	return axios.get(`${baseUrl}/users`)
}

export const getUserFriends = userId => {
  return axios.get(`${baseUrl}/users/${userId}/friends`, withHeaders())
}

export const getUserFriends2 = userId => {
  return axios.get(`${baseUrl}/users2/${userId}/friends`, withHeaders())
}

export const sendFriendRequest = userId => {
		return axios.post(`${baseUrl}/users/${userId}/friends/requests`, {}, withHeaders())
}

export const acceptFriendRequest = (userId, requestId) => {
	return axios.put(`${baseUrl}/users/${userId}/friends/requests/${requestId}`, requestId, withHeaders())
}

export const rejectFriendRequest = (userId, requestId) => {
	return axios.delete(`${baseUrl}/users/${userId}/friends/requests/${requestId}`, withHeaders())
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

export const deleteExpense = expenseId => {
  return axios.delete(`${baseUrl}/expenses/${expenseId}`, withHeaders())
}

export const getUsersAndIds = () => {
  return axios.get(`${baseUrl}/usersnames`)
}

export const getSingleExpense = expenseId => {
  return axios.get(`${baseUrl}/expenses/${expenseId}`)
}