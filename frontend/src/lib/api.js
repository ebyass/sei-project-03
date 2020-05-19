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

export const getSingleUser = id => {
  return axios.get(`${baseUrl}/users/${id}`, withHeaders() )
}

export const getAllUsers = () => {
	return axios.get(`${baseUrl}/users`)
}

export const getAllFriends = userId => {
	return axios.get(`${baseUrl}/users/${userId}/friends`, withHeaders())
}
