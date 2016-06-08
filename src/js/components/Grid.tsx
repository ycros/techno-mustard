import * as React from 'react';
import {Animation, Entity, Scene} from 'aframe-react';

import { SequencerStore, SequencerState } from '../stores/SequencerStore';
import SequencerActions from '../actions/SequencerActions';

import GridButton from './GridButton';
import ToggleButton from './ToggleButton';

interface Props {
    position: string,
    rotation: string,
    // onGridChange: () => void
}

export default class Grid extends React.Component<Props, SequencerState> {
    private buttonPositions: Array<Array<Array<number>>>; // [x][y] = [1, 2, 3] 

    constructor(props, context) {
        super(props, context);

        this.state = SequencerStore.getState();

        this.buttonPositions = [];

        for (let x = 0; x < this.state.width; x++) {
            let buttonPosCol = [];
            for (let y = 0; y < this.state.height; y++) {
                buttonPosCol.push([x * 0.45, y * 0.45, 0]);
            }
            this.buttonPositions.push(buttonPosCol);
        }
    }

    _toggleGridPos = (x, y) => {
        SequencerActions.togglePosition(x, y);
    };

    _onChange = state => {
        this.setState(state);
    };

    _handleDrumToggle = () => {
        SequencerActions.toggleDrums();
    };

    componentDidMount() {
        SequencerStore.listen(this._onChange);
    }

    componentWillUnmount() {
        SequencerStore.unlisten(this._onChange);
    }

    render() {
        var buttons = [];

        for (let x = 0; x < this.state.width; x++) {
            for (let y = 0; y < this.state.height; y++) {
                let key = x.toString() + ',' + y.toString();
                let buttonPos = this.buttonPositions[x][y];
                let state = this.state.positions[x][y];

                buttons.push(<GridButton
                    key={key}
                    position={buttonPos}
                    onToggle={this._toggleGridPos}
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

                <ToggleButton position={[((this.state.width + 1)*0.45), 0, 0]} state={this.state.drums} onToggle={this._handleDrumToggle} />

            </Entity>
        );
    }
}

// Grid.propTypes = {
// position: React.PropTypes.string.isRequired,
// rotation: React.PropTypes.string.isRequired,
// onGridChange: React.PropTypes.func
// };
