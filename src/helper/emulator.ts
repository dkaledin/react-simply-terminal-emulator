export interface ICommandExecutorFactoryParams {
    commandList: IEmulatorCommand;
}

export type StateUpdater = (state: ICommandExecutorState,
                            props: ICommandExecutorProps) => ICommandExecutorState;

export interface ICommandExecutorState {
    history: string[];
}

export interface ICommandExecutorProps {
    prompt: string;
}

export interface IEmulatorCommand {
    [key: string]: StateUpdater;
}

export type CommandExecutor = (command: string) => StateUpdater;

function CommandExecutorFactory(params: ICommandExecutorFactoryParams): CommandExecutor {
    return (rawCommand) => {
        const command = rawCommand.trim();

        if (command === '') {
            return (state, props) => ({
                history: [
                    ...state.history,
                    props.prompt,
                ],
            });
        }

        if (params.commandList[command]) {
            return params.commandList[command];
        }

        return (state, props) => ({
            history: [
                ...state.history,
                `${props.prompt} ${command}`,
                `Terminal Emulator: Unknown command '${command}'`,
            ],
        });
    };
}

const clear: StateUpdater = () => ({
    history: [],
});

const help: StateUpdater = (state, props) => ({
    history: [
        ...state.history,
        `${props.prompt} help`,
        `Hi, Man :) It's Simply Terminal Emulator Help`,
    ],
});

export const BasicEmulator = CommandExecutorFactory({
    commandList: {
        clear,
        help,
    },
});
