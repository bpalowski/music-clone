import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { setTracksList } from '../state/actions/index'

import InputComponent from '../components/InputComponent'
import axios from 'axios'


const SearchDisplayBox = ({ song, setTracksList }) => {

  useEffect(() => {
    if (song) {
      stringSearch()
    }
  })


  const stringSearch = async () => {
    let arr = [];
    await axios.get(`musicSearch/getMusic/${song}`)
      .then(({ data }) => {
        data.map(x => {
          let obj = {
            id: x.id,
            name: x.name,
            uri: x.uri,
            href: x.href,
            preview_url: x.preview_url,
            track_number: x.track_number,
            images: x.album.images[2],
            album: x.album.name,
            release_date: x.album.release_date,
            artist: x.album.artists[0].name
          }
          return arr.push(obj)

        })
        return setTracksList(arr)
      }).catch(err => console.log(err))
  }


  return (
    <div className="searchContainer">
      <div className="searchInputBox" >
        <InputComponent />
      </div>
    </div >
  )
}

const mapStateToProps = state => ({
  song: state.musicData['songString'],
});

const mapDispatchToProps = { setTracksList };

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplayBox);
