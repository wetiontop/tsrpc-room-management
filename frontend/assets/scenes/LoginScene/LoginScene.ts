
import { _decorator, Component, Node, EditBox } from 'cc';
import { NetUtil } from '../../scripts/models/NetUtil';
const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export class LoginScene extends Component {
    @property(EditBox)
    edtAccount?: EditBox;

    @property(EditBox)
    edtPassword?: EditBox;

    async onClickLogin() {
        let account = this.edtAccount?.string || '';
        let password = this.edtPassword?.string || '';

        let ret = await NetUtil.authClient.callApi('Login', { account, password });
        if (ret.isSucc) {
            localStorage.setItem('token', ret.res.token);
        } else {
            console.log(ret.err);
        }
    }

    async onClickRegister() {
        let account = this.edtAccount?.string || '';
        let password = this.edtPassword?.string || '';

        let ret = await NetUtil.authClient.callApi('Register', { account, password });
        if (ret.isSucc) {
            localStorage.setItem('token', ret.res.token);
        } else {
            console.log(ret.err);
        }
    }
}