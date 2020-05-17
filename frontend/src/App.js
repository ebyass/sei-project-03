import React from 'react'

class App extends React.Component {

  async componentDidMount() {
    const res = await fetch('/api/users')
    console.log('Fetched the data')
    const data = await res.json()
    console.log(data)
  }

  render() {
    return (
      <div>
        <h1>Testing that it works</h1>
      </div>
    )
  }
}

export default App
