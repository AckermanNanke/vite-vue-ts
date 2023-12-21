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
        :class="['calendar-content-row-item', { disabled: item.disabled }]">
        {{ item.date }}
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.calendar {
  max-width: 600px;
  cursor: pointer;

  &-header {
    &-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-week {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f2f2f2;

      &-item {
        width: 14.28571%;
      }
    }
  }

  &-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &-row {
      &-item {
        width: 14.28571%;

        &.disabled {
          background: gray;
        }
      }

    }
  }
}
</style>