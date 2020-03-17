<template>
  <div id="test">
    <el-dialog :append-to-body='true' :visible.sync='vis' width="60%" :before-close='childClose'>
      <div v-if="comVis">
        <el-table @row-click='submitData' stripe ref="multipleTable" :data="renderData">
          <el-table-column prop="dialogCode" label="代码" center show-overflow-tooltip></el-table-column>
          <el-table-column prop="dialogName" label="名称" center show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-size.sync="pageSize"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page.sync="currentPage"
            :page-sizes="[10,20,50]"
            :total="fenyetotal"
            layout="total, sizes, prev, pager, next, jumper"
            >
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import IsEmpty from '@/utils/IsEmpty'
export default {
  name: '',
  data () {
    return {
      callBackData: '',
      currentPage: 1,
      pageSize: 10
    }
  },
  props: ['vis', 'workerVis', 'comVis', 'dialogNewTableData', 'newTableData', 'fenyetotal'],
  mounted () {
  },
  methods: {
    submitData (row) {
      this.callBackData = `${row.dialogCode}-${row.dialogName}`
      this.$emit('selectDialog', this.callBackData)
    },
    test () {
      console.log(this.currentPage)
    },
    childClose () {
      this.currentPage = 1
      this.pageSize = 10
      this.$emit('onClose')
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('comdialogChangePageFunction', val)
    },
    handleSizeChange (val) {
      this.$emit('comdialogChangePageSizeFunction', val)
    },
    ...mapActions([
      'comDialogqueryWorker'
    ])
  },
  computed: {
    renderData () { // 将传入子组件的数组数据的renderData进行分割，得到实际要显示的数据
      if (!IsEmpty(this.newTableData)) {
        for (let i = 0; i < this.newTableData.length; i++) {
          let temp = this.newTableData[i]['renderData'].split('-')
          this.newTableData[i]['dialogCode'] = temp[0]
          this.newTableData[i]['dialogName'] = temp[1]
        }
        return this.newTableData
      } else {
        return [{dialogCode: '暂无数据', dialogName: '暂无数据'}]
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped type="text/css">
#orgadd {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container{
  text-align: center;
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.block{
  margin-top: 10px;
  text-align: center;
}
.moban{
  margin-top: 10px;
}
.renderButton{
  border:0;
  cursor:pointer;
  width:100%;
  font-size:14px;
  background-color: white
}
.inputGroup{
  margin-bottom: 10px;
}
</style>
