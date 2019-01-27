import { SetState } from '../terminalEmulator.interface';
import { BaseExecutor } from './baseExecutor';
export declare class HelpExecutor extends BaseExecutor {
    execute(command: string, setState: SetState): void;
    isCompleted(): boolean;
    protected getCommandPattern(): RegExp;
}
