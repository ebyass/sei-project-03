import React from 'react'
import axios from 'axios'

const uploadUrl = 'https://api.cloudinary.com/v1_1/emjphi/image/upload'
const uploadPreset = 'd4ixk5mx'

class ImageUpload extends React.Component {
  state = {
    image: null
  }

  handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    // console.log(data)
    const res = await axios.post(uploadUrl, data)
    // console.log(res.data)
    this.setState({
      image: res.data.url
    })
  }

  render() {
    const { image } = this.state
    return (
      <>
        {image ? <div>
          <img src={image} alt="selected"/>
        </div>
          :
          <>
            <label className="label">Upload Image</label>
            <input 
              className="input"
              type="file"
              onChange={this.handleUpload}
            />
          </>
        }
      </>
    )
  }
}

export default ImageUpload