import alt from '../alt';
import {AbstractStoreModel} from "./AbstractStoreModel";
import {SessionActions} from "../actions/SessionActions";
import {SequencerID} from "../types/SequencerID";
import {Socket, Channel} from "phoenix";
import {ChannelActions} from "../actions/ChannelActions";

interface ChannelState {

}



class ChannelStoreImpl extends AbstractStoreModel<ChannelState> implements ChannelState {
    private handleToggleSequencer;
    private handleTogglePosition;

    constructor() {
        super();

        // TODO: this needs to be prod/dev configurable
        const socket = new Socket('ws://gnaw.ycros.org:4501/socket');
        socket.connect();

        const channel = socket.channel('session:sync', {});

        channel.join()
            .receive('ok', response => console.log('connected to sync channel'))
            .receive('error', error => console.error('error connecting to sync channel', error));

        channel.on('state', state => {
            console.log("Received initial sequencer state.");
            ChannelActions.setState(state);
        });
        channel.on('set_position', setPos => {
            ChannelActions.setSequencerPosition(setPos.sequencer_id, setPos.position[0], setPos.position[1], setPos.value);
        });
        channel.on('set_active', setAct => {
            ChannelActions.setSequencerActive(setAct.sequencer_id, setAct.value);
        });

        this.handleToggleSequencer = (id: SequencerID) => {
            channel.push('toggle_sequencer', {sequencer_id: id})
                .receive('error', error => console.error('error sending toggle_sequencer', error))
                .receive('timeout', () => console.error('timeout sending toggle_sequencer'));
        };

        this.handleTogglePosition = ({id, x, y}) => {
            channel.push('toggle_sequencer_position', {sequencer_id: id, position: [x, y]})
                .receive('error', error => console.error('error sending toggle_sequencer_position', error))
                .receive('timeout', () => console.error('timeout sending toggle_sequencer_position'));

        };

        this.bindListeners({
            handleToggleSequencer: SessionActions.toggleSequencer,
            handleTogglePosition: SessionActions.toggleSequencerPosition
        });
    }
}

export const ChannelStore = alt.createStore<ChannelState>(ChannelStoreImpl, 'ChannelStore');
