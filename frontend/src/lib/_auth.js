export const setToken = token => {
  try {
    window.localStorage.setItem('token', token)
    console.log('token', token)
  } catch (err) {
    console.log('set token', err)
  }
  
} 

export const getToken = () => {
  try {
    return window.localStorage.getItem('token') 
  } catch (error) {
    console.log(error)
  } 
} 

export const logout = () => {
  console.log('logging out')
  localStorage.removeItem('token')
}


export const getPayload = () => { 
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3)  return false 
  return JSON.parse(window.atob(parts[1]))
}

export const isOwner = id => {
  try {
    const userId = getPayload().sub
    console.log(id, userId)
    return userId === id
  } catch (err) {
    console.log(err)
  }

}


export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000) 
  return now < payload.exp 
}