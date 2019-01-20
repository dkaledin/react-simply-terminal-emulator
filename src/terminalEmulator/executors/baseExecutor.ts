import {SetState} from '../terminalEmulator.interface';

export abstract class BaseExecutor {
    protected commandPattern: RegExp;

    public abstract execute(command: string, setState: SetState): void;

    public checkCommand(command: string): boolean {
        return this.commandPattern.test(command);
    }

    public abstract isCompleted(): boolean;
}
