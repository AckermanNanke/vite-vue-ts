/**
 * 定义食物
 * 获取食物横坐标，纵坐标，被吃掉时刷新功能
 */
class food {
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
    this.elem.style.top = (Math.floor(Math.random() * (this.boradX - 0)) + 0) + "px"
    this.elem.style.left = (Math.floor(Math.random() * (this.boradY - 0)) + 0) + "px"
  }
}

class snake {
  Timer: any
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
  // 画板载体
  artBoard: HTMLElement;
  // 食物
  food: food;
  // 蛇头递减数字
  headI: number;
  constructor() {
    this.snake = document.getElementById("snake")!
    this.bodies = document.querySelectorAll("#snake div")
    this.artBoard = document.getElementById("artboard")!;
    this.food = new food(this.artBoard.clientWidth, this.artBoard.clientHeight);
    this.headI = this.bodies.length - 1;
    this.head = this.bodies[this.headI];
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
   * @param data 
   */
  move(data: { moveX?: number, moveY?: number }) {
    // 调用移动前先清除定时器，防止叠加
    clearInterval(Number(this.Timer));
    this.Timer = setInterval(() => {
      /**
       * 蛇尾移动到蛇头
       */
      if (data.moveX != undefined) {
        this.bodies[this.headI].style.left = `${this.getX() + data.moveX}px`;
      }
      if (data.moveY != undefined) {
        this.bodies[this.headI].style.top = `${this.getY() + data.moveY}px`;
      }

      this.eatFood();
      this.bodies = document.querySelectorAll("#snake div")!;

      // this.getSnakeStatus();

      // 蛇头下标重置
      if (this.headI <= 0) {
        this.headI = this.bodies.length - 1;
      } else {
        this.headI -= 1;
      }
    }, 300)
  }

  /**
 * 判断是否撞到自己
 * 判断是否撞墙
 *  @returns { boolean }
 */
  getSnakeStatus() {
    let isDie: boolean = false;
    // 是否撞到自己
    if (this.bodies.length > 1) {
      this.bodies.forEach((item, index) => {
        if (this.headI != index) {
          if (this.getX() === item.offsetLeft && this.getY() === item.offsetTop) {
            isDie = true
          }
        }
      })
    }
    // 是否撞到边界
    if (this.getX() < 10 || this.getX() > this.artBoard.clientWidth - 10 || this.getY() < 10 || this.getY() > this.artBoard.clientHeight - 10) {
      isDie = true
    }
    if (isDie) {
      alert("蛇已死亡");
      clearInterval(Number(this.Timer));
    }
  }
  /**
   * 判断是否吃到食物
   */
  eatFood() {
    if (this.getX() === this.food.getX() && this.getY() === this.food.getY()) {
      document.getElementById("snake")?.appendChild(document.createElement("div"));
      this.food.change();
    }
  }
}
/**
 * 综合类
 */
export class esurientSnake {
  snake: snake;
  direction: "X" | "Y"; // 方向
  constructor() {
    this.snake = new snake();
    this.snake.move({ moveX: 10 });
    this.direction = "X";
  }

  /**
   * 判断蛇在横向移动还是纵向移动
   * 并修改蛇前进方向
   */
  snakeMove(mouseX: number, mouseY: number) {
    if (this.direction === "X") {
      if (mouseY != this.snake.getY()) {
        this.direction = "Y"
        if (mouseY > this.snake.getY()) {
          this.snake.move({ moveY: 10 });
        } else {
          this.snake.move({ moveY: -10 });
        }
      }
    } else {
      if (mouseX != this.snake.getX()) {
        this.direction = "X"
        if (mouseX > this.snake.getX()) {
          this.snake.move({ moveX: 10 });
        } else {
          this.snake.move({ moveX: -10 });
        }
      }
    }
  }
}