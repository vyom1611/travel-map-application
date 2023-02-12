import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import axios from "axios";
import { format } from "timeago.js";

import "../src/app.css"
import Register from "./components/Register";
import Login from './components/Login';

function App() {
    const localStorage = window.localStorage;

    const [currentUser, setCurrentUser] = useState(null)

    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null)

    const [newPlace, setNewPlace] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [rating, setRating] = useState(0)

    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vw",
        longitude: 112,
        latitude: -29,
        zoom: 8
      });

    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
        setViewport({...viewport, longitude: long, latitude: lat})
    }

    const handleAddClick = (event) => {
        const [long, lat] = event.lngLat;
        setNewPlace({
            longitude: long,
            latitude: lat,
        })
        console.log(newPlace)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Assigning properties of a new pin
        const newPin = {
            username: currentUser,
            title: title,
            desc: desc,
            rating: rating,
            latitude: newPlace.latitude,
            longitude: newPlace.longitude,
        }

        //Posting the new pin to database/backend
        try {
            const res = await axios.post("/pins", newPin)
            setPins([...pins, res.data])
            //Removing saved pin from create new pin popup
            setNewPlace(null)
        } catch (err) {
            console.log("No NO NO")
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem("user");
        currentUser(null);
    }

    //For when page refreshes, and we want the map to be focused where the pin is
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
                        {Array(p.rating).fill(<Star className="star" />)}
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
                    latitude={newPlace.latitude}
                    longitude={newPlace.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="top"
                    onClose={() => setNewPlace(null)}
                >
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>Title</label>
                            <input placeholder="Enter a Title" onChange={(event) => setTitle(event.target.value)}/>
                            <label>Review</label>
                            <textarea placeholder="Write something about this place" onChange={(event) => setDesc(event.target.value)}/>
                            <label>Rating</label>
                            <select onChange={(event) => setRating(event.target.value)}>
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
                {currentUser ? (<button className="button-logout" onClick={handleLogOut}>Log Out</button>) : (<>
                    <button className="button-login" onClick={() => setShowLogin(true)} >Log In</button>
                    <button className="button-register" onClick={() => setShowRegister(true)}>Register</button></>
                )}
                {showRegister && <Register setShowRegister={setShowRegister} />}
                {showLogin && <Login setShowLogin={setShowLogin} localStorage={localStorage} setCurrentUser={setCurrentUser}/>}
            </ReactMapGL>
        </div>
    )
}

export default App;
