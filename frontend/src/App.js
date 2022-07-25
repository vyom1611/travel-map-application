import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import axios from "axios";
import {format} from "timeago.js";

import "../src/app.css"

function App() {

    const currentUser = "myname"
    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null)
    const [newPlace, setNewPlace] = useState(null)
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
                const allPins = await axios.get("/pins");
                //Setting the pin to pins state
                setPins(allPins.data)
            } catch (error) {
                console.log(error);
            }
        }
        getPins()
    }, []);

    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
        setViewport({...viewport, longitude: long, latitude: lat})
    }


    const handleAddClick = (event) => {
        const [long, lat] = event.lngLat;
        setNewPlace({
            lat, long
        })
    };

    return (
        <div className="App">
            <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapStyle="mapbox://styles/vyom1611/cl5qlsd9k006115nxmppra8sr"
            onDblClick={handleAddClick}
            transitionDuration={200}>


            {pins.map(p => (
                <>
                <Marker
                    latitude={p.latitude}
                    longitude={p.longitude}
                    offsetLeft={-3.5 * viewport.zoom}
                    offsetTop={-7 * viewport.zoom}
                    key={p.id}>
                <Room
                    style={{
                    fontSize: 7 * viewport.zoom,
                    color: p.username === currentUser ? "tomato" : "slateblue",
                    cursor: "pointer",
                    }}
                    onClick={()=> handleMarkerClick(p._id, p.latitude, p.longitude)}
                />
                </Marker>
                {p._id === currentPlaceId && (
                <Popup
                    latitude={p.latitude}
                    longitude={p.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="top"
                    onClose={() => setCurrentPlaceId(null)}>
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
                    <span className="date">{format(p.createdAt)}</span>
                </div>
                </Popup> 
                )}
                </>
            ))}
                {newPlace && (
                <Popup
                    latitude={newPlace.lat}
                    longitude={newPlace.long}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="top"
                    onClose={() => setNewPlace(null)}
                >
                    <div>
                        <form>
                            <label>Title</label>
                            <input placeholder="Enter a Title"/>
                            <label>Review</label>
                            <textarea placeholder="Write something about this place"/>
                            <label>Rating</label>
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button className="submitButton" type="submit">Create Pin</button>
                        </form>
                    </div>
                </Popup>
                )}
            </ReactMapGL>
        </div>
    )
}

export default App;