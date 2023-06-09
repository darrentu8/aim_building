<!-- 主页-->
<!--suppress JSUnresolvedVariable -->
<template>
  <div class="page-box">
    <BasePageBack ref="BasePageBack">
      <div slot="page-title">電梯施工開會總結</div>
      <div slot="content">
        <div class="row mb-4 mx-auto text-center select-date"><b>查詢從</b>
          <cube-input readonly class="theme-input col-3 p-0 mx-2 btn" v-on:focus="showMinPicker('startTime')"
            v-model="startTime" placeholder="開始時間" :maxlength="30" action="javascript:;"></cube-input><b>至</b>
          <cube-input readonly class="theme-input col-3 p-0 mx-2 btn" v-on:focus="showMinPicker('endTime')"
            v-model="endTime" placeholder="結束時間" :maxlength="30" action="javascript:;"></cube-input><b>的紀錄</b>
          <p class="mt-2 text-primary">記錄由最新至最舊</p>
        </div>
        <div class="col-12 mb-4">
          <div class="row px-2">
            <div class="col-12 my-2"><b class="ml-2 text-primary">第1次開會</b><button
                class="mb-4 btn-list full-width btn btn-primary" @click="to('ReportPage')">電梯施工全程紀錄</button></div>
            <div class="col-12 my-2"><b class="ml-2 text-primary">第2次開會</b><button
                class="mb-4 btn-list full-width btn btn-primary" @click="to('ReportPage')">水塔清潔會議紀錄</button></div>
            <div class="col-12 my-2"><b class="ml-2 text-primary">第3次開會</b><button
                class="mb-4 btn-list full-width btn btn-primary" @click="to('ReportPage')">大樓財政報告會議</button></div>
            <div class="col-12 my-2"><b class="ml-2 text-primary">第4次開會</b><button
                class="mb-4 btn-list full-width btn btn-primary focus" @click="to('ReportPage')">電梯施工開會紀錄</button></div>
          </div>
        </div>
      </div>
    </BasePageBack>
  </div>
</template>
<script>
import ReportList from './ReportList.vue.js';
export default {
  ...ReportList
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "ReportList.vue.styl";
</style>


