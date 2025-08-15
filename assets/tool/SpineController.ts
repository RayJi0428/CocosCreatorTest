import { _decorator, Button, Component, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineController')
export class SpineController extends Component {


    @property private animationName: string = "";
    @property private loop: boolean = false;

    @property({ type: Button })
    private btn: Button = null;

    start() {
        this.btn.node.on(Button.EventType.CLICK, () => {
            this.node.getComponent(sp.Skeleton).setAnimation(0, this.animationName, this.loop);
        })
    }

    update(deltaTime: number) {

    }
}

