import { SetState } from '../terminalEmulator.interface';
export declare abstract class BaseExecutor {
    abstract execute(command: string, setState: SetState): void;
    checkCommand(command: string): boolean;
    init(): void;
    abstract isCompleted(): boolean;
    protected abstract getCommandPattern(): RegExp;
}
