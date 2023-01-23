/**
 * 扩充
 */
declare global {
  interface MediaStream {
    stop?: Function;
  }
  interface Navigator {
    getUserMedia: any;
    webkitGetUserMedia: any;
    mozGetUserMedia: any;
    msGetUserMedia: any;
  }
  interface Window {
    getUserMedia: any;
  }
}

export class faceH5 {
  /**
   * 是否已开始录制
   */
  isStartRecord = false;
  /**
   * 视频流播放元素
   */
  videoEl: HTMLVideoElement;
  /**
   * MediaRecorder录制参数
   */
  MediaRecorderOptions: MediaRecorderOptions = {
    videoBitsPerSecond: 200000,
  };
  /**
   * 视频播放配置项
   */
  MediaOptions?: MediaStreamConstraints;
  /**
   * 存放视频MediaRecorder对象
   */
  videoRecorder?: MediaRecorder;
  /**
   * 保存视频文件流MediaStream
   */
  videoStream?: MediaStream;
  /**
   * 存放视频文件Blob对象
   */
  videoBlob?: Blob;
  /**
   * 上传用文件编码流
   */
  chunks: Array<any> = [];
  /**
   * 是否IOS端
   */
  readonly isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  constructor(options: {
    videoEl: HTMLVideoElement;
    MediaOptions?: any;
    MediaRecorderOptions?: MediaRecorderOptions;
  }) {
    this.videoEl = options.videoEl;
    if (options.MediaOptions) {
      this.MediaOptions = options.MediaOptions;
    }
    if (options.MediaRecorderOptions) {
      this.MediaRecorderOptions = Object.assign(
        {},
        this.MediaRecorderOptions,
        options.MediaRecorderOptions
      );
    }
  }

  /**
   * 获取是否有摄像头权限
   * @return { Promise | Error }
   */
  getUserMedia(): Promise<MediaStream> {
    /**
     * 录制视频配置项
     */
    let constraints = {
      video: { facingMode: "user", ...this.MediaOptions },
      audio: true,
    };
    /**
     * 旧版本API获取摄像头
     */
    let navigatorMediaOld =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      window.getUserMedia;

    /**
     * 如果浏览器可用新的媒体对象接口
     * 返回Promise
     */
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return navigator.mediaDevices.getUserMedia(constraints);
    } else if (navigatorMediaOld) {
      /**
       * 旧版API采用的是回调函数的形式
       * 使用Promise封装
       */
      return new Promise((resolve, reject) => {
        navigatorMediaOld(
          constraints,
          (rsp: MediaStream) => {
            resolve(rsp);
          },
          (err: unknown) => {
            reject(err);
          }
        );
      });
    } else {
      return Promise.reject("请检查此设备是否支持摄像头或摄像头权限是否被禁止");
    }
  }
  /**
  * 关闭录制
  */
  closeMediaStream(stream: MediaStream) {
    if (typeof stream.stop === "function") {
      stream.stop();
    } else {
      // 关闭音频流
      let audioTracks = stream.getAudioTracks();
      if (audioTracks && audioTracks.length) {
        audioTracks.forEach((item) => {
          if (typeof item.stop === "function") {
            item.stop();
          }
        });
      }
      // 关闭视频流
      let videoTracks = stream.getVideoTracks();
      if (videoTracks && videoTracks.length) {
        videoTracks.forEach((item) => {
          if (typeof item.stop === "function") {
            item.stop();
          }
        });
      }
    }
  }
  /**
  * 获取Blob对象转为base64的编码
  * @param Blob  Blob文件对象
  * @returns { Promise }
  */
  getBlobBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      if (!blob) {
        reject("文件格式转换失败")
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = () => {
        this.isStartRecord = false;
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
      fileReader.onabort = (errBbort) => {
        reject(errBbort);
      };
    });
  }
  /**
   * 开始录制
   */
  async startRecord() {
    /**
     * 获取Media对象
     */
    this.videoStream = await this.getUserMedia();

    if (this.isStartRecord) {
      return Promise.reject("请先停止录制视频");
    }

    // 保存Recorder对象
    this.videoRecorder = new MediaRecorder(
      this.videoStream,
      this.MediaRecorderOptions
    );
    // 添加为文件流
    this.videoRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    };
    this.videoRecorder.onstop = () => {
      this.videoBlob = new Blob(this.chunks, {
        type: "video/mp4",
      });
      this.chunks = [];
    };
    this.videoRecorder.start();
    /**
     * 保存视频文件流
     * 实时播放视频
     * @param srcObject  新属性
     * @param src  旧属性
     */
    try {
      this.videoEl.srcObject = this.videoStream;
    } catch (err) {
      this.videoEl.src = window.URL.createObjectURL(
        this.videoStream as unknown as MediaSource
      );
    }
    this.videoEl.onloadedmetadata = (e) => {
      this.videoEl.play();
    };

    // 打开视频已开始录制标识
    this.isStartRecord = true;
  }


  async stopRecord() {
    if (this.isStartRecord) {
      /**
       * 关闭视频流
       * video绑定视频流置为空 srcObject 新属性 | src旧属性
       * 延迟返回视频文件流，不延迟返回会导致拿不到视频文件流
       */
      this.videoRecorder!.stop();
      this.closeMediaStream(this.videoStream as MediaStream);
      try {
        this.videoEl.srcObject = null;
      } catch (err) {
        this.videoEl.src = "";
      }
      this.isStartRecord = false;
      /**
       * 延迟一秒执行
       * 调用MediaRecorder的stop方法到实际执行有延迟
       * Android与IOS实际时间不一样，以IOS为准，延迟一秒
       */
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, this.isIOS ? 100 : 1500);
      });

      let base64 = await this.getBlobBase64(this.videoBlob!);
      return {
        file: this.videoBlob,
        base64
      };
    } else {
      return Promise.reject("请先开始录制");
    }
  }

}
