<template>
  <div id="lifeInsur_differ">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>银保代理业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>保险公司承保清单导入</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <div class="selectItem" style="text-align: center; ">
      <ui-label-text style="display: inline-block; " >
        <el-select v-model="id" slot="text" @change="selectGet" placeholder="请选择保险公司">
          <el-option v-for="item in insCom" :key="item.insurercode" :label="item.insurername" :value="item.insurercode"></el-option>
        </el-select>
      </ui-label-text>
      <a @click='downModule()' href="javascript:void(0)">模板下载</a>
    </div>
    <div class="upload">
      <el-upload class="upload-demo" :data="postData" ref="upload" :on-success="handleSuccess" name="file" :action="uploadUrl()" :limit="1" accept='xls' :file-list="fileList" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" >上传文件</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      id: '',
      comName: '',
      postData: {}, // 上传数据
      insCom: [], // 保险公司列表
      fileList: [],
      infoData: {}, // 查询提交数据
      ditchTableData: [],
      isShowTable: true,
      totalPages: 0, // 总页数
      totalRecords: 0, // 总条数
      current: 1 // 当前页码
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 初始化数据
      this.getInsCom()
    })
  },
  watch: {
  },
  methods: {
    getInsCom () { // 获取保险公司
      let postData = {
        'insurerType': '3'
      }
      this.searchSilverInsCom(postData).then(resp => {
        this.insCom = resp
      })
    },
    downModule () { // 下载模板
      if (this.id === '') {
        this.open('error', '请先选择保险公司')
        return false
      } else {
        window.open('/tabycore/bankChannel/downloadModel?downType=' + this.id)
      }
    },
    uploadUrl () { // 文件上传地址
      return '/tabycore/bankChannel/batchImport'
    },
    submitUpload (fileData) { // 上传到服务器
      let list = document.querySelector('.is-ready')
      if (IsEmpty(list)) {
        list = []
      }
      if (this.id === '') {
        this.open('error', '请先选择保险公司')
        return false
      } else if (list.length <= 0) {
        this.open('error', '请先选择文件')
        return false
      } else {
        this.postData.comCode = this.id
        this.$refs.upload.submit()
      }
    },
    handleSuccess (resp) { // 上传成功
      if (resp.code === '000000') {
        this.open('success', '银保代理导入数据' + resp.data[0].successcount + '条')
        this.fileList = []
      } else {
        this.open('error', resp.msg)
      }
    },
    selectGet (vId) { // 这个vId也就是value值 获取select lable值
      let obj = {}
      obj = this.insCom.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.insurercode === vId // 筛选出匹配数据
      })
      console.log(obj.insurername) // 我这边的name就是对应label的
      this.comName = obj.insurername
    },
    open (type, mesg) { // 提示
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    ...mapActions([
      'searchSilverInsCom',
      'silverErrorMesg'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #lifeInsur_differ{
    padding: 0px 30px 30px 30px;
  }
  .manage_form { margin-top: 20px; }
  .ri-line { margin-bottom: 10px; }
  .selectItem { margin-top: 20px; }
  .checkBtn { margin: 20px 0; text-align: center; }
  .upload { text-align: center; margin: 20px auto 0; width: 50%; }
</style>
<style>
  .btn-container { margin: 30px 0; }
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
  .batch .el-button { width: inherit; height: inherit; line-height: inherit; font-size: inherit; padding: 10px; }
  .el-input__icon { line-height: inherit;}
</style>

