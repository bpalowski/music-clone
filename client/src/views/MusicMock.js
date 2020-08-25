import React from 'react'
import NavComponent from '../components/NavComponent'
import MusicCards from './MusicCards'
import SearchDisplayBox from './SearchDisplayBox'
import Footer from './Footer'
import Col from 'react-bootstrap/Col'


const MusicMock = () => {

  return (
    <>
      <NavComponent />
      <div className="row-search-dipslay">
        <Col >

          <div className="col-container-search-box">
            <SearchDisplayBox />
          </div>

          <MusicCards />

        </Col>
      </div>
      <Footer />
    </>
  )
}

export default MusicMock

