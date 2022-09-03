<script setup lang="ts"></script>

<template>
  <a-layout>
    <a-layout-sider width="25vw" class="sider" :style="{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
    }">
      <div class="body">
        <a-avatar size="large" src="/vite.svg" />
        <h2>惊鸿漪</h2>
        <div>当一股逆风袭来，我已能抗御八面来风，驾舟而行</div>
      </div>
    </a-layout-sider>
    <a-layout :style="{
      marginLeft: '26vw',
      padding: '1.5rem 1.5rem 1.5rem 0 ',
    }">
      <a-layout-header :style="{
        background: '#fff',
        padding: '1.5rem',
      }">
        <a-row align="middle">
          <a-col :span="3">
            <a-avatar :size="110" shape="square" src="/vite.svg" />
          </a-col>
          <a-col :span="20">
            <p class="header-title">惊鸿漪——前端工程师/Golang开发</p>
            <div class="header-description">
              <span class="">男</span>
              <span class="">24岁</span>
              <span class="">3年工作经验</span>
              <span class="">山东省济南市</span>
              <span class="">10-15k</span>
            </div>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.sider.ant-layout-sider {
  color: @white;
  background: url("/src/assets/images/sider-bg.jpg") no-repeat center;
  background-size: cover;

  .body {
    position: relative;
    width: 25vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }
}

.ant-layout-header {
  height: auto !important;

  .header-title {
    font-size: 1.75rem;
    line-height: 1em;
    margin: 0;
  }

  .header-description {
    padding-top: 1em;
    line-height: 1em;
    font-size: 1rem;
    color: @text-tip;

    span {
      display: inline-block;
      padding-right: 1em;
    }
  }
}
</style>
