import { Component, LabelComponent, SpriteComponent, tween, TweenSystem, UIOpacityComponent, _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Loading")
export class Loading extends Component {

    @property(SpriteComponent)
    mask: SpriteComponent = null as any;
    @property(LabelComponent)
    label: LabelComponent = null as any;

    onLoad() {
        (window as any).loading = this;
        this.label.node.active = false;
    }

    show(label?: string) {
        if (!this.node.active || this._isHiding) {
            this.node.active = true;
            this._isHiding = false;
            TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.node.getComponent(UIOpacityComponent) as any);
            tween(this.node.getComponent(UIOpacityComponent)!)
                .delay(1).to(0.2, { opacity: 255 }).start();
        }

        if (label) {
            this.label.node.active = true;
            this.label.string = label;
        }
        else {
            this.label.node.active = false;
        }
    }

    private _isHiding = false;
    hide() {
        if (this._isHiding || !this.node.active) {
            return;
        }
        this._isHiding = true;

        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.node.getComponent(UIOpacityComponent) as any);
        tween(this.node.getComponent(UIOpacityComponent)!).to(0.2, { opacity: 0 }).call(() => {
            this.node.active = false;
            this._isHiding = false;
        }).start();
    }

}
