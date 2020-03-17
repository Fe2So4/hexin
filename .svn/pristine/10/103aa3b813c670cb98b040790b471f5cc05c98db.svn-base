<template>
  <div class="page clear">
    <div>
      <i class="font_family icon-__2" @click="jump(1)" :class="{'disabled':currentPage===1}"></i>
      <i class="font_family icon-_20" @click="prev" :class="{'disabled':currentPage===1}"></i>
      <span>第</span>
      <el-input v-model="page" placeholder="1" @keyup.enter.native="jumpPo"></el-input>
      <span>共</span>
      <span>{{pageNum}}</span>
      <span>页</span>
      <i class="font_family icon-__1" @click="next" :class="{'disabled':currentPage===pageNum}"></i>
      <i class="font_family icon-__3" @click="jump(pageNum)" :class="{'disabled':currentPage===pageNum}"></i>
    </div>
    <div>
      <span>显示</span>
      <span>{{startNum}}</span>
      <span>到</span>
      <span>{{endNum}}</span>
      <span>，共</span>
      <span>{{total}}</span>
      <span>条记录</span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ui-page',
  props: [
    'pageCount',
    'action',
    'condition'
  ],
  data () {
    return {
      currentPage: 1,
      total: 0,
      page: 1,
      data: [],
      selfCondition: {}
    }
  },
  methods: {
    prev: function () {
      if (this.page > 1) {
        this.page--
        this.page = this.page
        this.getData()
      }
    },
    next: function () {
      if (this.page < this.pageNum) {
        this.page++
        this.currentPage = this.page
        this.getData()
      }
    },
    jump: function (pno) {
      if (pno === 1) {
        this.page = 1
        this.currentPage = 1
      } else if (pno === this.pageNum) {
        this.page = this.pageNum
        this.currentPage = this.pageNum
      }
      this.getData()
    },
    jumpPo: function () {
      if (this.page >= 1 && this.page <= this.pageNum) {
        this.currentPage = this.page
        this.getData()
      }
    },
    getData (flag) {
      if (flag) {
        this.currentPage = 1
        this.page = 1
        this.selfCondition = this.condition
      }
      this.$store.dispatch(this.action, {page: this.currentPage, pageCount: this.pageCount, condition: this.selfCondition}).then((obj) => {
        this.data = obj.data
        this.total = obj.totalRecords
      })
    }
  },
  computed: {
    startNum () {
      return (this.page - 1) * this.pageCount + 1
    },
    endNum () {
      return this.page * this.pageCount < this.total ? this.page * this.pageCount : this.total
    },
    pageNum () {
      return Math.ceil(this.total / this.pageCount)
    },
    search () {
      return this.$store.state.home.search
    }
  },
  watch: {
    search (action) {
      if (action.split('@@'[0] === action)) {
        this.getData(true)
      }
    }
  }
}
</script>

<style scoped>
  .page{
    height:50px;
    /*border:1px solid red; */
    line-height:50px;
    background-color:#f3f3f3;
  }
  .page>div{
    display: inline;
  }
  .page>div:nth-child(1){
    margin-left:40%;
  }
  .page>div:nth-child(1)>i{
    margin-right:15px;
  }
  .page>div:nth-child(1)>i:nth-child(8){
    margin-left:15px;
  }
  .page>div:nth-child(1)>span:nth-child(5){
    margin-left:5px;
  }
  .page>div:nth-child(2){
    float:right;
  }
  .page>div:nth-child(2)>span{
    color:#070707;
  }
</style>
<style>
  .page .el-input{
    width:2.75rem;
  }
    .page .el-input__inner{
    line-height:25px;
    height:25px;
    width:2.75rem !important;
  }
  .page>div:nth-child(1)>.font_family{
    color:#2585e6;
    cursor: pointer;
  }
  .disabled{
    color:#99c6f4 !important;
  }
  /* 清除浮动 */
  .clear:after{
    content:"";
    display:block;
    clear:both;
  }

    
  
</style>