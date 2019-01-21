import { SetState } from '../terminalEmulator.interface';
export declare abstract class BaseExecutor {
    protected commandPattern: RegExp;
    abstract execute(command: string, setState: SetState): void;
    checkCommand(command: string): boolean;
    abstract isCompleted(): boolean;
}
