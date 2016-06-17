import shimRequestAnimationFrame from './util/raf_dethrottle_shim';
shimRequestAnimationFrame();

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
import initAframe from './aframe/init';
require("./stores/ChannelStore");

const session = new Session();
initAframe(session);

ReactDOM.render(<MainScene />, document.getElementById('app'));
session.start();

// SessionActions.toggleSequencerPosition(SequencerID.Drum, 0, 0);
// SessionActions.toggleSequencerPosition(SequencerID.Drum, 4, 0);
// SessionActions.toggleSequencerPosition(SequencerID.Drum, 8, 0);
// SessionActions.toggleSequencerPosition(SequencerID.Drum, 12, 0);


// interface Window {
//     store: any;
// }
//
// import {SessionStore} from './stores/SessionStore';
// window['store'] = SessionStore;
// window['channelStore'] = ChannelStore;
// window.store = SessionStore;
