import React from 'react';
import {FlyToInterpolator, Marker} from 'react-map-gl';


const ClusterMarkers = (props) => {
    const {
        clusters, pointsLength, onMarkerClick,
        markerIcon, clusterContentClassName, markerContentClassName,
        clearPopup, maxZoom, setViewport,
        viewport
    } = props;

    return clusters.clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
            cluster: isCluster,
            point_count: pointCount
        } = cluster.properties;

        if (isCluster) {
            return (
                <Marker key={JSON.stringify(cluster)}
                    latitude={latitude}
                    longitude={longitude}
                >
                    <div
                        className={clusterContentClassName}
                        style={{
                            width: `${10 + (pointCount / pointsLength) * 50}px`,
                            height: `${10 + (pointCount / pointsLength) * 50}px`,
                        }}

                        onClick={() => {
                            const expansionZoom = Math.min(
                                clusters.supercluster.getClusterExpansionZoom(cluster.id),
                                maxZoom
                            );

                            setViewport({
                                ...viewport,
                                latitude: cluster.geometry.coordinates[1],
                                longitude: cluster.geometry.coordinates[0],
                                zoom: expansionZoom,
                                transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
                                transitionDuration: "auto"
                            });

                            clearPopup();
                        }}
                    >
                        {pointCount}
                    </div>
                </Marker>
            )
        }

        return (
            <Marker
                key={JSON.stringify(cluster)}
                latitude={latitude}
                longitude={longitude}
                offsetLeft={-7.5}
                offsetTop={-7.5}
            >
                <button
                    className={markerContentClassName}
                    onClick={() => {
                        onMarkerClick(cluster);
                    }}
                >
                    <img src={markerIcon} alt="-" />
                </button>
            </Marker>
        )
    })
};

export default ClusterMarkers;