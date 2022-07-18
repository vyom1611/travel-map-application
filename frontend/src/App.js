import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Room } from '@material-ui/icons';

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
            <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
                <Room style={{fontSize:viewport.zoom*6, color:"slateblue"}}/>
            </Marker>
            </ReactMapGL>
        </div>
    )
}

export default App;