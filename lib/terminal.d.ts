/// <reference types="react" />
declare module "terminal.interface" {
    export interface ITerminalOwnProps {
        history: string[];
        onReceiveCommand?: (command: string) => void;
        prompt: string;
    }
    export interface ITerminalState {
        history: string[];
        prompt: string;
    }
}
declare module "components/commandLine/commandLine.interface" {
    export interface ICommandLineOwnProps {
        prompt: string;
        onReceiveCommand: (commandString: string) => void;
    }
    export interface ICommandLineState {
        commandString: string;
        caretPosition: number;
    }
}
declare module "components/commandLine/components/caret.interface" {
    export interface ICaretOwnProps {
        caretPosition: number;
        commandString: string;
    }
    export interface ICaretState {
        blinked: boolean;
    }
}
declare module "components/commandLine/components/caret" {
    import * as React from 'react';
    import { ICaretOwnProps, ICaretState } from "components/commandLine/components/caret.interface";
    import './caret.css';
    export class Caret extends React.Component<ICaretOwnProps, ICaretState> {
        state: ICaretState;
        private interval;
        render(): JSX.Element;
        componentDidMount(): void;
        componentWillUnmount(): void;
        private getCaretStyles;
    }
}
declare module "components/commandLine/commandLine" {
    import * as React from 'react';
    import { ICommandLineOwnProps, ICommandLineState } from "components/commandLine/commandLine.interface";
    import './commandLine.css';
    export class CommandLine extends React.Component<ICommandLineOwnProps, ICommandLineState> {
        state: ICommandLineState;
        private inputRef;
        private interval;
        private keyboardEvents;
        render(): JSX.Element;
        componentDidMount(): void;
        componentWillUnmount(): void;
        private handleInputChange;
        private handleSelect;
        private renderCommandLive;
        private updateCaretPosition;
        private handleEnterKeyPress;
    }
}
declare module "components/terminalStateless" {
    import './terminalStateless.css';
    export interface ITerminalStatelessProps {
        history: string[];
        prompt: string;
        onReceiveCommand: (command: string) => void;
    }
    export function TerminalStateless(props: ITerminalStatelessProps): JSX.Element;
}
declare module "terminalEmulator/terminalEmulator.interface" {
    import { BaseExecutor } from "terminalEmulator/executors/baseExecutor";
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
}
declare module "terminalEmulator/executors/baseExecutor" {
    import { SetState } from "terminalEmulator/terminalEmulator.interface";
    export abstract class BaseExecutor {
        protected commandPattern: RegExp;
        abstract execute(command: string, setState: SetState): void;
        checkCommand(command: string): boolean;
        abstract isCompleted(): boolean;
    }
}
declare module "terminalEmulator/executors/clearExecutor" {
    import { SetState } from "terminalEmulator/terminalEmulator.interface";
    import { BaseExecutor } from "terminalEmulator/executors/baseExecutor";
    export class ClearExecutor extends BaseExecutor {
        readonly commandPattern: RegExp;
        execute(command: string, setState: SetState): void;
        isCompleted(): boolean;
    }
}
declare module "terminalEmulator/executors/helpExecutor" {
    import { SetState } from "terminalEmulator/terminalEmulator.interface";
    import { BaseExecutor } from "terminalEmulator/executors/baseExecutor";
    export class HelpExecutor extends BaseExecutor {
        constructor();
        execute(command: string, setState: SetState): void;
        isCompleted(): boolean;
    }
}
declare module "terminalEmulator/terminalEmulator" {
    import { ICommandExecutor, SetState } from "terminalEmulator/terminalEmulator.interface";
    export class TerminalEmulator {
        private command;
        private readonly executors;
        private ranExecutor;
        constructor(params: ICommandExecutor);
        execute(command: string, setState: SetState): void;
        private errorExecutor;
        private emptyExecutor;
    }
    export const terminalEmulator: TerminalEmulator;
}
declare module "terminal" {
    import * as React from 'react';
    import { ITerminalOwnProps, ITerminalState } from "terminal.interface";
    export class Terminal extends React.Component<ITerminalOwnProps, ITerminalState> {
        static defaultProps: ITerminalOwnProps;
        state: ITerminalState;
        render(): JSX.Element;
        private handleReceiveCommand;
    }
}
declare module "terminalEmulator/__test__/TerminalEmulator.test" { }
