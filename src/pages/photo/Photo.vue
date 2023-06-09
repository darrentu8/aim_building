<!-- 主页-->
<!--suppress JSUnresolvedVariable -->
<template>
  <div class="page-box">
    <BasePageBack ref="BasePageBack">
      <div slot="page-title">住戶管理費用</div>
      <div slot="content">
        <div class="col-12 mb-4 mx-auto text-center"><img class="head-icon mb-1" src="../../assets/pic/photo-mic.svg" />
        </div>
        <div class="row mb-4 mx-auto text-center select-date"><b>查詢從</b>
          <cube-input readonly class="theme-input col-3 p-0 mx-2 btn" @focus="showMinPicker('startTime')"
            v-model="startTime" placeholder="開始時間" :maxlength="30"></cube-input><b>至</b>
          <cube-input readonly class="theme-input col-3 p-0 mx-2 btn" @focus="showMinPicker('endTime')" v-model="endTime"
            placeholder="結束時間" :maxlength="30"></cube-input><b>的紀錄</b>
          <p class="mt-2 text-primary">記錄由最新至最舊</p>
        </div>
        <div class="col-12 mb-4">
          <div class="row px-2">
            <div class="col-12 my-2"><button class="mb-4 btn-list full-width btn btn-primary"
                @click="to('ReportList')">電梯施工全程紀錄</button></div>
            <div class="col-12 my-2"><button class="mb-4 btn-list full-width btn btn-primary"
                @click="to('ReportList')">水塔清潔會議紀錄</button></div>
            <div class="col-12 my-2"><button class="mb-4 btn-list full-width btn btn-primary"
                @click="to('ReportList')">大樓財政報告會議</button></div>
            <div class="col-12 my-2"><button class="mb-4 btn-list full-width btn btn-primary focus"
                @click="to('ReportList')">電梯施工開會紀錄</button></div>
          </div>
        </div>
      </div>
    </BasePageBack>
    <div class="btm-div">
      <button class="btn btn-primary theme-btn inline float-left" @click="scan()">
        <span>我要攝影</span><img class="ml-2 btm-icon-size" src="../../assets/pic/camera.svg" /></button>
      <button class="btn btn-primary theme-btn inline float-left"><span>我要錄音</span><img class="ml-2 btm-icon-size"
          src="../../assets/pic/mic.svg" /></button>
    </div>
  </div>
</template>
<script>
import Photo from './Photo.vue.js';
export default {
  ...Photo
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "Photo.vue.styl";
</style>


