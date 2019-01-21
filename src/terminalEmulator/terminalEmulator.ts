import {BaseExecutor} from './executors/baseExecutor';
import {ClearExecutor} from './executors/clearExecutor';
import {HelpExecutor} from './executors/helpExecutor';
import {ICommandExecutor, SetState} from './terminalEmulator.interface';

export class TerminalEmulator {
    private command: string;
    private readonly executors: BaseExecutor[];
    private ranExecutor: BaseExecutor;

    constructor(params: ICommandExecutor) {
        this.executors = params.executors;
    }

    public addExecutor(executor: BaseExecutor) {
        this.executors.push(executor);
    }

    public execute(command: string, setState: SetState): void {
        this.command = command.trim();

        if (this.ranExecutor && !this.ranExecutor.isCompleted()) {
            this.ranExecutor.execute(command, setState);
        } else {
            const matchedExecutor = this.executors.find(
                executor => executor.checkCommand(command));

            if (matchedExecutor) {
                this.ranExecutor = matchedExecutor;
                this.ranExecutor.execute(command, setState);
            } else if (command === '') {
                this.emptyExecutor(setState);
            } else {
                this.errorExecutor(setState);
            }
        }
    }

    private errorExecutor(setState: SetState): void {
        setState((state, props) => ({
            history: [
                ...state.history,
                `${props.prompt} ${this.command}`,
                `Terminal: Unknown command '${this.command}'`,
            ],
            prompt: props.prompt,
        }));
    }

    // TODO: Move this method to BaseExecutor
    private emptyExecutor(setState: SetState): void {
        setState((state, props) => ({
            history: [
                ...state.history,
                `${props.prompt} ${this.command}`,
            ],
            prompt: props.prompt,
        }));
    }
}

export const terminalEmulator = new TerminalEmulator({
    executors: [
        new ClearExecutor(),
        new HelpExecutor(),
    ],
});
