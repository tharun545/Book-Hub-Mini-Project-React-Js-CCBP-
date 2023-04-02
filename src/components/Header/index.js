import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-main-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dbqkeyfhb/image/upload/v1680336804/LoginTextBookImage_yrohyn.jpg"
          alt="website logo"
        />
      </Link>
      <nav className="nav-card">
        <Link to="/">
          <li>
            <p>Home</p>
          </li>
        </Link>
        <Link to="/shelf">
          <li>
            <p>Bookshelves</p>
          </li>
        </Link>
        <li>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </nav>
    </div>
  )
}
export default withRouter(Header)
