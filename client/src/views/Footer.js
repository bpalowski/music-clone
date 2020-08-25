import React from 'react'

const Footer = () => {
  return (
    <div className="footer-container" sticky="bottom">
      <div className="icon-container">
        <a href="https://linkedin.com" alt="this is for a link to LinkedIn.com web page" className="linkedin"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://google.com" alt="this is for a link to Google.com in web page" className="google" ><i class="fab fa-google"></i></a>
        <a href="https://youtube.com" alt="this is for a link to Youtube.com in web page" className="youtube"><i class="fab fa-youtube"></i></a>
        <a href="https://skype.com" alt="this is for a link to Skype.com in web page" className="skype"><i class="fab fa-skype"></i></a>
      </div>
    </div>
  )
}

export default Footer