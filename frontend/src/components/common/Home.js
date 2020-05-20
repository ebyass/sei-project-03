import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Keep track of expenses between friends</h1>
          <span className="button"><Link to="/register">Sign up</Link></span>
        </div>
      </section>
      <section>
        <h2>Be accountable</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget molestie eros, ac aliquet orci. Suspendisse porttitor, dui ut vulputate placerat, sem enim congue odio, nec vestibulum elit tortor in purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum et lectus sit amet odio egestas vestibulum sed a nisi. Suspendisse posuere mi sit amet fringilla interdum. Sed viverra nunc nec placerat rhoncus. Fusce vestibulum sed odio et pharetra. Etiam mollis magna ut sodales dignissim. Praesent porttitor nisi ut nisl venenatis posuere.</p>

        <p>Etiam non interdum lorem. Fusce sed sapien iaculis, hendrerit lectus id, tristique nisi. Aliquam tincidunt elementum ligula, faucibus pretium turpis pretium et. Cras at ultrices diam. Fusce eget lorem efficitur, tincidunt nulla quis, accumsan tortor. Ut et est nec neque porttitor fringilla. Phasellus id lectus a felis cursus ultricies ut vel tellus. Aliquam auctor efficitur vehicula.</p>
      </section>
    </div>
  )
}

export default Home