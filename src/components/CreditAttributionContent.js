import React from "react";

const CreditAttributionContent = props => (
    <>
        <p>
            <b>Dashboard Asli dan Sumberdata</b> <br />
            <a href="https://radarcovid19.jatimprov.go.id/" target="_blank" rel="noopener noreferrer">https://radarcovid19.jatimprov.go.id/</a>
        </p>
        <p>
            <b>Repository</b><br />
            <a href="https://github.com/PetengDedet/radarcovid19" target="_blank" rel="noopener noreferrer">https://github.com/PetengDedet/radarcovid19</a>
        </p>
        <p>
            <b>Developer</b><br />
            <a href="https://www.facebook.com/ikhwanmaftuh" target="_blank" rel="noopener noreferrer">Ikhwan Maftuh</a><br />
        </p>
        <p>
            <b>Map by:</b>
            <br/>
            © <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>
        </p>
        <p>
            Icons by <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">Icons8</a>
        </p>
        <div style={{ padding: 4, border: '1px solid red', backgroundColor: 'red', background: 'rgba(255, 0, 0, 0.1)', fontStyle: 'italic', fontSize: 10 }}>
            <b>DISCLAIMER</b><br />
            <p >
                Titik merah bukan titik persis lokasi pasien positif Covid-19 namun diacak by system dalam radius 1 km dari alamat domisili pasien di area kecamatan tersebut.
            </p>
            <p>
                Update kapasitas RS dapat dilakukan secara realtime oleh Rumah Sakit. Untuk konfirmasi langsung dapat menghubungi nomer terlampir di tiap RS.
            </p>
            <p>
                Titik bersifat dimana domisili kasus positif Covid-19. Sehingga baik kasus sembuh maupun meninggal tetap di tampilkan, agar masyarakat tetap waspada
            </p>
            <p>Tetap Jaga Kesehatan yaa, ingat #dirumahaja</p>
        </div>
    </>
);

export default CreditAttributionContent;
