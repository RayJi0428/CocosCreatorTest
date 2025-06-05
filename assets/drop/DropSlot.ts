import { _decorator, Component, easing, Tween, tween, Vec3 } from 'cc';
import { BaseSlotParser } from './BaseSlotParser';
import { BaseSymbol } from './BaseSymbol';
const { ccclass, property } = _decorator;

@ccclass('DropSlot')
export class DropSlot extends Component {

    @property
    public numColumn: number = 0;

    @property
    public numRow: number = 0;

    @property({ tooltip: "掉出時間", group: "掉出" })
    public outDuration: number = 0.18;

    @property({ tooltip: "掉出移動距離", group: "掉出" })
    public outDistance: number = 600;

    @property({ tooltip: "列間隔", group: "掉出" })
    public outRowDelay: number = 0;

    @property({ tooltip: "軸間隔", group: "掉出" })
    public outColumnDelay: number = 0;

    //---------------------------- 
    @property({ tooltip: "掉入時間", group: "掉入" })
    public inDuration: number = 0.18;

    @property({ tooltip: "掉入移動距離", group: "掉入" })
    public inDistance: number = 600;

    @property({ tooltip: "列間隔", group: "掉入" })
    public inRowDelay: number = 0.05;

    @property({ tooltip: "軸間隔", group: "掉入" })
    public inColumnDelay: number = 0.05;

    /**圖示map */
    private symbolMap: BaseSymbol[][] = [];

    /**座標map */
    private coordinateMap: Vec3[][] = [];

    /**遊戲分析器 */
    private parser: BaseSlotParser;

    /**
     * 
     */
    onLoad() {

        for (let col: number = 0; col < this.numColumn; ++col) {
            this.symbolMap[col] = [];
            this.coordinateMap[col] = [];
            for (let row: number = 0; row < this.numRow; ++row) {
                let idx: number = col * this.numRow + row;
                let symbol = this.node.getChildByPath(`Layout/Symbol_${idx}`).getComponent(BaseSymbol);
                this.symbolMap[col][row] = symbol;
                this.coordinateMap[col][row] = symbol.node.getPosition();
            }
        }
    }

    update(deltaTime: number) {

    }

    public init(parser: BaseSlotParser): void {
        this.parser = parser;
        this.parser.numColumn = this.numColumn;
        this.parser.numRow = this.numRow;
    }
    /**
     * 掉落出畫面(依序由左至右, 由下至上)
     */
    public dropOut(complete?: () => void): void {
        let count: number = this.numColumn * this.numRow;
        for (let col: number = 0; col < this.numColumn; ++col) {
            for (let row: number = this.numRow - 1; row > -1; --row) {
                let symbol = this.symbolMap[col][row];
                let coordinate = this.coordinateMap[col][row];
                Tween.stopAllByTarget(symbol.node);
                tween(symbol.node)
                    .delay(this.outColumnDelay * col)
                    .delay(this.outRowDelay * (this.numRow - row))
                    .to(this.outDuration, { position: new Vec3(coordinate.x, coordinate.y - this.outDistance, 0) })
                    .call(() => {
                        count--;
                        if (count <= 0) {
                            complete?.();
                        }
                    })
                    .start();
            }
        }
    }

    /**
    * 掉落進畫面(依序由左至右, 由下至上)
    */
    public dropIn(complete?: () => void): void {

        let miPos = this.parser.getStartMiGrid();
        console.log(miPos);

        let count: number = this.numColumn * this.numRow;
        for (let col: number = 0; col < this.numColumn; ++col) {
            for (let row: number = this.numRow - 1; row > -1; --row) {
                let symbol = this.symbolMap[col][row];
                let coordinate = this.coordinateMap[col][row];
                symbol.node.setPosition(new Vec3(coordinate.x, coordinate.y + this.inDistance, 0));
                Tween.stopAllByTarget(symbol.node);
                tween(symbol.node)
                    .delay(this.inColumnDelay * col)
                    .delay(this.inRowDelay * (this.numRow - row))
                    .to(this.inDuration, { position: coordinate }, { easing: easing.linear })
                    .call(() => {
                        count--;
                        if (count <= 0) {
                            complete?.();
                        }
                    })
                    .start();
            }
        }
    }

    /**
     * 
     */
    public reset(): void {
        for (let col: number = 0; col < this.numColumn; ++col) {
            for (let row: number = this.numRow - 1; row > -1; --row) {
                let symbol = this.symbolMap[col][row];
                let coordinate = this.coordinateMap[col][row];
                Tween.stopAllByTarget(symbol.node);
                symbol.node.setPosition(coordinate);
            }
        }
    }

    /**
     * 設定圖示ID(依序由左至右, 由上至下)
     * @param map 
     */
    public setSymbolMap(map: number[]): void {
        this.parser.map = map;

        for (let col: number = 0; col < this.numColumn; ++col) {
            for (let row: number = 0; row < this.numRow; ++row) {
                let mapIdx = this.numColumn * row + col;
                this.symbolMap[col][row].setSymbol(map[mapIdx]);
            }
        }
    }
}

