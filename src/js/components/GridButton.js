import React from 'react';
import {Animation, Entity, Scene} from 'aframe-react';
//import PureRenderMixin from 'react-addons-pure-render-mixin';

import ToggleButton from './ToggleButton';

export default class GridButton extends React.Component {
    constructor(props) {
        super(props);

        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

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

GridButton.propTypes = {
    position: React.PropTypes.array.isRequired,
    state: React.PropTypes.bool,
    onToggle: React.PropTypes.func.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
};
