


import { food } from "./food";
import { score } from "./score";
import { snake } from "./snake";

import { throttle } from "@utils/utils";
/**
 * 综合类
 */
export class esurientSnake {
  // 计时器
  Timer: any
  snake: snake;
  food: food;
  score: score;
  artBoard: HTMLElement;// 画板载体
  // direction?: "X" | "Y"; // 方向 鼠标用
  direction?: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"; // 记录当前方向 键盘用
  static lastDivStyle = {
    top: 0,
    left: 0,

  }; //追加的div的位置
  isPause?: boolean;
  constructor() {
    this.artBoard = document.getElementById("artboard")!;
    this.food = new food(this.artBoard.clientWidth, this.artBoard.clientHeight);
    this.snake = new snake();
    this.score = new score();
  }

  /**
   * 鼠标用
   * 判断蛇在横向移动还是纵向移动
   * 并修改蛇前进方向
   */
  // snakeMove(mouseX: number, mouseY: number) {
  //   let moveStatus: { moveX?: number, moveY?: number } = {};
  //   if (this.direction === "X") {
  //     if (mouseY != this.snake.getY()) {
  //       this.direction = "Y"
  //       if (mouseY > this.snake.getY()) {
  //         moveStatus.moveY = 10
  //       } else {
  //         moveStatus.moveY = -10
  //       }
  //     }
  //   } else {
  //     if (mouseX != this.snake.getX()) {
  //       this.direction = "X"
  //       if (mouseX > this.snake.getX()) {
  //         moveStatus.moveX = 10
  //       } else {
  //         moveStatus.moveX = -10
  //       }
  //     }
  //   }
  //   console.log(mouseX, mouseY, moveStatus, 999999999);
  //   clearInterval(Number(this.Timer));
  //   this.Timer = setInterval(() => {
  //     this.snake.move(moveStatus);
  //   }, 200);
  // }
  /**
   * 判断蛇在横向移动还是纵向移动
   * 并修改蛇前进方向
   */
  snakeMove(direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight") {
    let moveStatus: { moveX?: number, moveY?: number } = {};
    if ((this.direction === "ArrowUp" && direction === "ArrowDown") || (this.direction === "ArrowDown" && direction === "ArrowUp") || (this.direction === "ArrowLeft" && direction === "ArrowRight") || (this.direction === "ArrowRight" && direction === "ArrowLeft")) {
      console.error("不可回头")
      return true;
    }
    else {
      this.direction = direction;
      switch (this.direction) {
        case "ArrowUp":
          moveStatus.moveY = -10;
          esurientSnake.lastDivStyle.left = 0;
          esurientSnake.lastDivStyle.top = 10;
          break;
        case "ArrowDown":
          moveStatus.moveY = 10;
          esurientSnake.lastDivStyle.left = 0;
          esurientSnake.lastDivStyle.top = -10;
          break;
        case "ArrowLeft":
          moveStatus.moveX = -10;
          esurientSnake.lastDivStyle.left = 10;
          esurientSnake.lastDivStyle.top = 0;
          break;
        case "ArrowRight":
          moveStatus.moveX = 10;
          esurientSnake.lastDivStyle.left = -10;
          esurientSnake.lastDivStyle.top = 0;
          break;
      }
      /**
     * 非反方向移动时进行操作
     */
      clearInterval(Number(this.Timer));
      this.Timer = setInterval(() => {
        this.snake.move(moveStatus);
        this.snakeEatFood();
        this.getSnakeStatus();
      }, 200);
    }
  }

  /**
   * 蛇吃食物
   */
  snakeEatFood() {
    if (this.snake.getX() === this.food.getX() && this.snake.getY() === this.food.getY()) {
      // 加分
      this.score.setScore(score.score + 10);
      // 刷新食物
      this.food.change();
      // 增加身体
      this.snake.snake.appendChild(document.createElement("div"));
      this.snake.bodies = document.querySelectorAll("#snake div");

      let prevLastDiv = this.snake.bodies[this.snake.bodies.length - 2];
      let lastDiv = this.snake.bodies[this.snake.bodies.length - 1];

      lastDiv.style.top = `${prevLastDiv.offsetTop + esurientSnake.lastDivStyle.top}px`;
      lastDiv.style.left = `${prevLastDiv.offsetLeft + esurientSnake.lastDivStyle.left}px`;
    }
  }

  /**
   * 判断是否撞到自己
   * 判断是否撞墙
   *  @returns { boolean }
   */
  getSnakeStatus() {
    let isDie: boolean = false;

    this.snake.bodies.forEach((item, i) => {
      if (this.snake.nextHeadIndex != i) {
        if (this.snake.getX() === item.offsetLeft && this.snake.getY() === item.offsetTop) {
          isDie = true
        }
      }
    })
    // 是否撞到边界
    if (this.snake.getX() < 0 || this.snake.getX() > this.artBoard.clientWidth || this.snake.getY() < 0 || this.snake.getY() > this.artBoard.clientHeight) {
      isDie = true
    }
    if (isDie) {
      alert("蛇已死亡");
      this.reseteSurientSnake();
    }
  }
  /**
   * 重置贪吃蛇
   */
  reseteSurientSnake() {
    clearInterval(Number(this.Timer));
    this.snake.snake.innerHTML = "<div></div><div></div><div></div><div></div>";
    this.snake.head = document.querySelector("#snake > div")!;
    this.snake.bodies = document.querySelectorAll("#snake div");
    this.snake.headIndex = this.snake.bodies.length - 1;
    this.food.change();
    this.score.setScore(0);
  }
}
// 实例化贪吃蛇对象
const snakeClass = new esurientSnake();
export function snakeInit() {
  /**
   * 监听键盘
   */
  document.addEventListener(
    "keydown",
    throttle((event: KeyboardEvent) => {
      if (snakeClass.isPause) {
        snakeClass.snakeMove(snakeClass.direction!);
      } else if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)
      ) {
        snakeClass.snakeMove(
          event.code as "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
        );
      }
    }, 200)
  );
  /**
   * 开始
   */
  document.getElementById("start")!.addEventListener(
    "click",
    throttle(() => {
      if (snakeClass.isPause) {
        snakeClass.snakeMove(snakeClass.direction!);
      } else {
        snakeClass.snakeMove("ArrowRight");
      }
    }, 200)
  );
  /**
   * 暂停
   */
  document.getElementById("pause")!.addEventListener(
    "click",
    throttle(() => {
      clearInterval(Number(snakeClass.Timer));
      snakeClass.isPause = true;
    }, 200)
  );
  /**
   * 停止
   */
  document.getElementById("stop")!.addEventListener(
    "click",
    throttle(() => {
      snakeClass.reseteSurientSnake();
    }, 200)
  );
}
snakeInit();


