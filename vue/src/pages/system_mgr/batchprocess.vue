<template>
  <div id="home_index">
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>机构管理</el-breadcrumb-item>
            <el-breadcrumb-item>批处理</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
    
        <div class="ri-content" slot="content" >
          <el-row class="ri-line">
            <el-col :span="8">
              <ui-label-text labelWidth="60" label="计划名称:" >
                <el-input v-model="info.taskName" slot="text" ></el-input>
                
              </ui-label-text>
            </el-col>
            <el-col :span="8">
              <ui-label-text labelWidth="60" label="任务组名:" >
                <el-input v-model="info.taskClassTrigger" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="8">
              <ui-label-text labelWidth="60" label="触发器类:" >
                <el-input v-model="info.taskClass" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="8">
              <span class="datestyle" labelWidth="70">开始时间:</span> 
              <el-date-picker style="width:267px;" v-model="info.startTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-col :span="8">
              <span class="datestyle" labelWidth="70">结束时间:</span>
              <el-date-picker style="width:267px;" v-model="info.endTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-col :span="8">
              <ui-label-text labelWidth="70" label="cron表达式:" >
                <el-input v-model="info.cornExpress" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <ui-label-text labelWidth="60" label="描述:" >
                <el-input labelWidth="300" type="textarea" v-model="info.taskDesc" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <ui-label-text labelWidth="60" label="任务id:" >
                <el-input v-model="info.jobId" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
        </div>
        
      <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
          <el-button type="primary" @click.native.prevent="query(1)">查询</el-button>
      </div>
      <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
          <el-button type="primary" @click="dialogTableVisible1 = true">增加</el-button>
      </div>
      <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
          <el-button type="primary" @click="dialogTableVisible2 = true">修改</el-button>
      </div>
      <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
          <el-button type="danger" @click.native.prevent="del()">删除</el-button>
      </div>
      
      <el-table @selection-change="handleSelectionChange" ref="multipleTable" :data="batch" tooltip-effect="dark"
       style="width: 100%"
   
        >
        <!-- 多选 -->
        <el-table-column prop="checked" type="selection" width="55"></el-table-column>
        <el-table-column prop="taskName" label="计划名称" width="120">
        </el-table-column>
        <el-table-column prop="taskClassTrigger" label="任务组名称" width="120">
        </el-table-column>
        <el-table-column prop="taskClass" label="触发器类型" width="120">
        </el-table-column>
        <!-- <el-table-column :visible.sync="tableVisible" prop="jobId" label="任务id" width="120">
        </el-table-column> -->
        <el-table-column prop="startTime" label="开始时间" width="120">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="120">
        </el-table-column>
        <el-table-column prop="status" label="运行状态" width="120">
        </el-table-column>
        <el-table-column prop="deleteFlag" label="是否启用" width="120">
        </el-table-column>
        <el-table-column prop="taskDesc" label="任务描述" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>  -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="info.currentPage"
          :page-sizes="[5]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecords == totalRecords ? totalRecords : 0">
        </el-pagination>
        <!-- <div>{{totalRecords}}</div> -->
        <!-- <ui-page :pageCount='5' action="queryBatch_1" ref="pager" :condition="this.info" ></ui-page> -->
      </div>  

      <!--增加 的弹框-->
      <el-dialog :append-to-body="true" width="80%" title="增加" :visible.sync="dialogTableVisible1">
        <el-row class="ri-line">
            <el-col :span="8">
              <ui-label-text  label="计划名称:" >
                <el-input v-model="info.taskName" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="8">
              <ui-label-text  label="任务组名:" >
                <el-input v-model="multipleSelection.taskClassTrigger" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="8">
              <ui-label-text  label="触发器类:" >
                <el-input v-model="multipleSelection.taskClass" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="8">
             <span class="datestyle">开始时间:</span> 
              <el-date-picker style="width:267px;" v-model="info.startTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <span class="datestyle">结束时间:</span>
              <el-date-picker style="width:267px;" v-model="info.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <ui-label-text  label="cron表达式:" >
                <el-input v-model="info.cornExpress" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <ui-label-text labelWidth="60" label="描述:" >
                <el-input labelWidth="300" type="textarea" v-model="info.taskDesc" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>

          <el-button class="button_add" @click.native.prevent="add()">确定</el-button>
      </el-dialog>

      <!--修改 的弹框-->
      <el-dialog :append-to-body="true" width="80%" title="修改" :visible.sync="dialogTableVisible2">
        <el-row class="ri-line">
            <el-col :span="8">
              <ui-label-text  label="计划名称:" >
                <el-input v-model="info.taskName" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="8">
              <ui-label-text  label="任务组名:" >
              <el-input v-model="info.taskClassTrigger" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="8">
              <ui-label-text  label="触发器类:" >
              <el-input v-model="info.taskClass" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="8">
             <span class="datestyle">开始时间:</span> 
              <el-date-picker style="width:267px;" v-model="info.startTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <span class="datestyle">结束时间:</span>
              <el-date-picker style="width:267px;" v-model="info.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <ui-label-text  label="cron表达式:" >
                <el-input v-model="info.cornExpress" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <ui-label-text labelWidth="60" label="描述:" >
                <el-input labelWidth="300" type="textarea" v-model="info.taskDesc" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <ui-label-text labelWidth="60" label="任务id:" >
                <el-input v-model="info.jobId" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-button class="button_add" @click.native.prevent="mod()">修改</el-button>
      </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
// import Page from '@/components/page'

import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      info: {
        currentPage: 1
      },
      data: '',
      result: '',
      fileList: [],
      total: 0,
      multipleSelection: [],
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      dialogTableVisible1: false,
      dialogTableVisible2: false
    }
  },
  mounted () {
    // this.queryAuthor().then(resp => {
    //   this.result = JSON.stringify(resp.data)
    //   var Batch = resp.data.batch
    //   // 栽了个坑  要记住实例化一下
    //   this.Batch = Batch
    //   console.log(Batch)
    //   console.log(Batch[0])
    // })
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'queryAuthor',
      'addBatch_1',
      'delBatch_1',
      'modBatch_1',
      'queryBatch_1'
    ]),
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // this.info.currentPage = val
      console.log(this.info.currentPage)
      this.query(val)
    },
    add () {
      console.log('计划名称：' + this.info.taskName)
      console.log('任务组名：' + this.info.taskClassTrigger)
      console.log('触发器类：' + this.info.taskClass)
      // this.info.startTime = this.info.startTime.getFullYear() + '-' + (this.info.startTime.getMonth() + 1) + '-' + this.info.startTime.getDate()
      console.log('开始时间：' + this.info.startTime)
      // this.info.endTime = this.info.endTime.getFullYear() + '-' + (this.info.endTime.getMonth() + 1) + '-' + this.info.endTime.getDate()
      console.log('结束时间：' + this.info.endTime)
      console.log('cron表达式: ' + this.info.cornExpress)
      console.log('描述: ' + this.info.taskDesc)

      this.addBatch_1(this.info)
      this.dialogTableVisible1 = false
      // this.$refs.pager.getData(true)
    },
    del () {
      this.delBatch_1(this.multipleSelection)
      // this.$refs.pager.getData(true)
    },
    mod () {
      this.modBatch_1(this.info)
      this.dialogTableVisible2 = false
    },
    query (page) {
      this.info.currentPage = page
      this.queryBatch_1(this.info)
      console.log('totalRecords:' + this.$store.state)
      // this.$refs.pager.getData(true)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection[0])
      this.info.taskName = this.multipleSelection[0].taskName
      this.info.taskClassTrigger = this.multipleSelection[0].taskClassTrigger
      this.info.taskClass = this.multipleSelection[0].taskClass
      this.info.startTime = this.multipleSelection[0].startTime
      this.info.endTime = this.multipleSelection[0].endTime
      this.info.cornExpress = this.multipleSelection[0].cornExpress
      this.info.taskDesc = this.multipleSelection[0].taskDesc
      this.info.jobId = this.multipleSelection[0].jobId
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  created () {
  },
  computed: {
    batch () {
      return this.$store.state.batch.batch
    },
    totalRecords () {
      return parseInt(this.$store.state.batch.totalRecords)
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#home_index{
  padding: 10px;
}
.btn-container{
  width: 100px;
  float: left;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 30px;
  margin-left: 40px;
  padding-left: 40px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.datestyle{
  color: #717171;
  font-size: 0.875rem;
  display: inline-block;
  width: auto;
}
.button_add{
  margin-left: 45%;
}
.el-pagination{float: right;padding-right: 50px;}
</style>
