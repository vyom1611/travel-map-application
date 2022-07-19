import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import "../src/app.css"

function App() {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vw",
        longitude: -100,
        latitude: 40,
        zoom: 8
      });

    return (
        <div className="App">
            <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapStyle="mapbox://styles/vyom1611/cl5qlsd9k006115nxmppra8sr">
            <Marker latitude={37.78} 
                    longitude={-122.41} 
                    offsetLeft={-20} 
                    offsetTop={-10}>
                <Room style={{fontSize:viewport.zoom*6, color:"slateblue"}}/>
            </Marker>
            <Popup
                latitude={37.78}
                longitude={-122.41}
                closeButton={true}
                closeOnClick={false}
                anchor="top">
            <div className='card'>
                <label>Place</label>
                <h4 className='place'>Downtown San Francisco</h4>
                <label>Review</label>
                <p className='desc'>Natural beauty and great city!</p>
                <label>Rating</label>
                <div className="stars">
                    <Star className='star'/>
                    <Star className='star'/>
                    <Star className='star'/>
                    <Star className='star'/>
                    <Star className='star'/>
                </div>
                <label>Information</label>
                <span className="username"> Created by <b>Vyom</b> </span>
                <span className="date"> 1 hour ago</span>
            </div>
            </Popup>
            </ReactMapGL>
        </div>
    )
}

export default App;