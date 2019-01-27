import {CSSProperties} from 'react';
import * as React from 'react';
import {CommandLine} from './commandLine/commandLine';
import {ITerminalStatelessProps} from './terminalStateless.interface';
import * as styles from './terminalStateless.style';

export class TerminalStateless extends React.Component<ITerminalStatelessProps> {
    private boxRef = React.createRef<HTMLDivElement>();

    public render() {
        const {history, prompt, onReceiveCommand, width, height} = this.props;
        const terminalBox: CSSProperties = {
            ...styles.terminalBox,
            width: width || styles.terminalBox.width,
            height: height || styles.terminalBox.height,
        };

        return (
            <div style={terminalBox} ref={this.boxRef}>
                <div style={styles.terminalContainer}>
                    {history.map((line, index) =>
                        <div key={index} style={styles.terminalContainerLine}>{line}</div>)}
                    <CommandLine onReceiveCommand={onReceiveCommand} prompt={prompt}/>
                </div>
            </div>
        );
    }

    public componentDidUpdate() {
        const box = this.boxRef.current!;
        box.scroll({
            top: box.scrollHeight,
        });
    }
}
