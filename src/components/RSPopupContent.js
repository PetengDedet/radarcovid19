import React from 'react';

const RSPopupContent = ({cluster}) => (
    
    <div className="popup-content">
        <img src="/icons/rs.png" width="20" height="20" alt="hospital-icon" />
        <br />
        <b>
            Rumah Sakit
        </b>
        <br />
        <div className="kapasitas-container"></div>
        <b>{cluster.properties.n}</b>
        <br />
        {cluster.properties.kab}
        <p>
            <b>Kontak:</b> {cluster.properties.k.split("/").map(a => (
                <span key={a} className="single-contact">
                    <a key={a} href={`tel:${a.trim()}`}>{a.trim()}</a>
                </span>
            ))}

            <br />
            <br />
            <a href={`https://maps.google.com/maps/place/${cluster.geometry.coordinates[1]},${cluster.geometry.coordinates[0]}`} target="_blank" rel="noopener noreferrer" >Google Map</a>
        </p>
        <div className="kapasitas-container">
            <b>Kapasitas*</b>
            <table>
                <tbody>
                    <tr>
                        <td>Isolasi Dg Ventilator</td>
                        <td>:</td>
                        <td>{cluster.properties.isov}</td>
                    </tr>
                    <tr>
                        <td>Isolasi Tanpa Ventilator</td>
                        <td>:</td>
                        <td>{cluster.properties.iso}</td>
                    </tr>
                    <tr>
                        <td>Isolasi Biasa</td>
                        <td>:</td>
                        <td>{cluster.properties.isotn}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p><small><em>*Update terakhir pada: {cluster.properties.terakhir_update}</em></small></p>
    </div>
)

export default RSPopupContent