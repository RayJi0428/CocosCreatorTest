import { _decorator, Component, randomRangeInt } from 'cc';
import { DropSlot } from './DropSlot';
import { SlotParser } from './SlotParser';
const { ccclass, property } = _decorator;

@ccclass('DropScene')
export class DropScene extends Component {

    private slot: DropSlot;
    start() {
        this.slot = this.node.getChildByPath("DropSlot").getComponent(DropSlot);
        this.slot.init(new SlotParser());
    }

    update(deltaTime: number) {

    }

    public spin(): void {
        this.slot.dropOut(() => {
            console.log("drop out complete.");
            let map: number[] = [];
            let len = this.slot.numColumn * this.slot.numRow;
            for (let i: number = 0; i < len; ++i) {
                map.push(randomRangeInt(0, 8));
            }
            this.slot.setSymbolMap(map);
            this.scheduleOnce(() => {
                this.slot.dropIn(() => {
                    console.log("drop in complete.");
                });
            }, 0);
        });
    }

    public reset(): void {
        this.slot.reset();
    }
}

