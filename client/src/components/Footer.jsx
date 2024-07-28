import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import L from 'leaflet';
import customMarker from '../leaf-red.png';  

export default function Footer() {
  const parisPosition = [48.8566, 2.3522];

  const stores = [
    { position: [48.8566, 2.3522], name: 'Magasin GAMAZA Paris', address: '74 avenue GAMAZA, Paris' },
    { position: [43.6047, 1.4442], name: 'Magasin GAMAZA Toulouse', address: '20 rue GAMAZA, Toulouse' },
    { position: [45.7640, 4.8357], name: 'Magasin GAMAZA Lyon', address: '15 place GAMAZA, Lyon' },
    { position: [50.6292, 3.0573], name: 'Magasin GAMAZA Lille', address: '10 boulevard GAMAZA, Lille' },
    { position: [43.7102, 7.2620], name: 'Magasin GAMAZA Nice', address: '5 avenue GAMAZA, Nice' },
  ];

  const customIcon = new L.Icon({
    iconUrl: customMarker,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <footer className="flex flex-col md:flex-row items-center justify-between bg-dark-purple bg-opacity-20 h-auto md:h-96 mt-10 w-full p-4 border-t border-gray-300">
      <div className="flex-1 flex flex-col items-center md:items-start justify-center p-4 text-center md:text-left">
        <h2 className="text-gold text-4xl font-primary mb-2">Nous contacter</h2>
        <p className="text-gold mb-4">74 avenue GAMAZA, GAMAZA CITY</p>
        <p className="text-gold mb-4">Email: gamaza@gamaza.com</p>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-white hover:text-gray-400"><FaFacebook size={24} /></a>
          <a href="https://twitter.com" className="text-white hover:text-gray-400"><FaTwitter size={24} /></a>
          <a href="https://instagram.com" className="text-white hover:text-gray-400"><FaInstagram size={24} /></a>
        </div>
      </div>
      <div className="flex-1 h-64 md:h-full w-full md:w-1/2 p-4">
        <MapContainer center={parisPosition} zoom={6} style={{ height: '100%', width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {stores.map((store, index) => (
            <Marker key={index} position={store.position} icon={customIcon}>
              <Popup>
                {store.name} <br /> {store.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </footer>
  );
}
