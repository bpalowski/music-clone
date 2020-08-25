import React, { } from 'react'
import { connect } from "react-redux";
import Table from 'react-bootstrap/Table'
import Jumbotron from 'react-bootstrap/Jumbotron'

const MusicComponent = ({ trackArray, song, data }) => {

  const returnFrame = (id) => {
    let i = `https://open.spotify.com/embed/track/${id}`;
    return (
      <div>
        <iframe
          title="Music Stream"
          src={i}
          height="80"
          width="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media">
        </iframe>
      </div>
    )
  }

  const searchTracks = () => {
    return trackArray.map(x => {
      return <tr key={x.id}>
        <td id={x.id}> {returnFrame(x.id)}</td>
        <td>{x.name}</td>
        <td>{x.album}</td>
        <td>{x.artist}</td>
      </tr>
    })
  }

  const listView = () => {
    if (song) {
      return (
        <Table borderless="true" striped bordered hover variant="dark" style={{ marginBottom: 0 }}>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {searchTracks()}
          </tbody>
        </Table >
      )
    }
    return <div className="Info-Enter">
      <Jumbotron>
        <h1>Welcome</h1>
        <h4>{data.display_name}</h4>
        <p>
          Start you music search by typing in Track Title
      </p>
      </Jumbotron>
    </div>
  }

  return (
    listView()
  )
}

const mapStateToProps = state => ({
  trackArray: state.musicData['trackList'],
  song: state.musicData['songString'],
  data: state.userData['userData']
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MusicComponent);