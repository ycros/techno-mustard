require("../index.html");
require("../assets/styles/base.css");
require("../assets/styles/app.css");

require('aframe');
// require('babel-polyfill');
require('aframe-altspace-component');

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MainScene from './components/MainScene';
import {Session} from "./audio/Session";
import shimRequestAnimationFrame from './util/raf_dethrottle_shim';
import initAframe from './aframe/init';

const session = new Session();
initAframe(session);
shimRequestAnimationFrame();

ReactDOM.render(<MainScene />, document.getElementById('app'));
session.start();
