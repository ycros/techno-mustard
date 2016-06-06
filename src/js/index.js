import "../index.html";
import "../assets/styles/base.css";
import "../assets/styles/app.css";

import 'aframe';
import 'babel-polyfill';
import 'aframe-altspace-component';
import './aframe/component/meter';

import React from 'react';
import ReactDOM from 'react-dom';

import MainScene from './components/MainScene';
import SequencerEngine from './audio/SequencerEngine';
import shimRequestAnimationFrame from './util/raf_dethrottle_shim';

import SystemActions from './actions/SystemActions';
import SystemStore from './stores/SystemStore';

shimRequestAnimationFrame();

ReactDOM.render(<MainScene />, document.getElementById('app'));
const sequencerEngine = new SequencerEngine();
SystemActions.setSequencerEngine(sequencerEngine);
