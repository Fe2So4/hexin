<template>
  <div id="riskDb" >
    <!-- 双击弹框 -->
    <!-- <el-dialog :append-to-body="true" width="35%" title="保险公司代码" :visible.sync="dialogTableVisibleCode"> -->
      <el-table ref="multipleTable" @row-click="handleRowChange" :data="dbdata" tooltip-effect="dark" style="width: 100%">
        <el-table-column :prop="dbContent.key" :label="dbTableTitle.title1" show-overflow-tooltip>
        </el-table-column>
        <el-table-column :prop="dbContent.value" :label="dbTableTitle.title2" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
       v-if="(totalRecords ? totalRecords : info.total)!=0"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :page-sizes="[ 5 , 10 , 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRecords ? totalRecords : info.total">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <div class="check-btn">
          <!-- <el-button @click="dialogTableVisibleCode = false">取 消</el-button> -->
          <!-- <el-button type="primary" @click="dbSubmit">确 定</el-button> -->
        </div>
      </span>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'risk-db',
  props: ['dbInfo', 'dbTableTitle', 'dbContent'],
  data () {
    return {
      // info: {
      //   currentPage: 1,
      //   total: 0,
      //   size: 10
      // },
      subInfo: {
        currentPage: 1,
        total: 0,
        pageSize: 5
      },
      dbselected: {}, // 双击选中数据
      classBigNameList: [],
      classSmallNameList: [],
      paymentList: [],
      key: '',
      value: ''
    }
  },
  mounted () {
    // this.initFun()
  },
  methods: {
    ...mapActions([
      'queryRisk',
      'modRisk',
      'delRisk',
      'addRisk',
      'getRiskcodes',
      'getInsCom'
    ]),
    initFun () {
      if (this.dbInfo === 'com') {
        this.key = 'insurercode'
        this.value = 'insurername'
        // this.getInsCom(this.subInfo)
      } else {
        this.key = 'riskcode'
        this.value = 'riskname'
        // this.getRiskcodes(this.subInfo)
      }
      this.subInfo.currentPage = 1
      // console.log(this.subInfo.currentPage)
    },
    dbSubmit () {
      this.$emit('getDbdata', this.dbselected)
    },
    handleRowChange (row, event, column) {
      if (this.dbInfo === 'com') {
        this.dbselected.insurerCode = row.insurercode
        this.dbselected.insurerName = row.insurername
        this.dbselected.insurertype = row.insurertype
        this.dbSubmit()
      } else if (this.dbInfo === 'risk') {
        this.dbselected.riskCode = row.riskcode
        this.dbselected.riskName = row.riskname
        this.dbSubmit()
      }
    },
    handleCurrentChange (val) {
      this.subInfo.currentPage = val
      this.$emit('getDbChangeData', this.dbInfo, this.subInfo)
    },
    handleSizeChange (val) {
      this.subInfo.currentPage = 1
      this.subInfo.pageSize = val
      this.$emit('getDbChangeData', this.dbInfo, this.subInfo)
    }
  },
  components: {},
  created () {
    this.initFun()
  },
  beforeUpdate () {
    this.initFun()
  },
  computed: {
    totalRecords () {
      return parseInt(this.$store.state.riskMgr.dbtotalRecords)
    },
    dbdata () {
      if (this.dbInfo === 'com') {
        return this.$store.state.riskMgr.insComData
      } else if (this.dbInfo === 'risk') {
        return this.$store.state.riskMgr.riskData
      }
    },
    currentPage () {
      return this.$store.state.riskMgr.currentPage
    },
    pageSize () {
      return this.$store.state.riskMgr.pageSize
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#riskIndex {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
.check-btn {
  text-align: center;
}
</style>

<style lang="scss" type="text/css">
.risk-dialog-wrapper .lt-label,
.risk-dialog-wrapper .el-form-item {
  float: left;
  margin-bottom: 2px;
}
</style>
