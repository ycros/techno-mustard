import * as React from 'react';
import {Animation, Entity, Scene} from 'aframe-react';

import {PolySequencerStore, SequencerState} from '../stores/SequencerStore';
import {PolySequencerActions} from '../actions/SequencerActions';

import GridButton from './GridButton';
import ToggleButton from './ToggleButton';

interface Props {
    position: string;
    rotation: string;
}

export default class Grid extends React.Component<Props, SequencerState> {
    private buttonPositions: Array<Array<Array<number>>>; // [x][y] = [1, 2, 3]

    constructor(props, context) {
        super(props, context);

        this.state = PolySequencerStore.getState();

        this.buttonPositions = [];

        for (let x = 0; x < this.state.width; x++) {
            let buttonPosCol = [];
            for (let y = 0; y < this.state.height; y++) {
                buttonPosCol.push([x * 0.45, y * 0.45, 0]);
            }
            this.buttonPositions.push(buttonPosCol);
        }
    }

    private toggleGridPos = (x, y) => {
        PolySequencerActions.togglePosition(x, y);
    };

    private onChange = state => {
        this.setState(state);
    };

    componentDidMount() {
        PolySequencerStore.listen(this.onChange);
    }

    componentWillUnmount() {
        PolySequencerStore.unlisten(this.onChange);
    }

    render() {
        let buttons = [];

        for (let x = 0; x < this.state.width; x++) {
            for (let y = 0; y < this.state.height; y++) {
                let key = x.toString() + ',' + y.toString();
                let buttonPos = this.buttonPositions[x][y];
                let state = this.state.positions[x][y];

                buttons.push(<GridButton
                    key={key}
                    position={buttonPos}
                    onToggle={this.toggleGridPos}
                    state={state}
                    x={x}
                    y={y}/>);
            }
        }

        const padding = ((this.state.height - 0.01) * 0.05);
        const playheadHeight = (this.state.height * 0.40) + padding;
        const playheadPosition = [this.state.playhead * 0.45, playheadHeight / 2 - padding, -0.01];

        return (
            <Entity position={this.props.position} rotation={this.props.rotation}>

                {buttons}

                <Entity position={playheadPosition}
                        geometry={{ primitive: 'box', width: 0.5, height: playheadHeight, depth: 0.1 }}
                        material="color: #ef6068"/>

            </Entity>
        );
    }
}
