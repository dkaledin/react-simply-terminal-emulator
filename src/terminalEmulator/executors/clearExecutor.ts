import {SetState} from '../terminalEmulator.interface';
import {BaseExecutor} from './baseExecutor';

export class ClearExecutor extends BaseExecutor {
    public readonly commandPattern = new RegExp('^clear$', 'i');

    public execute(command: string, setState: SetState): void {
        setState((prevState, props) => {
            return {
                history: [],
                prompt: props.prompt,
            };
        });
    }

    public isCompleted(): boolean {
        return true;
    }
}
