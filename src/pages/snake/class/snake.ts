
export class snake {
  // 计时器
  Timer: any
  //获取蛇的元素
  snake: HTMLElement;
  //表示蛇头的元素
  head: HTMLElement;
  // 蛇头递减下标
  headIndex: number;
  // 保存的当前蛇头的下标
  nextHeadIndex: number;
  // 蛇的身体（包括蛇头）
  bodies: NodeListOf<HTMLDivElement>;

  constructor() {
    this.snake = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div")!;
    this.bodies = document.querySelectorAll("#snake div");
    this.headIndex = this.bodies.length - 1;
    this.nextHeadIndex = this.bodies.length - 1;
  }

  // 获取蛇头X
  getX(): number {
    return this.head.offsetLeft
  }
  // 获取蛇头Y
  getY(): number {
    return this.head.offsetTop
  }

  /**
   * 蛇移动，根据传入的方向修改方位
   * @param { number } moveX  横向移动
   * @param { number } moveY 纵向移动
   */
  move(data: { moveX?: number, moveY?: number }) {
    /**
     * 蛇尾移动到蛇头
     * 移动后把移动的设为蛇头
     */
    if (data.moveX != undefined) {
      this.bodies[this.headIndex].style.top = `${this.getY()}px`
      this.bodies[this.headIndex].style.left = `${this.getX() + data.moveX}px`;
    }
    if (data.moveY != undefined) {
      this.bodies[this.headIndex].style.left = `${this.getX()}px`
      this.bodies[this.headIndex].style.top = `${this.getY() + data.moveY}px`;
    }
    // 重置蛇头指向
    this.head = this.bodies[this.headIndex];
    /**
     * 通过计时器遍历蛇头，当小于零时重置下标
     * 保留当前下标，遍历蛇身体检测是否撞到自己用
     */
    this.nextHeadIndex = this.headIndex;
    if (this.headIndex <= 0) {
      this.headIndex = this.bodies.length - 1;
    } else {
      this.headIndex -= 1
    }
  }
}