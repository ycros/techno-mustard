import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';

export default class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        if (this.props.onToggle) {
            this.props.onToggle();
        }
    };

    render() {
        const resourceId = this.props.state ? '#toggleOnMap' : '#toggleOffMap';
        return (
            <Entity geometry="primitive: box; width: 0.4; height: 0.4; depth: 0.1" position={this.props.position}
                    material={{ src: resourceId }} onClick={this.handleClick}>
            </Entity>
        );
    }
}
ToggleButton.propTypes = {
    onToggle: React.PropTypes.func,
    position: React.PropTypes.array,
    state: React.PropTypes.bool
};
ToggleButton.defaultProps = {
    state: false,
    position: '0 0 0'
};
