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
    <p className="contact-heading">Contact us</p>
  </div>
)

export default Footer
