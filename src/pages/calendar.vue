<script setup lang="ts">
import { Calendar } from "@utils/calendar";
import { onMounted, ref } from "vue";

const calendar = ref<Calendar>();

onMounted(() => {
  calendar.value = new Calendar();
  console.log(calendar);

})
</script>
<template>
  <div class="calendar">
    <section class="calendar-header">
      <div class="calendar-header-bar">
        <div class="calendar-header-bar-icon calendar-header-bar-prev" @click="calendar?.changeMonth(0)">👈</div>
        <div class="calendar-header-bar-title">{{ calendar?.year }}-{{ calendar?.month }}</div>
        <div class="calendar-header-bar-icon  calendar-header-bar-next" @click="calendar?.changeMonth(1)">👉</div>
      </div>
      <div class="calendar-header-week">
        <div class="calendar-header-week-item" v-for="item in calendar?.weekData" :key="item.enI">{{ item.zhSI }}</div>
      </div>
    </section>
    <section class="calendar-content">
      <div v-for="(item, i) in calendar?.monthlyCalendarData || []" :key="i"
        :class="['calendar-content-row-item', { disabled: item.disabled }, { active: item.active }]">
        {{ item.date }}
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.calendar {
  max-width: 400px;
  text-align: center;
  background: #303030;
  color: #ffffff;
  line-height: 2em;
  cursor: pointer;

  &-header {
    &-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-icon {
        min-width: 14.28571%;
      }
    }

    &-week {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-item {
        flex: 1;
      }
    }
  }

  &-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &-row {
      &-item {
        flex: 1;
        min-width: 14.28571%;

        &.disabled {
          opacity: .6;
        }

        &.active {
          background: rgba(255, 255, 255, .2);
        }
      }

    }
  }
}
</style>