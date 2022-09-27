/**
 * 定义食物
 * 获取食物横坐标，纵坐标，被吃掉时刷新功能
 */
export class food {
  boradX: number
  boradY: number
  elem: HTMLElement;

  constructor(x: number, y: number) {
    this.elem = document.getElementById("food")!;
    this.boradX = x;
    this.boradY = y;
  }

  getX() {
    return this.elem.offsetLeft
  }
  getY() {
    return this.elem.offsetTop
  }
  change() {
    this.elem.style.left = ((Math.floor(Math.random() * (Math.floor(this.boradX / 10)))) * 10) + "px";
    this.elem.style.top = ((Math.floor(Math.random() * (Math.floor(this.boradY / 10)))) * 10) + "px";
  }
}