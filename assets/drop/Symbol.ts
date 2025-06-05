import { _decorator, randomRangeInt, Sprite, SpriteFrame } from 'cc';
import { BaseSymbol } from './BaseSymbol';
const { ccclass, property } = _decorator;

@ccclass('Symbol')
export class Symbol extends BaseSymbol {

    @property({ type: SpriteFrame, tooltip: "圖片" })
    public sprites: SpriteFrame[] = [];

    start() {
        this.setSymbol(randomRangeInt(0, this.sprites.length));
    }

    update(deltaTime: number) {

    }

    public setSymbol(idx: number): void {
        this.node.getComponent(Sprite).spriteFrame = this.sprites[idx];
    }
}

