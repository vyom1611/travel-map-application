import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import axios from "axios";

import "../src/app.css"

function App() {

    const [pins, setPins] = useState([])
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vw",
        longitude: 112,
        latitude: -29,
        zoom: 8
      });

    //For when page refreshes and we want the map to be focused where the pin is
    useEffect(() => {
        const getPins = async () => {
            try {
                //Waiting for data to be fetched from database via axios
                const res = await axios.get("/pins");
                //Setting the pin to pins state
                setPins(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getPins()
    }, []);
    
    
    return (
        <div className="App">
            <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapStyle="mapbox://styles/vyom1611/cl5qlsd9k006115nxmppra8sr">

            {console.log(pins)}
            {pins.map((p) => (<>
                <Marker latitude={p.lat} 
                        longitude={p.long} 
                        offsetLeft={-3.5 * viewport.zoom} 
                        offsetTop={-7 * viewport.zoom}>
                    <Room style={{fontSize:viewport.zoom*6, color:"slateblue"}}/>
                </Marker>
                <Popup
                    latitude={p.lat}
                    longitude={p.long}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="top">
                <div className='card'>
                    <label>Place</label>
                    <h4 className='place'>{p.title}</h4>
                    <label>Review</label>
                    <p className='desc'>{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                        <Star className='star'/>
                        <Star className='star'/>
                        <Star className='star'/>
                        <Star className='star'/>
                        <Star className='star'/>
                    </div>
                    <label>Information</label>
                    <span className="username"> Created by <b>{p.username}</b> </span>
                    <span className="date"> 1 hour ago</span>
                </div>
                </Popup>
                </>
            ))
            };
            </ReactMapGL>
        </div>
    )
}

export default App;