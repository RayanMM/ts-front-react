import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import * as InvestigationActions from '../../../store/Occurrence/Investigation/actions';
import {removeArrayItem} from '../../../common/Utils';

const BodyParts = ({investigation_state, bodyParts}) =>{
    const [selected, setSelected] = useState([]);

    useEffect(()=>{
        setSelected(bodyParts);
        investigation_state("selectedBodyParts", bodyParts);
    }, [bodyParts]);

    const handleSelection = (event) =>{
        let array = [...selected];

        if(!array.includes(parseInt(event.target.id))){
            array.push(parseInt(event.target.id))
            setSelected(array);

            investigation_state("selectedBodyParts", array);
        }
        else{
            let newArray = removeArrayItem([...selected], parseInt(event.target.id));

            if(newArray){
                setSelected(newArray);
                investigation_state("selectedBodyParts", newArray);
            }
        }
    }

    return (
        <div className="body-svg">       
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1080 1080" className="bodyMain">
            <g id="Cabeça">
                <path className={`st0 ${selected.includes(1) ? "selected" : ""}`} onClick={handleSelection} id="1" d="M343,141.6c0,0-31.7-3.1-39.8-6.1c0,7.1,0,11.2,0,11.2s-11.2-5.1-11.2,7.1s13.3,24.5,13.3,24.5
                    s-2,15.3,11.2,20.4c7.1,3.1,26.6,8.2,26.6,8.2V141.6z"/>
                <path className={`st0 ${selected.includes(2) ? "selected" : ""}`} onClick={handleSelection} id="2" d="M343,141.6c0,0,31.7-3.1,39.8-6.1c0,7.1,0,11.2,0,11.2s11.2-5.1,11.2,7.1s-13.3,24.5-13.3,24.5
                    s2,15.3-11.2,20.4c-7.1,3.1-26.6,8.2-26.6,8.2V141.6z"/>
                <g id="Layer_5">
                    <line className={`st0 ${selected.includes(3) ? "selected" : ""}`} onClick={handleSelection} id="3" x1="332" y1="182.5" x2="354" y2="182.5"/>
                </g>
                <circle className={`st0 ${selected.includes(4) ? "selected" : ""}`} onClick={handleSelection} id="4" cx="325" cy="150" r="3.5"/>
                <circle className={`st0 ${selected.includes(5) ? "selected" : ""}`} onClick={handleSelection} id="5" cx="361" cy="150" r="3.5"/>
                <g id="Layer_4">
                    <path className={`st0 ${selected.includes(6) ? "selected" : ""}`} onClick={handleSelection} id="6" d="M303.5,135.5c0,0-8-34,39-33c0,25,0,39,0,39S309.5,138.5,303.5,135.5z"/>
                    <path className={`st0 ${selected.includes(7) ? "selected" : ""}`} onClick={handleSelection} id="7" d="M382.5,135.5c0,0,8-34-39-33c0,25,0,39,0,39S376.5,138.5,382.5,135.5z"/>
                </g>
            </g>
            <g id="Pescoço">
                <path className={`st0 ${selected.includes(8) ? "selected" : ""}`} onClick={handleSelection} id="8" d="M372.1,197.7c0,0-3.6,24.8,3.4,29.9c-8,5-24,16-33,15c0-25,1-36,1-36S362.6,204.8,372.1,197.7z"/>
                <path className={`st0 ${selected.includes(9) ? "selected" : ""}`} onClick={handleSelection} id="9" d="M314,197.7c0,0,3.6,24.8-3.4,29.9c8,5,24,16,33,15c0-25-1-36-1-36S323.4,204.8,314,197.7z"/>
            </g>
            <g id="Ombros">
                <path className={`st0 ${selected.includes(10) ? "selected" : ""}`} onClick={handleSelection} id="10" d="M310.1,227.8l10.8,6.2c0,0-30,71.8-99.6,91.5c0.5-28.1-2-50.3,15.2-69C260.3,247.9,282.2,242.3,310.1,227.8z"
                    />
                <path className={`st0 ${selected.includes(11) ? "selected" : ""}`} onClick={handleSelection} id="11" d="M376,227.8l-10.8,6.2c0,0,30,71.8,99.6,91.5c-0.5-28.1,2-50.3-15.2-69C425.8,247.9,404,242.3,376,227.8z"/>
            </g>
            <g id="Peitoral">
                <path className={`st0 ${selected.includes(12) ? "selected" : ""}`} onClick={handleSelection} id="12" d="M415.5,407.5h-25c0,0-14,0-24-17c-6-8-5-14-23-15c0-50,0-133,0-133s6,1,23-8c8,16,27,52,65,76
                    c-7,8-15,11-11,46C421.5,370.5,415.5,399.5,415.5,407.5z"/>
                <path className={`st0 ${selected.includes(13) ? "selected" : ""}`} onClick={handleSelection} id="13" d="M271.5,407.5h25c0,0,14,0,24-17c6-8,6-15,23-15c0-50,0-133,0-133s-6,1-23-8c-8,16-27,52-65,76c7,8,15,11,11,46
                    C265.5,370.5,271.5,399.5,271.5,407.5z"/>
                <circle className={`st0 ${selected.includes(14) ? "selected" : ""}`} onClick={handleSelection} id="14" cx="303.5" cy="306.5" r="4"/>
                <circle className={`st0 ${selected.includes(15) ? "selected" : ""}`} onClick={handleSelection} id="15" cx="384.5" cy="306.5" r="4"/>
            </g>
            <g id="Braços">
                <path className={`st0 ${selected.includes(16) ? "selected" : ""}`} onClick={handleSelection} id="16" d="M221.5,325.5v64c0,0,28-7,34,5c5-12,11-38,11-38s9-27-11-46C238.5,318.5,228.5,324.5,221.5,325.5z"/>
                <path className={`st0 ${selected.includes(17) ? "selected" : ""}`} onClick={handleSelection} id="17" d="M465.5,325.5v64c0,0-28-7-34,5c-5-12-11-38-11-38s-9-27,11-46C448.5,318.5,458.5,324.5,465.5,325.5z"/>
                <path className={`st0 ${selected.includes(18) ? "selected" : ""}`} onClick={handleSelection} id="18" d="M210.5,412.5l11-12v-11c0,0,31-7,33,5c1,3,0,5-4,22c0,1,0,3,0,3S224.5,425.5,210.5,412.5z"/>
                <path className={`st0 ${selected.includes(19) ? "selected" : ""}`} onClick={handleSelection} id="19" d="M476.5,412.5l-11-12v-11c0,0-31-7-33,5c-1,3,0,5,4,22c0,1,0,3,0,3S462.5,425.5,476.5,412.5z"/>
                <path className={`st0 ${selected.includes(20) ? "selected" : ""}`} onClick={handleSelection} id="20" d="M210.5,412.5c0,0-4,8-6,22s-5,48-7,50s24-1,29,11c8-11,33-52,24-76C242.5,420.5,226.5,421.5,210.5,412.5z"/>
                <path className={`st0 ${selected.includes(21) ? "selected" : ""}`} onClick={handleSelection} id="21" d="M476.3,413.5c0,0,4,8,6,22s5,48,7,50s-24-1-29,11c-8-11-33-52-24-76C444.3,421.5,460.3,422.5,476.3,413.5z"/>
                <path className={`st0 ${selected.includes(22) ? "selected" : ""}`} onClick={handleSelection} id="22" d="M197.5,485.5c-2.2,0.2-5,17.6-12,22.8c0,4.1,1,18.7,12,17.6c11-1,13-3.1,13-3.1l16-27
                    C226.5,495.9,222.5,483.4,197.5,485.5z"/>
                <path className={`st0 ${selected.includes(23) ? "selected" : ""}`} onClick={handleSelection} id="23" d="M489.5,486.5c2.2,0.2,5,17.6,12,22.8c0,4.1-1,18.7-12,17.6c-11-1-13-3.1-13-3.1l-16-27
                    C460.5,496.9,464.5,484.4,489.5,486.5z"/>
            </g>
            <g id="Maos">
                <path className={`st0 ${selected.includes(24) ? "selected" : ""}`} onClick={handleSelection} id="24" d="M185.5,508.5c0,0,0,28,25,14c0,4,1,22-4,36c-4,17-9,36-12,36s0-29,0-29s-9,31-12,32c-4,0-7-3-7-3s-2,4-4,3
                    s4-31,4-31s-4,26-9,28c-2-1-1-18-1-18l3-44c0,0-14,14-19,11s-1-6-1-6S184.5,505.5,185.5,508.5z"/>
                <path className={`st0 ${selected.includes(25) ? "selected" : ""}`} onClick={handleSelection} id="25" d="M501.1,509.5c0,0,0,28-25,14c0,4-1,22,4,36c4,17,9,36,12,36s0-29,0-29s9,31,12,32c4,0,7-3,7-3s2,4,4,3
                    s-4-31-4-31s4,26,9,28c2-1,1-18,1-18l-3-44c0,0,14,14,19,11s1-6,1-6S502.1,506.5,501.1,509.5z"/>
            </g>
            <g id="Barriga">
                <path className={`st0 ${selected.includes(26) ? "selected" : ""}`} onClick={handleSelection} id="26" d="M298.5,522.5c0,0,11,2,33-24c3-2,12-3,12-3v57c0,0-14,2-31-17c-12-9-14-11-14-11V522.5z"/>
                <path className={`st0 ${selected.includes(27) ? "selected" : ""}`} onClick={handleSelection} id="27" d="M389.5,522.5c0,0-11,2-33-24c-3-2-12-3-12-3v57c0,0,14,2,31-17c12-9,14-11,14-11V522.5z"/>
                <path className={`st0 ${selected.includes(28) ? "selected" : ""}`} onClick={handleSelection} id="28" d="M271.5,407.5c0,0,35,8,48-15s24-17,24-17v121c0,0-11-4-30,20c-8,4-15,6-15,6s8-53-30-52
                    C271.5,419.5,271.5,407.5,271.5,407.5z"/>
                <path className={`st0 ${selected.includes(29) ? "selected" : ""}`} onClick={handleSelection} id="29" d="M415.5,407.5c0,0-35,8-48-15s-24-17-24-17v121c0,0,11-4,30,20c8,4,15,6,15,6s-8-53,30-52
                    C415.5,419.5,415.5,407.5,415.5,407.5z"/>
                <ellipse className={`st0 ${selected.includes(30) ? "selected" : ""}`} onClick={handleSelection} id="30" cx="343.8" cy="450.3" rx="3.7" ry="3.8"/>
                <path className={`st0 ${selected.includes(31) ? "selected" : ""}`} onClick={handleSelection} id="31" d="M418.5,470.5c0,0-30.7,0.7-31.4,32.4c-0.8,31.6,19,46.6,40.8,54.6C427.8,530.5,425.7,490.5,418.5,470.5z"/>
                <path className={`st0 ${selected.includes(32) ? "selected" : ""}`} onClick={handleSelection} id="32" d="M268.3,470.5c0,0,30.7,0.7,31.4,32.4s-19,46.6-40.8,54.6C259,530.5,261.1,490.5,268.3,470.5z"/>
            </g>
            <g id="Pernas">
                <path className={`st0 ${selected.includes(33) ? "selected" : ""}`} onClick={handleSelection} id="33" d="M390.6,526.9c-0.1-0.1-0.2-0.2-0.2-0.2c-7.1,0.2,2.9-3.2-11.9,7.9c-16,12-25,18-33,19c6,20,5,105,7,140
                    c6-11,33-12,50-8c13-30,24-109,24-129C399.7,549.1,391.7,529.7,390.6,526.9z"/>
                <path className={`st0 ${selected.includes(34) ? "selected" : ""}`} onClick={handleSelection} id="34" d="M296.4,526.9c0.1-0.1,0.2-0.2,0.2-0.2c7.1,0.2-2.9-3.2,11.9,7.9c16,12,25,18,33,19c-6,20-5,105-7,140
                    c-6-11-33-12-50-8c-13-30-24-109-24-129C287.3,549.1,295.3,529.7,296.4,526.9z"/>
            </g>
            <g id="Joelhos">
                <path className={`st0 ${selected.includes(35) ? "selected" : ""}`} onClick={handleSelection} id="35" d="M352.5,695.5c0,0,12-21,50-8c1,2,7,49,7,49s-6,18-48,6C359.5,732.5,353.5,709.5,352.5,695.5z"/>
                <path className={`st0 ${selected.includes(36) ? "selected" : ""}`} onClick={handleSelection} id="36" d="M335.5,695.5c0,0-12-21-50-8c-1,2-7,49-7,49s6,18,48,6C328.5,732.5,334.5,709.5,335.5,695.5z"/>
            </g>
            <g id="Canela">
                <path className={`st0 ${selected.includes(37) ? "selected" : ""}`} onClick={handleSelection} id="37" d="M290.5,847c0,0-26-63.7-12-108.5c12,8,15,12.9,48,4c3,23.9,6,83.6,0,101.5C317.5,841,301.5,842,290.5,847z"/>
                <path className={`st0 ${selected.includes(38) ? "selected" : ""}`} onClick={handleSelection} id="38" d="M397.8,847c0,0,26-63.7,12-108.5c-12,8-15,12.9-48,4c-3,23.9-6,83.6,0,101.5C370.8,841,386.8,842,397.8,847z"
                    />
            </g>
            <g id="Tornozelo">
                <path className={`st0 ${selected.includes(39) ? "selected" : ""}`} onClick={handleSelection} id="39" d="M301.5,891.5c0,0-10-40-10-44c7-3,25-8,36-3c1,8,4,42,4,42S328.5,893.5,301.5,891.5z"/>
                <path className={`st0 ${selected.includes(40) ? "selected" : ""}`} onClick={handleSelection} id="40" d="M387.5,891.5c0,0,10-40,10-44c-7-3-25-8-36-3c-1,8-4,42-4,42S360.5,893.5,387.5,891.5z"/>
            </g>
            <g id="Pés">
                <path className={`st0 ${selected.includes(41) ? "selected" : ""}`} onClick={handleSelection} id="41" d="M387.2,892c0,0,1,19.2,5.1,25.2s9.2,10.1,9.2,10.1s4.1,7.1-4.1,8.1c-4.9,0.6-13.2,0.8-19,0.9
                    c-3.8,0.1-6.6,0.1-6.6,0.1s4.1-7.1-2-13.1c2,4,7.2,8.1,0,14.1c-5.1,2-17.4,3-14.3-10.1c3.1-13.1,2-23.2,2-24.2s0-16.2,0-16.2
                    S366.7,893.1,387.2,892z"/>
                <path className={`st0 ${selected.includes(42) ? "selected" : ""}`} onClick={handleSelection} id="42" d="M301.9,892c0,0-1,19.2-5.1,25.2s-9.2,10.1-9.2,10.1s-4.1,7.1,4.1,8.1c4.9,0.6,13.2,0.8,19,0.9
                    c3.8,0.1,6.6,0.1,6.6,0.1s-4.1-7.1,2-13.1c-2,4-7.2,8.1,0,14.1c5.1,2,17.4,3,14.3-10.1c-3.1-13.1-2-23.2-2-24.2s0-16.2,0-16.2
                    S322.3,893.1,301.9,892z"/>
            </g>
            <g id="Layer_17">
                <path className={`st0 ${selected.includes(43) ? "selected" : ""}`} onClick={handleSelection} id="43" d="M724.5,204.5l29,1v-70c0,0-11,3-39-3c0,6,0,15,0,15s-13-13-9,7c3,9,12,21,12,21v5c0,0,0,6,6,14
                    C723.5,202.5,724.5,204.5,724.5,204.5z"/>
                <path className={`st0 ${selected.includes(44) ? "selected" : ""}`} onClick={handleSelection} id="44" d="M782.5,204.5l-29,1v-70c0,0,11,3,39-3c0,6,0,15,0,15s13-13,9,7c-3,9-12,21-12,21v5c0,0,0,6-6,14
                    C783.5,202.5,782.5,204.5,782.5,204.5z"/>
            </g>
            <g id="Layer_18">
                <path className={`st0 ${selected.includes(45) ? "selected" : ""}`} onClick={handleSelection} id="45" d="M792.7,132.5c0,0,5.9-37-39.2-34c0,13,0,37,0,37S765.3,137.5,792.7,132.5z"/>
                <path className={`st0 ${selected.includes(46) ? "selected" : ""}`} onClick={handleSelection} id="46" d="M714.3,132.5c0,0-5.9-37,39.2-34c0,13,0,37,0,37S741.7,137.5,714.3,132.5z"/>
            </g>
            <g id="Layer_19">
                <path className={`st0 ${selected.includes(47) ? "selected" : ""}`} onClick={handleSelection} id="47" d="M724.5,205.5v16l-4,3c0,0,19,14,33,15c0-20,0-34,0-34H724.5z"/>
                <path className={`st0 ${selected.includes(48) ? "selected" : ""}`} onClick={handleSelection} id="48" d="M782.5,205.5v16l4,3c0,0-19,14-33,15c0-20,0-34,0-34H782.5z"/>
            </g>
            <g id="Layer_20">
                <path className={`st0 ${selected.includes(49) ? "selected" : ""}`} onClick={handleSelection} id="49" d="M630.5,320.5c0,0,58,38,101-89c-7-4-11-7-11-7l-40,20C680.5,244.5,626.5,236.5,630.5,320.5z"/>
                <path className={`st0 ${selected.includes(50) ? "selected" : ""}`} onClick={handleSelection} id="50" d="M877.3,320.5c0,0-58,38-101-89c7-4,11-7,11-7l40,20C827.3,244.5,881.3,236.5,877.3,320.5z"/>
            </g>
            <g id="Layer_21">
                <path className={`st0 ${selected.includes(51) ? "selected" : ""}`} onClick={handleSelection} id="51" d="M667.5,322.5c0,0,43,14,86,10c0-44,0-93,0-93s-8-2-22-8C722.5,255.5,712.5,302.5,667.5,322.5z"/>
                <path className={`st0 ${selected.includes(52) ? "selected" : ""}`} onClick={handleSelection} id="52" d="M840.5,322.5c0,0-43,14-86,10c0-44,0-93,0-93s8-2,22-8C785.5,255.5,795.5,302.5,840.5,322.5z"/>
            </g>
            <g id="Layer_22">
                <path className={`st0 ${selected.includes(53) ? "selected" : ""}`} onClick={handleSelection} id="53" d="M667.5,324.5c0,0,41,10,86,8c0,26.9,1,99.5,1,99.5s-48,0-74-7C680.5,408.1,677.5,328.5,667.5,324.5z"/>
                <path className={`st0 ${selected.includes(54) ? "selected" : ""}`} onClick={handleSelection} id="54" d="M840.5,324.5c0,0-41,10-86,8c0,26.9-1,99.5-1,99.5s48,0,74-7C827.5,408.1,830.5,328.5,840.5,324.5z"/>
            </g>
            <g id="Layer_23">
                <path className={`st0 ${selected.includes(55) ? "selected" : ""}`} onClick={handleSelection} id="55" d="M667.5,323.5c0,0,17,37,0,70c-11-8-15-9-37-5c0-16,3-46,3-46l-3-23C630.5,319.5,639.5,332.5,667.5,323.5z"/>
                <path className={`st0 ${selected.includes(56) ? "selected" : ""}`} onClick={handleSelection} id="56" d="M840.1,323.5c0,0-17,37,0,70c11-8,15-9,37-5c0-16-3-46-3-46l3-23C877.1,319.5,868.1,332.5,840.1,323.5z"/>
            </g>
            <g id="Layer_24">
                <path className={`st0 ${selected.includes(57) ? "selected" : ""}`} onClick={handleSelection} id="57" d="M630.5,388.5c0,0,24-8,37,5c-4,13-6,25-6,25s-20,9-41-5c3-7,10-13,10-13V388.5z"/>
                <path className={`st0 ${selected.includes(58) ? "selected" : ""}`} onClick={handleSelection} id="58" d="M877.5,388.5c0,0-24-8-37,5c4,13,6,25,6,25s20,9,41-5c-3-7-10-13-10-13V388.5z"/>
            </g>
            <g id="Layer_25">
                <path className={`st0 ${selected.includes(59) ? "selected" : ""}`} onClick={handleSelection} id="59" d="M680.5,425.5c0,0,58,10,73,6c0,11,1,55,1,55s-40,1-52-11s-16-16-24-15C678.5,451.5,680.5,425.5,680.5,425.5z"
                    />
                <path className={`st0 ${selected.includes(60) ? "selected" : ""}`} onClick={handleSelection} id="60" d="M827.5,425.5c0,0-58,10-73,6c0,11-1,55-1,55s40,1,52-11s16-16,24-15C829.5,451.5,827.5,425.5,827.5,425.5z"/>
            </g>
            <g id="Layer_26">
                <path className={`st0 ${selected.includes(61) ? "selected" : ""}`} onClick={handleSelection} id="61" d="M620.5,412.5c0,0,14,11,40,7c0,15,4,36-24,76c-8-6-17-14-31-10c3-11,7-30,8-44S620.5,412.5,620.5,412.5z"/>
                <path className={`st0 ${selected.includes(62) ? "selected" : ""}`} onClick={handleSelection} id="62" d="M887.7,412.5c0,0-14,11-40,7c0,15-4,36,24,76c8-6,17-14,31-10c-3-11-7-30-8-44S887.7,412.5,887.7,412.5z"/>
                <path className={`st0 ${selected.includes(63) ? "selected" : ""}`} onClick={handleSelection} id="63" d="M605.5,486.5c0,0,11-7,31,9c-9,14-15,32-15,32s-21-2-26-18C602.5,498.5,603.5,495.5,605.5,486.5z"/>
                <path className={`st0 ${selected.includes(64) ? "selected" : ""}`} onClick={handleSelection} id="64" d="M903.5,486.5c0,0-11-7-31,9c9,14,15,32,15,32s21-2,26-18C906.5,498.5,905.5,495.5,903.5,486.5z"/>
            </g>
            <g id="Layer_27">
                <path className={`st0 ${selected.includes(65) ? "selected" : ""}`} onClick={handleSelection} id="65" d="M594.5,509.5c0,0,5,17,27,18c0,13-2,28-7,35c-2,11-8,31-12,33c-3-4,2-27,2-27s-16,44-19,29c-2,0-7,4-7-4
                    s7-30,7-30l-9,31c0,0-6,6-4-11s5-49,5-49s-12,11-17,10s-6-4-6-4s16-14,18-16S582.5,510.5,594.5,509.5z"/>
                <path className={`st0 ${selected.includes(66) ? "selected" : ""}`} onClick={handleSelection} id="66" d="M914.5,509.5c0,0-5,17-27,18c0,13,2,28,7,35c2,11,8,31,12,33c3-4-2-27-2-27s16,44,19,29c2,0,7,4,7-4
                    s-7-30-7-30l9,31c0,0,6,6,4-11s-5-49-5-49s12,11,17,10s6-4,6-4s-16-14-18-16S926.5,510.5,914.5,509.5z"/>
            </g>
            <g id="Layer_28">
                <path className={`st0 ${selected.includes(67) ? "selected" : ""}`} onClick={handleSelection} id="67" d="M670.5,564.5c0,0,46-20,38-64c-2-17-4-32-29-41C674.5,483.5,669.5,509.5,670.5,564.5z"/>
                <path className={`st0 ${selected.includes(68) ? "selected" : ""}`} onClick={handleSelection} id="68" d="M838.3,564.5c0,0-46-20-38-64c2-17,4-32,29-41C834.3,483.5,839.3,509.5,838.3,564.5z"/>
            </g>
            <g id="Layer_29">
                <path className={`st0 ${selected.includes(69) ? "selected" : ""}`} onClick={handleSelection} id="69" d="M702.5,475.5c0,0,22,16,52,11c-1,28-3,83-3,83s-25,26-80-5C691.5,550.5,724.5,540.5,702.5,475.5z"/>
                <path className={`st0 ${selected.includes(70) ? "selected" : ""}`} onClick={handleSelection} id="70" d="M806.5,475.5c0,0-22,16-52,11c1,28,3,83,3,83s25,26,80-5C817.5,550.5,784.5,540.5,806.5,475.5z"/>
            </g>
            <g id="Layer_30">
                <g>
                    <path d="M747.5,495.5c1.5,1.6,2.9,3.3,4.1,5.1c1.3,1.7,2.5,3.6,3.7,5.4l-1.6-0.1l2-2.7c0.7-0.9,1.4-1.8,2.1-2.7
                        c0.7-0.9,1.5-1.7,2.2-2.6c0.8-0.8,1.6-1.7,2.4-2.5c-0.5,1.1-1,2-1.6,3c-0.6,1-1.2,2-1.8,2.9c-0.6,1-1.2,1.9-1.9,2.8l-2,2.8
                        l-0.9,1.2l-0.8-1.3c-1.1-1.8-2.3-3.7-3.3-5.6C749.3,499.5,748.3,497.6,747.5,495.5z"/>
                </g>
            </g>
            <g id="Layer_31">
                <path className={`st0 ${selected.includes(71) ? "selected" : ""}`} onClick={handleSelection} id="71" d="M670.5,564.5c0,0,29,27,81,8c-3,34-5,127-5,127s-26-26-52-4C687.5,661.5,664.5,579.5,670.5,564.5z"/>
                <path className={`st0 ${selected.includes(72) ? "selected" : ""}`} onClick={handleSelection} id="72" d="M837.5,564.5c0,0-29,27-81,8c3,34,5,127,5,127s26-26,52-4C820.5,661.5,843.5,579.5,837.5,564.5z"/>
            </g>
            <g id="Layer_32">
                <path className={`st0 ${selected.includes(73) ? "selected" : ""}`} onClick={handleSelection} id="73" d="M694.5,695.5c0,0,26-23,52,4c-4,25-9,42-9,48c-10,4-33,8-50-5C691.5,723.5,696.5,704.5,694.5,695.5z"/>
                <path className={`st0 ${selected.includes(74) ? "selected" : ""}`} onClick={handleSelection} id="74" d="M813.5,695.5c0,0-26-23-52,4c4,25,9,42,9,48c10,4,33,8,50-5C816.5,723.5,811.5,704.5,813.5,695.5z"/>
                <path className={`st0 ${selected.includes(75) ? "selected" : ""}`} onClick={handleSelection} id="75" d="M687.5,742.5c0,0,15,19,50,5c2,21,0,106,0,106s-21-13-36,6c-7-28-28-76-14-115
                    C687.5,743.5,687.5,742.5,687.5,742.5z"/>
                <path className={`st0 ${selected.includes(76) ? "selected" : ""}`} onClick={handleSelection} id="76" d="M820.5,741.5c0,0-15,19-50,5c-2,21,0,106,0,106s21-13,36,6c7-28,28-76,14-115
                    C820.5,742.5,820.5,741.5,820.5,741.5z"/>
            </g>
            <g id="Layer_33">
                <path className={`st0 ${selected.includes(77) ? "selected" : ""}`} onClick={handleSelection} id="77" d="M701.5,859.5c0,0,8-19,37-6c0,20,0,30,0,30s-12,10-28,2C704.5,866.5,701.5,859.5,701.5,859.5z"/>
                <path className={`st0 ${selected.includes(78) ? "selected" : ""}`} onClick={handleSelection} id="78" d="M807.5,858.5c0,0-8-19-37-6c0,20,0,30,0,30s12,10,28,2C804.5,865.5,807.5,858.5,807.5,858.5z"/>
            </g>
            <g id="Layer_34">
                <path className={`st0 ${selected.includes(79) ? "selected" : ""}`} onClick={handleSelection} id="79" d="M710.5,886.5v14c0,0-3,5,0,14c-5,10-23,28-9,26c2,2,5,2,5,2s11,3,19,0c3,1,13,9,18-4c-4-13-6-23-2-32
                    c0-11-3-22-3-22S720.5,892.5,710.5,886.5z"/>
                <path className={`st0 ${selected.includes(80) ? "selected" : ""}`} onClick={handleSelection} id="80" d="M798.5,885.5v14c0,0,3,5,0,14c5,10,23,28,9,26c-2,2-5,2-5,2s-11,3-19,0c-3,1-13,9-18-4c4-13,6-23,2-32
                    c0-11,3-22,3-22S788.5,891.5,798.5,885.5z"/>
            </g>
            </svg>
        </div>
    );
}

const mapStateToProps = state =>{
    return{
        bodyParts: state.investigation.bodyParts
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        investigation_state: (node, value)=>{
            dispatch(InvestigationActions.investigation_state(node, value));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyParts);