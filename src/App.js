import React, { useState, useRef } from 'react';
import ReactMapGL, { NavigationControl, Popup } from 'react-map-gl'
import useSwr from 'swr';
import './App.css';
import useSupercluster from 'use-supercluster';
import RSPopupContent from './components/RSPopupContent';
import POSPopupContent from './components/POSPopupContent';
import OBSPopupContent from './components/OBSPopupContent';
import ClusterMarkers from './components/ClusterMarkers';
import Panel from './components/Panel';
import ClusterLayerControl from "./components/ClusterLayerControl";
import CreditAttributionContent from "./components/CreditAttributionContent";

//Change with your own access token
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const fetcher = (...args) => fetch(...args).then(response => response.json());
const rsUrl = "/data/rs_latest.json?" + ((new Date()).getTime() / 1000);
const posUrl = "/data/pos_latest.json?" + ((new Date()).getTime() / 1000);
const obsUrl = "/data/do_latest.json?" + ((new Date()).getTime() / 1000);

const isMobile = window.innerWidth <= 500;

//Convert JSON Data to Geojson Point
const dataToFeaturePoints = data => {
    return data.map(d => {
        let lat = parseFloat(d.lat.replace(",", "."));
        let lng = parseFloat(d.lng.replace(",", "."));

        return {
            type: "Feature",
            properties: {
                cluster: false,
                ...d
            },
            geometry: {
                type: "Point",
                coordinates: [lng, lat]
            }
        }
    });
};

function App() {
    
    // Set the map
    const [viewport, setViewport] = useState({
        latitude: -9.05930195, //-6.9106703,
        longitude: 112.832878,//112.4620895,
        width: "100vw",
        height: "100vh",
        zoom: 6
    });
    const [rsPopup, setRsPopup] = useState();
    const [posPopup, setPosPopup] = useState();
    const [obsPopup, setObsPopup] = useState();
    const [showCase, setShowCase] = useState(true);
    const [showRs, setShowRs] = useState(true);
    const [showObs, setShowObs] = useState(true);
    const [showCredit, setShowCredit] = useState(false);

    const mapRef = useRef();

    // Load and prepare data
    const rsReq = useSwr(rsUrl, fetcher);
    const posReq = useSwr(posUrl, fetcher);
    const obsReq = useSwr(obsUrl, fetcher);
    const rs_data = rsReq.data && !rsReq.error ? rsReq.data.data.slice(0, 2000) : [];
    const pos_data = posReq.data && !posReq.error ? posReq.data.data.slice(0, 2000) : [];
    const obs_data = obsReq.data && !obsReq.error ? obsReq.data.data.slice(0, 2000) : [];

    const rsPoints = dataToFeaturePoints(rs_data);
    const posPoints = dataToFeaturePoints(pos_data);
    const obsPoints = dataToFeaturePoints(obs_data);

    // Get map bounds
    const bounds = mapRef.current 
        ? mapRef.current
            .getMap()
            .getBounds()
            .toArray()
            .flat() 
        : null;

    const rsClusters = useSupercluster({
        points: rsPoints,
        zoom: viewport.zoom,
        bounds,
        options: { radius: 50, maxZoom: 20 }
    });

    const posClusters = useSupercluster({
        points: posPoints,
        zoom: viewport.zoom,
        bounds,
        options: { radius: 50, maxZoom: 24 }
    });

    const obsClusters = useSupercluster({
        points: obsPoints,
        zoom: viewport.zoom,
        bounds,
        options: { radius: 50, maxZoom: 20 }
    });

    const clearAllPopup = () => {
        setObsPopup(null);
        setRsPopup(null);
        setPosPopup(null);
    };

    return (
        <>
            <ReactMapGL
                {...viewport}
                maxZoom={20}
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                onViewportChange={newviewport => {
                    setViewport({...newviewport})
                }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapOptions={{
                    attributionControl: false
                }}
                ref={mapRef}
            >

                <div className={`navigation-control-container ${(rsPopup || posPopup || obsPopup) && 'semi-transparent'}`}>
                    <NavigationControl />
                </div>

                <ClusterLayerControl
                    className={`cluster-layer-control-container ${(rsPopup || posPopup || obsPopup) && 'semi-transparent'}`}
                    showCase={showCase}
                    showRs={showRs}
                    showObs={showObs}
                    onShowCaseChange={() => setShowCase(!showCase)}
                    onShowRsChange={() => setShowRs(!showRs)}
                    onShowObsChange={() => setShowObs(!showObs)}
                />

                {/* RS */}

                {showRs && (
                <ClusterMarkers 
                    clusters={rsClusters}
                    pointsLength={rsPoints.length}
                    clearPopup={clearAllPopup}
                    maxZoom={20}
                    setViewport={setViewport}
                    viewport={viewport}
                    onMarkerClick={(cluster) => {
                        setObsPopup(null);
                        setPosPopup(null);
                        setRsPopup(cluster);
                    }}
                    markerIcon="/icons/rs.png"
                    clusterContentClassName="rs-cluster-marker"
                    markerContentClassName="rs-marker"
                />)}

                {
                    !isMobile && rsPopup && showRs && <Popup
                        latitude={rsPopup.geometry.coordinates[1]}
                        longitude={rsPopup.geometry.coordinates[0]}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => {
                            setRsPopup(null);
                        }}
                        anchor="top" >

                        <RSPopupContent cluster={rsPopup} />
                    </Popup>
                }

                {/* POSITIVES */}
                { showCase && (
                <ClusterMarkers
                    clusters={posClusters}
                    pointsLength={posPoints.length}
                    clearPopup={clearAllPopup}
                    maxZoom={20}
                    setViewport={setViewport}
                    viewport={viewport}
                    onMarkerClick={(cluster) => {
                        setObsPopup(null);
                        setPosPopup(cluster);
                        setRsPopup(null);
                    }}
                    markerIcon="/icons/vrs.png"
                    clusterContentClassName="pos-cluster-marker"
                    markerContentClassName="pos-marker"
                />)}

                {
                    !isMobile && posPopup && showCase && <Popup
                        latitude={posPopup.geometry.coordinates[1]}
                        longitude={posPopup.geometry.coordinates[0]}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => {
                            setPosPopup(null);
                        }}
                        anchor="top" >

                        <POSPopupContent object={posPopup} />
                    </Popup>
                }

                
                {/* OBSERVATION */}
                {showObs && (
                <ClusterMarkers
                    clusters={obsClusters}
                    pointsLength={obsPoints.length}
                    clearPopup={clearAllPopup}
                    maxZoom={20}
                    setViewport={setViewport}
                    viewport={viewport}
                    onMarkerClick={(cluster) => {
                        setObsPopup(cluster);
                        setPosPopup(null);
                        setRsPopup(null);
                    }}
                    markerIcon="/icons/obs.png"
                    clusterContentClassName="obs-cluster-marker"
                    markerContentClassName="obs-marker"
                />)}

                {
                    !isMobile && obsPopup && showObs && <Popup
                        latitude={obsPopup.geometry.coordinates[1]}
                        longitude={obsPopup.geometry.coordinates[0]}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => {
                            setObsPopup(null)
                        }}
                        anchor="top" >

                        <OBSPopupContent object={obsPopup} />
                    </Popup>
                }

                { ((!rsReq.data && !rsReq.error) || (!posReq.data && !posReq.error) || (!obsReq.data && !obsReq.error) ) &&
                    <div className="error-and-loading-container">
                        {  rsReq.error ? 'Error loading Data Rumah Sakit :( ' : 
                            posReq.error ? 'Error loading Data Kasus :( ' :
                                obsReq.error ? 'Error loading Data Observasi :( ' :
                                        'Loading...'}
                    </div>
                }

                
            </ReactMapGL>

            {
                isMobile && rsPopup && showRs && <Panel onClose={() => setRsPopup(null)}>
                    <RSPopupContent cluster={rsPopup} />
                </Panel>
            }

            {
                isMobile && posPopup && showCase && <Panel onClose={() => setPosPopup(null)}>
                    <POSPopupContent object={posPopup} />
                </Panel>
            }

            {
                isMobile && obsPopup && showObs && <Panel onClose={() => setObsPopup(null)}>
                    <OBSPopupContent object={obsPopup} />
                </Panel>
            }

            {
                showCredit && (
                    <Panel onClose={() => setShowCredit(false)} style={{ fontSize: 'small', textAlign: 'center'}}>
                        <CreditAttributionContent/>
                    </Panel>
                )
            }
            <div className="credit-attribution-link-container" >
                <button href="#" className="credit-attribution-link" onClick={() => setShowCredit(true)}>
                    © Credit & Disclaimer!!
                </button>
            </div>
        </>
    );
}
    
export default App;
