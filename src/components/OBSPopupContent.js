import React from 'react';


const OBSPopupContent = ({ object }) => (
    <div className="popup-content">
        <img src="/icons/obs.png" width="20" height="20" alt="observation" />
        <br />
        <b>
            Lokasi Observasi
        </b>
        <br />
        <br />
        <div className="kapasitas-container">
            <table>
                <tbody>
                    <tr>
                        <td>Nama Tempat</td>
                        <td>:</td>
                        <td><b>{object.properties.n}</b></td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <td><b>{object.properties.a}</b></td>
                    </tr>
                    <tr>
                        <td>Desa/Kelurahan</td>
                        <td>:</td>
                        <td><b>{object.properties.kel}</b></td>
                    </tr>
                    <tr>
                        <td>Kecamatan</td>
                        <td>:</td>
                        <td><b>{object.properties.kec}</b></td>
                    </tr>
                    <tr>
                        <td>Kota/Kabupaten</td>
                        <td>:</td>
                        <td><b>{object.properties.kab}</b></td>
                    </tr>
                    <tr>
                        <td>Daya Tampung</td>
                        <td>:</td>
                        <td><b>{object.properties.dt}</b></td>
                    </tr>
                    <tr>
                        <td>Koordinator</td>
                        <td>:</td>
                        <td><b>{object.properties.koor}</b></td>
                    </tr>
                    <tr>
                        <td>Kontak</td>
                        <td>:</td>
                        <td><b>{object.properties.hp}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
        {/* <pre>{JSON.stringify(object, undefined, 2)}</pre> */}
    </div>
)

export default OBSPopupContent;