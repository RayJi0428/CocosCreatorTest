import { _decorator, Component, easing, Tween, tween, Vec3 } from 'cc';
import { BaseSlotParser } from './BaseSlotParser';
import { BaseSymbol } from './BaseSymbol';
const { ccclass, property } = _decorator;

@ccclass('SpeedConfig')
export class SpeedConfig {

    @property({ tooltip: "掉出移動距離", group: "掉出" })
    public outDistance: number = 600;

    @property({ tooltip: "掉出時間", group: "掉出" })
    public outDuration: number = 0.18;

    @property({ tooltip: "列間隔", group: "掉出" })
    public outRowDelay: number = 0;

    @property({ tooltip: "軸間隔", group: "掉出" })
    public outColumnDelay: number = 0;

    @property({ tooltip: "掉入時間", group: "掉入" })
    public inDuration: number = 0.18;

    @property({ tooltip: "掉入移動距離", group: "掉入" })
    public inDistance: number = 600;

    @property({ tooltip: "列間隔", group: "掉入" })
    public inRowDelay: number = 0.05;

    @property({ tooltip: "軸間隔", group: "掉入" })
    public inColumnDelay: number = 0.05;
}

@ccclass('DropSlot')
export class DropSlot extends Component {

    @property
    public numColumn: number = 0;

    @property
    public numRow: number = 0;

    @property({ type: SpeedConfig, tooltip: "一般", group: "速度" })
    public normal: SpeedConfig = new SpeedConfig();

    @property({ type: SpeedConfig, tooltip: "閃電", group: "速度" })
    public speed: SpeedConfig = new SpeedConfig();

    @property({ type: SpeedConfig, tooltip: "Turbo", group: "速度" })
    public turbo: SpeedConfig = new SpeedConfig();

    private curConfig: SpeedConfig;

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

        this.curConfig = this.normal;
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
                    .delay(this.curConfig.outColumnDelay * col)
                    .delay(this.curConfig.outRowDelay * (this.numRow - row))
                    .to(this.curConfig.outDuration, { position: new Vec3(coordinate.x, coordinate.y - this.curConfig.outDistance, 0) })
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
                symbol.node.setPosition(new Vec3(coordinate.x, coordinate.y + this.curConfig.inDistance, 0));
                Tween.stopAllByTarget(symbol.node);
                tween(symbol.node)
                    .delay(this.curConfig.inColumnDelay * col)
                    .delay(this.curConfig.inRowDelay * (this.numRow - row))
                    .to(this.curConfig.inDuration, { position: coordinate }, { easing: easing.linear })
                    .call(() => {
                        count--;

                        //到達瞇牌位置
                        if (col == miPos.col && row == miPos.row) {
                        }

                        //全部掉落完成
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

