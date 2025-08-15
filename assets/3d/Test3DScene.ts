import { _decorator, Animation, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Test3DScene')
export class Test3DScene extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    public test(): void {
        for (let i = 0; i < 3; ++i) {
            let target = this.node.getChildByPath("Dice3D/top_" + i);
            if (target.active == false) {
                continue;
            }
            let ani = target.getComponent(Animation);
            ani.once(Animation.EventType.FINISHED, () => {
                ani.stop();
            })
            ani.play(ani.clips[0].name);
            ani.getState(ani.clips[0].name).repeatCount = 1;
        }

        for (let i = 0; i < 3; ++i) {
            let target = this.node.getChildByPath("Dice3D/dice_" + i);
            if (target.active == false) {
                continue;
            }
            let ani = target.getComponent(Animation);
            ani.once(Animation.EventType.FINISHED, () => {
                ani.stop();
            })
            ani.play(ani.clips[0].name);
            ani.getState(ani.clips[0].name).repeatCount = 1;
        }
    }
}

