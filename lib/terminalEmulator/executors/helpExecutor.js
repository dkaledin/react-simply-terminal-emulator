import * as tslib_1 from "tslib";
import { BaseExecutor } from './baseExecutor';
var HelpExecutor = /** @class */ (function (_super) {
    tslib_1.__extends(HelpExecutor, _super);
    function HelpExecutor() {
        var _this = _super.call(this) || this;
        _this.commandPattern = new RegExp('^help$', 'i');
        return _this;
    }
    HelpExecutor.prototype.execute = function (command, setState) {
        setState(function (prevState, props) { return ({
            history: prevState.history.concat([
                'This is the Help program!',
            ]),
            prompt: props.prompt,
        }); });
    };
    HelpExecutor.prototype.isCompleted = function () {
        return true;
    };
    return HelpExecutor;
}(BaseExecutor));
export { HelpExecutor };
