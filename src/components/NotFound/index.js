import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-card ">
    <img
      src="https://res.cloudinary.com/dbqkeyfhb/image/upload/v1680433512/Not_Found_t5uwc7.jpg"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button" className="go-back-home-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
