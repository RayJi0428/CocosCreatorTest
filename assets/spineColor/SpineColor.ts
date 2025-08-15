import { _decorator, Component, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineColor')
export class SpineColor extends Component {

    private spine: sp.Skeleton;
    start() {
        this.spine = this.node.getChildByName("fs_top").getComponent(sp.Skeleton);
        let a = this.spine.findSlot("body").color;
        console.log(a);
        this.spine.findSlot("body").color = new sp.spine.Color(1, 0.2, 0.2, 1);
        // this.spine.findSlot("body").darkColor = new sp.spine.Color(1, 1, 1, 1);
        this.spine.findSlot("copyMulHeadxxxx").color = new sp.spine.Color(1, 0.2, 0.2, 1);
        this.spine.findSlot("changeBD").color = new sp.spine.Color(1, 0.2, 0.2, 1);
    }

    update(deltaTime: number) {

    }
}

