/**
 * 计分板
 */
export class score {
  static score: number;
  elemS: HTMLElement
  elemL: HTMLElement
  constructor() {
    score.score = 0;
    this.elemS = document.getElementById("score")!;
    this.elemL = document.getElementById("lv")!;
  }

  /**
   * 不支持使用set属性，只能调用方法
   * @param val es2015 
   */
  setScore(val: number) {
    score.score = val;
    this.elemS.innerText = String(score.score)
    this.elemL.innerText = String(score.score / 10);
  }
}