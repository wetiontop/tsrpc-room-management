
import { _decorator, Component, Node, EditBox } from 'cc';
import { NetUtil } from '../../scripts/models/NetUtil';
const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export class LoginScene extends Component {
    @property(EditBox)
    edtAccount?: EditBox;

    @property(EditBox)
    edtPassword?: EditBox;

    onClickLogin() {
        let account = this.edtAccount?.string || '';
        let password = this.edtPassword?.string || '';

        NetUtil.authClient.callApi('Login', { account, password });
    }

    onClickRegister() {
        let account = this.edtAccount?.string || '';
        let password = this.edtPassword?.string || '';

        NetUtil.authClient.callApi('Register', { account, password });
    }
}