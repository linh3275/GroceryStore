
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import classes from './map.module.css';
import { toast } from 'react-toastify';

export default function Map({ readonly, location, onChange }) {
    return (
        <div className={classes.container}>
            <MapContainer
                className={classes.map}
                center={[0, 0]}
                zoom={1}
                dragging={!readonly}
                touchZoom={!readonly}   
                doubleClickZoom={!readonly}
                scrollWheelZoom={!readonly}
                boxZoom={!readonly}
                keyboard={!readonly}
                attributionControl={false}
            >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <FindButtonAndMarket
                    readonly={readonly}
                    location={location}
                    onChange={onChange}
                />
            </MapContainer>
        </div>
    )
}

function FindButtonAndMarket({ readonly, location, onChange }) {
    const [postition, setPosition] = useState(location);

    useEffect(() => {
        if (readonly) {
            map.setView(postition, 15);
            return;
        }
        if (postition) onChange(postition);
    }, [onChange]);

    const map = useMapEvents({
        click(e) {
            !readonly && setPosition(e.latlng);
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, 13);
        },
        locationerror(e) {
            toast.error(e.message);
        }
    })

    return (
        <>
            { !readonly && (
                <button
                    type="button"
                    className={classes.findlocation}
                    onClick={() => map.locate()}
                >
                    Find My Location
                </button>
            )}

            {postition && (
                <Marker
                eventHandlers={{
                    dragend: (e) => {
                        setPosition(e.target.getLatLng());
                    },
                }}
                position={postition}
                draggable={!readonly}
                >
                    <Popup>Shipping Location</Popup>
                </Marker>
            )}
        </>
    )
}