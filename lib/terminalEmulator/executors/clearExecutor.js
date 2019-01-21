import * as tslib_1 from "tslib";
import { BaseExecutor } from './baseExecutor';
var ClearExecutor = /** @class */ (function (_super) {
    tslib_1.__extends(ClearExecutor, _super);
    function ClearExecutor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.commandPattern = new RegExp('^clear$', 'i');
        return _this;
    }
    ClearExecutor.prototype.execute = function (command, setState) {
        setState(function (prevState, props) {
            return {
                history: [],
                prompt: props.prompt,
            };
        });
    };
    ClearExecutor.prototype.isCompleted = function () {
        return true;
    };
    return ClearExecutor;
}(BaseExecutor));
export { ClearExecutor };
