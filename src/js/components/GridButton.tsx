import * as React from 'react';

import ToggleButton from './ToggleButton';

interface Props {
    onToggle: (x, y) => void;
    position: Array<number>;
    state: boolean;
    x: number;
    y: number;
}

export default class GridButton extends React.Component<Props, void> {
    handleToggle = () => {
        this.props.onToggle(this.props.x, this.props.y);
    };

    render() {
        return <ToggleButton
            position={this.props.position}
            onToggle={this.handleToggle}
            state={this.props.state} />;
    }
}
