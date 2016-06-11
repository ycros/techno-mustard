
import * as AFRAME from 'aframe';

import newMeter from './component/meter.ts';

export default function init() {
    AFRAME.registerComponent('meter', newMeter());
}
