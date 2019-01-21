import { SetState } from '../terminalEmulator.interface';
import { BaseExecutor } from './baseExecutor';
export declare class HelpExecutor extends BaseExecutor {
    constructor();
    execute(command: string, setState: SetState): void;
    isCompleted(): boolean;
}
