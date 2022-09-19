/**
 * 定义食物
 * 获取食物横坐标，纵坐标，被吃掉时刷新功能
 */
export class food {
  elem: HTMLElement
  constructor() {
    this.elem = document.getElementById("food")!
  }
  getX() {
    return this.elem.offsetLeft
  }
  getY() {
    return this.elem.offsetTop
  }
  change() {
    this.elem.style.top = 0 + "px"
    this.elem.style.left = 0 + "px"
  }
}

export class snake {
  Timer: NodeJS.Timer | undefined
  //获取蛇的元素
  snake: HTMLElement;
  //表示蛇头的元素
  head: HTMLElement;
  //蛇的身体（包括蛇头）
  /**
   * HTMLCollection:HTML 元素的集合。
   * getElementsByTagName() 方法返回的就是一个 HTMLCollection 对象。
   */
  bodies: NodeListOf<HTMLDivElement>;
  direction: "top" | "left";
  constructor() {
    this.snake = document.getElementById("snake")!
    this.head = document.querySelector("#snake > div")!
    this.bodies = document.querySelectorAll("#snake div")
    this.move({ moveX: 10 });
    this.direction = "left"
  }
  getX(): number {
    return this.head.offsetLeft
  }
  getY(): number {
    return this.head.offsetTop
  }
  getDirection() {
    return this.direction
  }
  setDirection(val: "top" | "left") {
    this.direction = val;
  }
  /**
   * 蛇移动，根据传入的方向修改方位
   * @param data 
   */
  move(data: { moveX?: number, moveY?: number }) {
    // 调用移动前先清除定时器，防止叠加
    clearInterval(Number(this.Timer));
    this.Timer = setInterval(() => {
      // 蛇头位置
      let snakeHeadX = this.getX();
      let snakeHeadY = this.getY();
      // 蛇尾元素
      let lastDiv: HTMLElement = this.bodies[this.bodies.length - 1];
      /**
       * 蛇尾移动到蛇头
       */
      if (data.moveX != undefined) {
        lastDiv.style.left = `${snakeHeadX + data.moveX}px`;
      }
      if (data.moveY != undefined) {
        lastDiv.style.top = `${snakeHeadY + data.moveY}px`;
      }
    }, 500)
  }
}
