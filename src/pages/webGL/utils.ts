/**
 * 创建着色器方法
 * @param gl  WebGLRenderingContext实例
 * @param type  着色器类型
 * @param source  数据源
 */
const createShader = (
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string
): WebGLShader | null => {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

/**
 * 创建着着色程序，将着色器链接到此程序
 * @param gl  WebGLRenderingContext实例
 * @param vertexShader  顶点着色器
 * @param fragmentShader  片段着色器
 */
const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
};

const createWebGL_TRIANGLES = (gl: WebGLRenderingContext) => {
  // 顶点着色器源码
  //   const vsSource = `
  //     attribute vec4 aVertexPosition;
  //     void main() {
  //         gl_Position = aVertexPosition;
  //     }
  // `;
  const vsSource = `
      attribute vec2 aVertexPosition;
      uniform vec2 uVertexPosition;
      void main() {
          // 从像素坐标转换到 0.0 到 1.0;
          vec2 zeroToOne = aVertexPosition / uVertexPosition;

          // 再把 0->1 转换 0->2
          vec2 zeroToTwo = zeroToOne * 2.0;
          
          // 把 0->2 转换到 -1->+1 (裁剪空间)
          vec2 clipSpace = zeroToTwo - 1.0;

          // 矩阵变换反转y轴;
          // gl_Position = vec4(clipSpace * vec2(1, 1), 0, 1);
          gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
  `;

  // 片段着色器源码
  const fsSource = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); // 红色
    }
`;

  // 创建着色器
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vertexShader || !fragmentShader) throw new Error("缺少着色器");

  // 创建着色器程序
  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) throw new Error("缺少着色器程序");

  // 获取属性位置
  const positionAttributeLocation = gl.getAttribLocation(
    program,
    "aVertexPosition"
  );
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "uVertexPosition"
  );

  // 创建顶点缓冲区
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // const positions = new Float32Array([0.0, 0.0, 0.0, 0.5, 0.5, 0]);
  const positions = new Float32Array([
    10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30,
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  // 修改wegl视域尺寸
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  // 使用完全不透明的黑色清除所有图像
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 用上面指定的颜色清除缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 使用着色器程序
  gl.useProgram(program);

  // 配置顶点属性指针
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(
    positionAttributeLocation, // 属性位置
    2, // 每个顶点分量数量（x,y）
    gl.FLOAT, // 数据类型
    false, // 是否归一化
    0, // 步长
    0 // 偏移量
  );
  gl.uniform2f(
    resolutionUniformLocation,
    gl.drawingBufferWidth,
    gl.drawingBufferHeight
  );

  //绘制
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};
const createWebGL_an = (gl: WebGLRenderingContext) => {
  const vsSource = `
      attribute vec2 aVertexPosition;
      uniform vec2 uVertexPosition;
      void main() {
          // 从像素坐标转换到 0.0 到 1.0;
          vec2 zeroToOne = aVertexPosition / uVertexPosition;

          // 再把 0->1 转换 0->2
          vec2 zeroToTwo = zeroToOne * 2.0;
          
          // 把 0->2 转换到 -1->+1 (裁剪空间)
          vec2 clipSpace = zeroToTwo - 1.0;

          // 矩阵变换反转y轴;
          // gl_Position = vec4(clipSpace * vec2(1, 1), 0, 1);
          gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }
  `;

  // 片段着色器源码
  const fsSource = `
    precision mediump float;
    uniform vec4 uUniformcolor;
    void main() {
        gl_FragColor = uUniformcolor;
    }
`;

  // 创建着色器
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vertexShader || !fragmentShader) throw new Error("缺少着色器");

  // 创建着色器程序
  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) throw new Error("缺少着色器程序");

  // 获取属性位置
  const positionAttributeLocation = gl.getAttribLocation(
    program,
    "aVertexPosition"
  );
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "uVertexPosition"
  );

  // 创建顶点缓冲区
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // const positions = new Float32Array([0.0, 0.0, 0.0, 0.5, 0.5, 0]);
  const positions = new Float32Array([
    10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30,
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  // 修改wegl视域尺寸
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  // 使用完全不透明的黑色清除所有图像
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 用上面指定的颜色清除缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 使用着色器程序
  gl.useProgram(program);

  // 配置顶点属性指针
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(
    positionAttributeLocation, // 属性位置
    2, // 每个顶点分量数量（x,y）
    gl.FLOAT, // 数据类型
    false, // 是否归一化
    0, // 步长
    0 // 偏移量
  );
  gl.uniform2f(
    resolutionUniformLocation,
    gl.drawingBufferWidth,
    gl.drawingBufferHeight
  );

  //绘制
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

export const createWebGL = (canvasEl: HTMLCanvasElement) => {
  // 初始化 WebGL 上下文
  const gl = canvasEl.getContext("webgl");

  // 确认 WebGL 支持性
  if (!gl) {
    alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
    return;
  }
  const canvas = gl.canvas as HTMLCanvasElement;

  // 修改画布内渲染尺寸
  // 获取浏览器显示的画布的CSS像素值
  const realToCSSPixels = window.devicePixelRatio;
  // 然后计算出设备像素设置drawingbuffer
  const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
  const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
  // 检查画布尺寸是否相同
  if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) {
    // 设置为相同的尺寸
    gl.canvas.width = displayWidth;
    gl.canvas.height = displayHeight;
  }

  createWebGL_TRIANGLES(gl);
};
