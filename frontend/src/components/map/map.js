
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import React, { useEffect, useRef, useState } from 'react';

import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';

import classes from './map.module.css';

export default function Map({ readonly, location, onChange }) {

    const initialLocation = useRef(location || [0, 0]);

    return (
        <div className={classes.container}>
            <MapContainer
                className={classes.map}
                center={initialLocation.current}
                zoom={location ? 15 : 1}
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
    const [position, setPosition] = useState(location);

    const map = useMapEvents({
        click(e) {
            if (!readonly) {
                setPosition(e.latlng);
                onChange?.(e.latlng);
            }
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, 18);
        },
        locationerror(e) {
            toast.error(e.message);
        }
    });

    useEffect(() => {
        if (readonly) {
            map.setView(position, 15);
        }
    }, [map, position, readonly]);

    return (
        <>
            { !readonly && (
                <button
                    type="button"
                    className={classes.findlocation}
                    onClick={() => map.locate()}
                >
                    Tìm vị trí
                </button>
            )}

            {position && (
                <Marker
                eventHandlers={{
                    dragend: (e) => {
                        setPosition(e.target.getLatLng());
                    },
                }}
                position={position}
                draggable={!readonly}
                >
                    <Popup className={classes.popup}>Vị trí nhận hàng</Popup>
                </Marker>
            )}
        </>
    )
}