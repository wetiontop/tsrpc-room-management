
import { Camera, Color, Component, Node, SkeletalAnimation, SkinnedMeshRenderer, Vec3, view, _decorator } from 'cc';
import { MathUtil } from '../../../../scripts/models/MathUtil';
import { PlayerAniState } from '../../../../scripts/shared/types/RoomUserState';
const { ccclass, property } = _decorator;

const v3_1 = new Vec3;

@ccclass('Player')
export class Player extends Component {

    @property(SkeletalAnimation)
    ani!: SkeletalAnimation;
    @property(SkinnedMeshRenderer)
    mesh!: SkinnedMeshRenderer;
    @property(Node)
    namePos!: Node;

    private _aniState: PlayerAniState = 'idle';
    public get aniState(): PlayerAniState {
        return this._aniState;
    }
    public set aniState(v: PlayerAniState) {
        if (this._aniState === v) {
            return;
        }
        this._aniState = v;

        this.unscheduleAllCallbacks();
        this.ani.crossFade(v, 0.5);

        if (v === 'wave') {
            this.scheduleOnce(() => {
                this.aniState = 'idle';
            }, 4.73)
        }

        if (v === 'punch') {
            this.scheduleOnce(() => {
                this.aniState = 'idle';
            }, 2.27)
        }

        if (v === 'dance') {
            this.scheduleOnce(() => {
                this.aniState = 'idle';
            }, 12.37)
        }
    }

    public get color(): Color {
        return this.mesh.material!.getProperty('mainColor') as Color;
    }
    public set color(v: Color) {
        this.mesh.material!.setProperty('mainColor', v);
    }

}