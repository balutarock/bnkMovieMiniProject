import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <div className="social-media-container">
      <FaGoogle className="font-icons" />
      <FaTwitter className="font-icons" />
      <FaInstagram className="font-icons" />
      <FaYoutube className="font-icons" />
    </div>
    <h1 className="contact-heading">Contact Us</h1>
  </div>
)

export default Footer
