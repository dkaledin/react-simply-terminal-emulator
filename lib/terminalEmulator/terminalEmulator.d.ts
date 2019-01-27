import { BaseExecutor } from './executors/baseExecutor';
import { ICommandExecutor, SetState } from './terminalEmulator.interface';
export declare class TerminalEmulator {
    private command;
    private readonly executors;
    private currentExecutor;
    constructor(params: ICommandExecutor);
    addExecutor(executor: BaseExecutor): void;
    execute(command: string, setState: SetState): void;
    private errorExecutor;
}
export declare const terminalEmulator: TerminalEmulator;
