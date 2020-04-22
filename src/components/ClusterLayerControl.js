import React from "react";

const ClusterLayerControl = props => {
    return (
        <div className={props.className}>
            <div className="checkbox-group">
                <div>
                    <span style={{background: 'red'}}>&nbsp;&nbsp;</span>
                    <input type="checkbox" value="kasus" checked={props.showCase} onChange={props.onShowCaseChange} />
                    Kasus Positif
                </div>
                <div>
                    <span style={{ background: '#2ecc71'}}>&nbsp;&nbsp;</span>
                    <input type="checkbox" value="rs" checked={props.showRs} onChange={props.onShowRsChange} />
                    Rumah Sakit
                </div>
                <div>
                    <span style={{background: 'orange'}}>&nbsp;&nbsp;</span>
                    <input type="checkbox" value="observasi" checked={props.showObs} onChange={props.onShowObsChange} />
                    Lokasi Observasi
                </div>
            </div>
        </div>
    )
};

export default ClusterLayerControl;