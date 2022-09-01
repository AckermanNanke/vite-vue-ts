<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  captchaType: "dot" | "line"; //类型
  captchaCode: string; //验证码
  width: number; //宽度
  height: number; //高度
  colorMax: number; //随即背景色最大值
  colorMin: number; //随即背景色最大值
  backgroundMax: number; //随即背景色最小值
  backgroundMin: number; //随即背景色最大值
  disturbColorMax: number; //干扰线色最小值
  disturbColorMin: number; //干扰线色最大值
}>();

const startX = ref(0)//起始X位置
const startY = ref(0)//起始Y位置
const fontSizeMax = ref(props.height - 2)//字号最大值
const fontSizeMin = ref(props.height - 6)//字号最小值
/**
 * 绘制图形验证码
 */
function drawCaptcha() {
  let captchaCanvas = document.getElementById("captcha-canvas") as HTMLCanvasElement;
  console.log(captchaCanvas);
  let ctx = captchaCanvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.textBaseline = "bottom"; //下划线
  ctx.fillStyle = randomColor(props.backgroundMin, props.backgroundMax); //背景色
  ctx.fillRect(startX.value, startY.value, props.width, props.height); //绘制大小，X起点，Y起点，X终点，Y终点
  ctx.strokeRect(startX.value, startY.value, props.width, props.height); //绘制边框，X起点，Y起点，X终点，Y终点

  // 绘制文字
  for (let i = 0; i < props.captchaCode.length; i++) {
    drawText(ctx, props.captchaCode[i], i);
  }

  // 绘制干扰区域
  // 点状干扰
  if (props.captchaType === "dot") {
    drawDot(ctx);
    // 线状干扰
    drawLine(ctx);
  }
}

/**
 * 绘制文字
 * @param { CanvasRenderingContext2D } ctx
 */
function drawText(
  ctx: CanvasRenderingContext2D,
  word: string,
  i: number
): void {
  // ctx.fillStyle = "#000000"; //字体色
  ctx.fillStyle = randomColor(props.backgroundMin, props.backgroundMax); //背景色
  ctx.font = `${randomData(fontSizeMax.value, fontSizeMin.value)}px SimHei`; //字体大小
  ctx.textBaseline = "alphabetic"; //基线对齐
  let x = i * (props.width / props.captchaCode.length);
  let y = randomData(props.height - 8, props.height - 16);
  let deg = randomData(-45, 45);
  ctx.save();//保存画布
  ctx.translate(x, y); //移动不同位置  参数偏移量
  ctx.rotate((deg * Math.PI) / 180); //旋转 参数角度
  ctx.fillText(word, 0, 0); //绘制文字
  ctx.restore();//恢复画布
}

/**
 * 绘制干扰线
 * @param ctx
 */
function drawLine(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 8; i++) {
    ctx.strokeStyle = randomColor(props.disturbColorMin, props.disturbColorMax); // 随机颜色
    ctx.beginPath(); //新建一条路径
    ctx.moveTo(randomData(0, props.width), randomData(0, props.height)); //设置起点x,y
    ctx.lineTo(randomData(0, props.width), randomData(0, props.height)); //绘制直线 x,y 一条当前位置到x,y点的直线
    ctx.stroke(); // 通过线条绘制图形轮廓
    // ctx.closePath() //结束闭合路径
  }
}

/**
 * 绘制干扰点
 * @param ctx
 */
function drawDot(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(
      randomData(0, props.width),
      randomData(0, props.height),
      1,
      0,
      2 * Math.PI
    ); // 绘制圆弧或圆 x,y 圆心点，radius 半径，从startAngle开始到endAngle结束
    ctx.fill(); //通过填充路径的内容区域生成实心的图形。
  }
}

/**
 *
 *  随机范围内的数据
 * @param max
 * @param min
 */
function randomData(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 获取随机颜色
 * @param max
 * @param min
 * @param Alpha
 * @return { String }
 */
function randomColor(max: number, min: number, Alpha?: number): string {
  let r = randomData(max, min);
  let g = randomData(max, min);
  let b = randomData(max, min);
  return `rgba(${r},${g},${b},${Alpha || 1})`;
}

onMounted(() => {
  drawCaptcha()
})
</script>

<template>
  <canvas id="captcha-canvas" :width="width" :height="height"></canvas>
</template>
