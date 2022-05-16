
import { Camera, Component, Label, Node, tween, TweenSystem, UITransform, Vec3, view, _decorator } from 'cc';
import { MathUtil } from '../../../../scripts/models/MathUtil';
const { ccclass, property } = _decorator;

const v3_1 = new Vec3;

export interface PlayerNameOptions {
    namePosNode: Node,
    camera3D: Camera,
    nickname: string
}

@ccclass('PlayerName')
export class PlayerName extends Component {

    @property(Node)
    chatMsg!: Node;
    @property(Label)
    labelChatMsg!: Label;

    private _options!: PlayerNameOptions;
    public get options(): PlayerNameOptions {
        return this._options;
    }
    public set options(v: PlayerNameOptions) {
        this._options = v;

        this.getComponent(Label)!.string = v.nickname;
    }

    update() {
        this._options.camera3D.convertToUINode(this._options.namePosNode.worldPosition, this.node.parent!, v3_1);
        const visibleSize = view.getVisibleSize();
        const isOffscreen = v3_1.x < -visibleSize.width * 0.5 || v3_1.x > visibleSize.width * 0.5 || v3_1.y < -visibleSize.height * 0.5 + 123;
        v3_1.x = MathUtil.limit(v3_1.x, -visibleSize.width * 0.5 + 30, visibleSize.width * 0.5 - 30);
        v3_1.y = MathUtil.limit(v3_1.y, -visibleSize.height * 0.5 + 130, visibleSize.height * 0.5);
        this.node.setPosition(v3_1);

        Vec3.transformMat4(v3_1, this._options.namePosNode.worldPosition, this._options.camera3D.camera.matView);
        const ratio = isOffscreen ? 0.8 : MathUtil.limit(10 / Math.abs(v3_1.z) + 0.5, 0.5, 1.2);
        this.node.setScale(ratio, ratio, 1);
    }

    showChatMsg(content: string) {
        this.labelChatMsg.string = content;
        this.chatMsg.active = true;
        this.chatMsg.setScale(0, 0, 0);
        this.chatMsg.setPosition(0, this.node.getComponent(UITransform)!.height + 10, 0);

        // 10 秒后消失
        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.chatMsg);
        tween(this.chatMsg).to(0.2, { scale: Vec3.ONE }, { easing: 'backOut' })
            .delay(10).to(0.2, { scale: Vec3.ZERO }, { easing: 'backIn' }).call(() => {
                this.chatMsg.active = false
            }).start();
    }

}