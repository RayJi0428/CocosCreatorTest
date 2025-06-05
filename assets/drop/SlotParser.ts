import { _decorator } from 'cc';
import { BaseSlotParser } from './BaseSlotParser';
const { ccclass, property } = _decorator;

@ccclass('SlotParser')
export class SlotParser extends BaseSlotParser {

    private SCATTER: number = 7;

    start() {

    }

    update(deltaTime: number) {

    }

    public getStartMiGrid(): { col: number, row: number } {
        let miPos = null;
        let numScatter: number = 0;
        for (let col: number = 0; col < this.numColumn; ++col) {
            for (let row: number = 0; row < this.numRow; ++row) {
                let mapIdx = this.numColumn * row + col;
                if (this.map[mapIdx] == this.SCATTER) {
                    numScatter++;
                }
                if (numScatter >= 2) {
                    miPos = { col: col, row: row };
                    break;
                }
            }
        }
        return miPos;
    }
}

