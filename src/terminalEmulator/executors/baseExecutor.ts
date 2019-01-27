import {SetState} from '../terminalEmulator.interface';

export abstract class BaseExecutor {
    public abstract execute(command: string, setState: SetState): void;

    public checkCommand(command: string): boolean {
        const commandPattern = this.getCommandPattern();
        return commandPattern.test(command);
    }

    public init(): void {
        // it necessary for complicated command
    }

    public abstract isCompleted(): boolean;

    protected abstract getCommandPattern(): RegExp;
}
