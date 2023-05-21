<!-- 主页-->
<!--suppress JSUnresolvedVariable -->
<template>
  <div class="page-box">
    <BasePageBack ref="BasePageBack">
      <div slot="page-title">大樓財務報告</div>
      <div slot="content">
        <div class="col-12 mb-4 mx-auto text-center"><img class="head-icon mb-4" src="../../assets/pic/money.svg" /></div>
        <div class="row mb-4 mx-auto text-center select-date">
          <b>查詢從</b>
          <cube-input class="theme-input col-3 p-0 mx-2 btn" v-on:focus="showMinPicker('startTime')" v-model="startTime"
            placeholder="開始時間" :maxlength="30" action="javascript:;" />
          <b>至</b>
          <cube-input class="theme-input col-3 p-0 mx-2 btn" v-on:focus="showMinPicker('endTime')" v-model="endTime"
            placeholder="結束時間" :maxlength="30" action="javascript:;" />
          <b>的紀錄</b>
        </div>
        <div class="col-12 mb-4">
          <div class="row px-2">
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool focus"
                @click="to('Tables')">支出</button></div>
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool" @click="to('Tables')">收入</button>
            </div>
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool" @click="to('Tables')">結餘</button>
            </div>
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool" @click="to('Tables')">預算</button>
            </div>
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool"
                @click="to('Tables')">超出預算</button></div>
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool" @click="to('Tables')">欠款</button>
            </div>
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool" @click="to('Tables')">活存</button>
            </div>
            <div class="col-4 my-2"><button class="full-width btn btn-primary btn-tool" @click="to('Tables')">定存</button>
            </div>
          </div>
        </div>
      </div>
    </BasePageBack>
  </div>
</template>
<script>
import Finance from './Finance.vue.js';
export default {
  ...Finance
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "Finance.vue.styl";
</style>


