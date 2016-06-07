import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';

import toggleOffSrc from '../../assets/img/toggle_off.png';
import toggleOnSrc from '../../assets/img/toggle_on.png';

import Grid from './Grid';

class MainScene extends React.Component {
    render() {
        return (
            <a-scene altspace="usePixelScale: true" scale="50 50 50"
                     keyboard-shortcuts="enterVR: false; resetSensor: false" vr-mode-ui="enabled: false">
                <a-assets>
                    <img id="toggleOnMap" src={toggleOnSrc}/>
                    <img id="toggleOffMap" src={toggleOffSrc}/>
                </a-assets>

                <Grid rotation="0 0 0" position="-2 0 0"/>

                <Entity geometry="primitive: box; width: 0.2; height: 0.1; depth: 0.1" position="-2.7 -0.2 0"
                        material="color: blue" meter="meter">
                </Entity>

                <a-camera position="0 1.0 5">
                    <a-cursor color="#2E3A87"/>
                </a-camera>
            </a-scene>
        );
    }
}

export default MainScene;
