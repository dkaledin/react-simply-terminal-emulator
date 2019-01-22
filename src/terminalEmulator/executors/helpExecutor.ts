import {SetState} from '../terminalEmulator.interface';
import {BaseExecutor} from './baseExecutor';

export class HelpExecutor extends BaseExecutor {
    constructor() {
        super();

        this.commandPattern = new RegExp('^help$', 'i');
    }

    public execute(command: string, setState: SetState): void {
        setState((prevState, props) => ({
            history: [
                ...prevState.history,
                'This is the Help program!',
            ],
            prompt: props.prompt,
        }));
    }

    public isCompleted(): boolean {
        return true;
    }
}
