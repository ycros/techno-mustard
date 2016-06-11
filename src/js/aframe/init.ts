
import * as AFRAME from 'aframe';

import newMeter from './component/meter.ts';
import {Session} from "../audio/Session";

export default function init(session: Session) {
    AFRAME.registerComponent('meter', newMeter(session));
}
