import {SetState} from '../terminalEmulator.interface';
import {BaseExecutor} from './baseExecutor';

export class ClearExecutor extends BaseExecutor {
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

    protected getCommandPattern(): RegExp {
        return /^clear$/i;
    }
}
