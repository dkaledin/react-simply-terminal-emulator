import {BaseExecutor} from './executors/baseExecutor';
import {ClearExecutor} from './executors/clearExecutor';
import {HelpExecutor} from './executors/helpExecutor';
import {ICommandExecutor, SetState} from './terminalEmulator.interface';

export class TerminalEmulator {
    private command: string;
    private readonly executors: BaseExecutor[];
    private currentExecutor: BaseExecutor;

    constructor(params: ICommandExecutor) {
        this.executors = params.executors;
    }

    public addExecutor(executor: BaseExecutor) {
        this.executors.push(executor);
    }

    public execute(command: string, setState: SetState): void {
        this.command = command.trim();

        if (this.currentExecutor && !this.currentExecutor.isCompleted()) {
            this.currentExecutor.execute(command, setState);
        } else {
            const matchedExecutor = this.executors.find(
                executor => executor.checkCommand(command));

            if (matchedExecutor) {
                this.currentExecutor = matchedExecutor;
                this.currentExecutor.init();
                this.currentExecutor.execute(command, setState);
            } else if (command !== '') {
                this.errorExecutor(setState);
            }
        }
    }

    private errorExecutor(setState: SetState): void {
        setState((state, props) => ({
            history: [
                ...state.history,
                `Terminal: Unknown command '${this.command}'`,
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
