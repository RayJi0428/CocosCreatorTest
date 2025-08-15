import { _decorator, Component, Node, tween, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LabubiTest')
export class LabubiTest extends Component {

    private mask: Node;
    private role: Node;
    private root: Node;
    private frame: Node;

    onLoad() {
        this.root = this.node.getChildByPath("Root");
        this.mask = this.node.getChildByPath("Root/Mask");
        this.role = this.node.getChildByPath("Root/Mask/Role");
        this.frame = this.node.getChildByPath("Root/Frame");
    }

    update(deltaTime: number) {

    }

    public test1X(): void {
        tween(this.root)
            .to(0.5, { scale: new Vec3(1, 1, 1) })
            .start();
        tween(this.frame)
            .to(0.5, { scale: new Vec3(1, 1, 1) })
            .start();
        tween(this.mask.getComponent(UITransform))
            .to(0.5, { width: 140, height: 140 })
            .start();
    }

    public test2X(): void {
        tween(this.root)
            .to(0.5, { scale: new Vec3(2, 2, 1) })
            .start();
        tween(this.frame)
            .to(0.5, { scale: new Vec3(1, 1, 1) })
            .start();
        tween(this.mask.getComponent(UITransform))
            .to(0.5, { width: 140, height: 140 })
            .start();
    }

    public test3X(): void {
        tween(this.root)
            .to(0.5, { scale: new Vec3(2, 2, 1) })
            .start();
        tween(this.frame)
            .to(0.5, { scale: new Vec3(1, 2, 1) })
            .start();

        tween(this.mask.getComponent(UITransform))
            .to(0.5, { width: 140, height: 280 })
            .start();


    }
}

