import * as React from 'react';
import {Animation, Entity, Scene} from 'aframe-react';

import GridButton from './GridButton';
import {SequencerState} from "../stores/SessionStore";
import {SessionActions} from "../actions/SessionActions";

interface Props {
    position: string;
    rotation: string;
    sequencerState: SequencerState;
}

export default class Grid extends React.Component<Props, {}> {
    private buttonPositions: Array<Array<Array<number>>>; // [x][y] = [1, 2, 3]

    static propTypes = {
        position: React.PropTypes.string.isRequired,
        rotation: React.PropTypes.string.isRequired,
        sequencerState: React.PropTypes.any.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.buttonPositions = [];

        for (let x = 0; x < this.props.sequencerState.width; x++) {
            let buttonPosCol = [];
            for (let y = 0; y < this.props.sequencerState.height; y++) {
                buttonPosCol.push([x * 0.45, y * 0.45, 0]);
            }
            this.buttonPositions.push(buttonPosCol);
        }
    }

    private toggleGridPos = (x, y) => {
        SessionActions.toggleSequencerPosition(this.props.sequencerState.id, x, y);
    };

    render() {
        let buttons = [];

        for (let x = 0; x < this.props.sequencerState.width; x++) {
            for (let y = 0; y < this.props.sequencerState.height; y++) {
                let key = x.toString() + ',' + y.toString();
                let buttonPos = this.buttonPositions[x][y];
                let state = this.props.sequencerState.grid[x][y];

                buttons.push(<GridButton
                    key={key}
                    position={buttonPos}
                    onToggle={this.toggleGridPos}
                    state={state}
                    x={x}
                    y={y}/>);
            }
        }

        const playheadHeight = (this.props.sequencerState.height * 0.45);
        const playheadPosition = [this.props.sequencerState.playhead * 0.45, (playheadHeight / 2) - (0.45/2), -0.01];

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
