import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-card">
    <div className="social-icons">
      <FaGoogle size={20} className="icons" />
      <FaTwitter size={20} className="icons" />
      <FaInstagram size={20} className="icons" />
      <FaYoutube size={20} className="icons" />
    </div>
    <p>Contact Us</p>
  </div>
)

export default Footer
