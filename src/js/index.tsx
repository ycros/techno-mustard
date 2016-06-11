require("../index.html");
require("../assets/styles/base.css");
require("../assets/styles/app.css");

require('aframe');
// require('babel-polyfill');
require('aframe-altspace-component');

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MainScene from './components/MainScene';
import SequencerEngine from './audio/SequencerEngine';
import shimRequestAnimationFrame from './util/raf_dethrottle_shim';
import initAframe from './aframe/init';

import SystemActions from './actions/SystemActions';
import { SystemStore } from './stores/SystemStore';

initAframe();
shimRequestAnimationFrame();

ReactDOM.render(<MainScene />, document.getElementById('app'));
const sequencerEngine = new SequencerEngine();
SystemActions.setSequencerEngine(sequencerEngine);
