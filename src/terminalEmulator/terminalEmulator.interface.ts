import {BaseExecutor} from './executors/baseExecutor';

export interface IState {
    history: string[];
    prompt: string;
}

export interface IProps {
    prompt: string;
}

export type SetState = (state: (prevState: IState, props: IProps) => IState, callback?: () => void) => void;

export interface ICommandExecutor {
    executors: BaseExecutor[];
}
