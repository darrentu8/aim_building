<!-- 主页-->
<!--suppress JSUnresolvedVariable -->
<template>
  <div class="page-box">
    <BasePageBack ref="BasePageBack">
      <div slot="page-title">住戶管理費用</div>
      <div slot="content">
        <div class="col-12 mb-4 mx-auto text-center"><img class="head-icon mb-4" src="../../assets/pic/coach.svg" /></div>
        <div class="row mb-4 mx-auto text-center select-date"><b>查詢從</b>
          <cube-input readonly class="theme-input col-3 p-0 mx-2 btn" v-on:focus="showMinPicker('startTime')"
            v-model="startTime" placeholder="開始時間" :maxlength="30" action="javascript:;"></cube-input><b>至</b>
          <cube-input readonly class="theme-input col-3 p-0 mx-2 btn" v-on:focus="showMinPicker('endTime')"
            v-model="endTime" placeholder="結束時間" :maxlength="30" action="javascript:;"></cube-input><b>的紀錄</b>
        </div>
        <div class="col-12 mb-4">
          <div class="row px-2">
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool focus"
                @click="to('Tables')">住戶</button></div>
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool" @click="to('Tables')">商戶</button>
            </div>
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool" @click="to('Tables')">未繳</button>
            </div>
          </div>
        </div>
      </div>
    </BasePageBack>
  </div>
</template>
<script>
import House from './House.vue.js';
export default {
  ...House
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "House.vue.styl";
</style>


