import React from 'react';

const POSPopupContent = ({ object }) => (
    <div className="popup-content">
        <img src="/icons/vrs.png" width="20" height="20" alt="virus-icon" />
        <br />
        <b>
            Kasus Positif
            <br />Nomor Urut {object.properties.nomorkasus}
        </b>
        <br />
        <br />
        <div className="kapasitas-container">
            <b>Pasien</b>
            <table>
                <tbody>
                    <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td><b>{object.properties.k}</b></td>
                    </tr>
                    <tr>
                        <td>Umur</td>
                        <td>:</td>
                        <td><b>{object.properties.u}</b></td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>:</td>
                        <td><b>{object.properties.sp}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br />
        <br />
        <div className="kapasitas-container">
            <b>Lokasi*</b>
            <table>
                <tbody>
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
                </tbody>
            </table>
        </div>

        <div className="kapasitas-container">
            <p><small><em>*Titik merah bukan titik persis lokasi pasien positif Covid-19 namun diacak by system dalam radius 1 km dari alamat domisili pasien di area kecamatan tersebut.
            <br />
                <br />*Titik bersifat dimana domisili kasus positif Covid-19. Sehingga baik kasus sembuh maupun meninggal tetap di tampilkan, agar masyarakat tetap waspada.</em></small></p>
        </div>
    </div>
);

export default POSPopupContent;