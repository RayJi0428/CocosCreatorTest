import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseSlotParser')
export abstract class BaseSlotParser {

    public numColumn: number = 5;
    public numRow: number = 5;
    public map: number[] = [];
    start() {

    }

    update(deltaTime: number) {

    }

    abstract getStartMiGrid(): { col: number, row: number };
}

