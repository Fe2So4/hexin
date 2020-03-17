<template>
  <div id="dataDictionary" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>数据字典</el-breadcrumb-item>
        </el-breadcrumb>
    </ui-notice-bar>
    <el-form>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text labelWidth="80" label="参数代码:" >
              <el-select v-model="categoryCode" slot="text" :remote-method="categoryCodeMethod" filterable remote clearable placeholder="请输入参数代码或名称">
                <el-option v-for="item in searchOptions" :key='item.configSetCode' :label='item.configSetCode+"-"+item.configSetName' :value='item.configSetCode' >
                </el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text labelWidth="80" label="参数值代码:" >
              <el-select v-model="code" slot="text" :remote-method="codeMethod" filterable remote clearable placeholder="请输入参数值代码或名称">
                <el-option v-for="(item, index) in searchCodeOptions" :key='index' :label='item.configSetValueCode+"-"+item.configSetValueName' :value='item.configSetValueId' >
                </el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <ui-label-text labelWidth="80" label="有效标志:" >
            <el-select v-model="flag" slot="text" placeholder="请选择">
              <el-option  label="无效" value="0"> </el-option>
              <el-option  label="有效" value="1"> </el-option>  
          </el-select>
          </ui-label-text>
        </el-col>
      </el-row>
      <div class='btn-container'>
        <el-button type="primary" style='' @click.native.prevent="query()">查询</el-button>
        <el-button type="primary"  @click.native.prevent="isAdd = true" >添加</el-button>
        <el-button size="primary" @click.native.prevent="modifyDictionary" >修改</el-button>
        <el-button size="primary" @click.native.prevent="Delete" >删除</el-button>
      </div>
    </el-form>
    <el-table stripe :data="tableData" style="width: 100%" v-if='isList' @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" >
      </el-table-column>
      <el-table-column prop="configSetCode" label="参数代码" width="180"></el-table-column>
      <el-table-column prop="configSetName" label="参数名称" width="180"></el-table-column>
      <el-table-column prop="configSetValueCode" label="参数值代码"></el-table-column>
      <el-table-column prop="configSetValueName" label="参数值名称"></el-table-column>
    </el-table>
    <div class="pagination" v-if='isList'>
        <el-pagination @current-change='handleCurrentChange' :pager-count='5' :page-sizes="[5, 10, 20, 50]" :page-size='5' :total="totalRecords" :current-page.sync="current" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"  @size-change="handleSizeChange"></el-pagination>
    </div>
    <el-dialog :append-to-body='true' title="添加数据字典" :visible.sync="isAdd" width='70%' >
      <el-form :model="addForm" :rules="rules" ref="addForm" class="mesg_form" >
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop="parentId" >
              <ui-label-text labelWidth="100" label="参数代码:" >
                <el-select v-model="addForm.parentId" slot="text" :remote-method="categoryCodeMethod_add" filterable remote clearable placeholder="请输入参数代码或名称">
                  <el-option v-for="item in searchOptions" :key='item.configSetId' :label='item.configSetCode+"-"+item.configSetName' :value='item.configSetId' >
                  </el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="code" >
              <ui-label-text labelWidth="100" :required="true" label="参数值代码:" >
                <el-input slot="text" v-model="addForm.code" @blur='checkCode' ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop="name" >
              <ui-label-text labelWidth="100" label="参数名称:" >
                <el-input slot="text" v-model="addForm.name" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="addDictionary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :append-to-body='true' :visible.sync="isDelet" width="30%" >
      <span>确认删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDelet = false">取 消</el-button>
        <el-button type="primary" @click="deleteDictionary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改数据字典 -->
    <el-dialog :append-to-body='true' :rules="rules" width='70%' title="修改数据字典"  :visible.sync="isModify" >
      <el-form :model="modifyForm" class="modify_form" :rules="rulesMod" ref="modifyForm" >
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop="configSetCode" >
              <ui-label-text labelWidth="120" label="参数代码:" >
                <el-input slot="text" v-model="modifyForm.configSetCode" :disabled="true" style="width: 65%;" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="configSetName" >
              <ui-label-text labelWidth="120" label="参数名称:" >
                <el-input slot="text" v-model="modifyForm.configSetName" :disabled="true" style="width: 65%;" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop="configSetValueCode" >
              <ui-label-text labelWidth="120" :required="true" label="参数值代码:" >
                <el-input slot="text" v-model="modifyForm.configSetValueCode" style="width: 65%;" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="configSetValueName" >
              <ui-label-text labelWidth="120" label="参数值名称:" >
                <el-input slot="text" v-model="modifyForm.configSetValueName" style="width: 65%;" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item  prop="lastUpdateDate"  >
              <ui-label-text labelWidth="120" label="最后更新日期:" >
                <el-input slot="text" v-model="modifyForm.lastUpdateDate1" :disabled="true"  style="width: 65%;" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="lastUpdateCode"  >
              <ui-label-text labelWidth="120" label="最后更新人代码:" >
                <el-input slot="text" v-model="modifyForm.lastUpdateCode" :disabled="true"  style="width: 65%;" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop="creationDate"  >
              <ui-label-text labelWidth="120" label="创建日期:" >
                <el-input slot="text" v-model="modifyForm.creationDate1" :disabled="true"  style="width: 65%;" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="creationCode"  >
              <ui-label-text labelWidth="120" label="创建人代码:" >
                <el-input slot="text" v-model="modifyForm.creationCode" :disabled="true"  style="width: 65%;" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ui-label-text labelWidth="120" label="有效标志:" >
              <el-select v-model="modifyForm.validStatus" slot="text" placeholder="请选择">
                <el-option  label="无效" value="0"> </el-option>
                <el-option  label="有效" value="1"> </el-option>  
            </el-select>
            </ui-label-text>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" isModify = false">取 消</el-button>
        <el-button type="primary" @click="saveDictionary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LabelText from '@/components/label-text'
import NoticeBar from '@/components/notice-bar'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      loading: '',
      isAdd: false, // 是否显示添加弹框
      isDelet: false, // 是否删除
      isModify: false, // 是否删除
      formLabelWidth: '120px',
      categoryCode: '', // 参数代码
      code: '', // 参数值代码
      flag: '', // 是否有效
      current: 1, // 当前页数
      totalPages: '', // 总页数
      totalRecords: '', // 总条数
      pageSize: 5, // 请求条数
      isList: false, // 是否显示查询结果
      isPage: false, // 是否显示分页
      tableData: [],
      deleteId: '', // 删除id
      addForm: {
        code: '', // 新添加的参数值代码
        name: '', // 新添加的参数名称
        parentId: '' // 参数ID
      },
      rules: {
        code: [
          { required: true, message: '参数值代码不能为空', trigger: 'change' }
        ]
      },
      rulesMod: {
        configSetValueCode: [
          { required: true, message: '参数值代码不能为空', trigger: 'change' }
        ]
      },
      modifyForm: {},
      modify_form: '',
      searchOptions: [], // 搜索数据
      searchCodeOptions: [], // 搜索参数值代码数据
      selectItem: {} // 表格勾选
    }
  },
  mounted () {
  },
  methods: {
    query () {
      var datas = {
        'categoryCode': this.categoryCode,
        'code': this.code,
        'flag': this.flag,
        'current': this.current,
        'pageSize': this.pageSize
      }
      this.Loading()
      this.getDataDictionary(datas).then(resp => {
        this.closeLoading()
        this.tableData = resp.data
        console.log(this.tableData)
        this.totalPages = resp.totalPages
        this.totalRecords = resp.totalRecords
        this.isList = true
        if (this.tableData.length > 0) {
          this.isPage = true
        } else {
          this.isPage = false
        }
      }).catch(() => {
        this.open('error', '系统出错，请刷新重试！')
        this.closeLoading()
      })
    },
    handleSizeChange (val) { // 请求条数改变
      this.pageSize = val
      this.query()
    },
    modifyDictionary () { // 修改数据字典
      if (this.selectItem.length === 1) {
        this.modifyForm = this.selectItem[0]
        this.isModify = true
      } else {
        if (this.selectItem.length > 1) {
          this.open('error', '只能修改一条记录！')
        } else {
          this.open('error', '请先勾选记录！')
        }
      }
    },
    saveDictionary () { // 保存修改数据字典
      this.$refs['modifyForm'].validate((valid) => {
        if (valid) {
          var postData = {
            name: this.modifyForm.configSetValueName,
            code: this.modifyForm.configSetValueCode,
            flag: this.modifyForm.validStatus,
            id: this.modifyForm.configSetValueId
          }
          this.Loading()
          this.updataDataDictionary(postData).then(resp => {
            this.closeLoading()
            if (resp === true) {
              this.open('success', '修改成功')
              this.isModify = false
              this.query() // 修改成功显示列表
            }
          }).catch(() => {
            this.open('error', '系统出错，请刷新重试！')
            this.closeLoading()
          })
        } else {
          return false
        }
      })
    },
    Delete () { // 删除数据字典
      if (this.selectItem.length === 1) {
        this.deleteId = this.selectItem[0].configSetValueId
        this.isDelet = true
      } else {
        if (this.selectItem.length > 1) {
          this.open('error', '只能删除一条记录！')
        } else {
          this.open('error', '请先勾选记录！')
        }
      }
    },
    deleteDictionary () { // 确认删除数据字典
      this.Loading()
      this.deleteDataDictionary({'id': this.deleteId}).then(resp => {
        this.closeLoading()
        if (resp === true) {
          this.open('success', '删除成功') // 提示
          this.isDelet = false
          this.query() // 删除成功显示列表
        }
      }).catch(() => {
        this.open('error', '系统出错，请刷新重试！')
        this.closeLoading()
      })
    },
    handleCurrentChange (val) { // 分页页码改变时
      this.current = val
      this.query()
    },
    addDictionary () { // 添加数据字典
      this.$refs.addForm.validate((valid) => {
        if (valid) { // 提交
          this.Loading()
          this.addDataDictionary(this.addForm).then(resp => {
            if (resp === true) {
              this.open('success', '添加成功') // 提示
              this.query() // 添加成功显示列表
              this.cancelAdd() // 清空添加弹框内容
              this.isAdd = false
            }
          }).catch(() => {
            this.open('error', '系统出错，请刷新重试！')
            this.closeLoading()
          })
        } else { // 表单验证未成功
          return false
        }
      })
    },
    checkCode () { // 判断code是否存在
      this.checkedCode({'configSetId': this.addForm.parentId, 'configSetValueCode': this.addForm.code}).then(resp => {
        if (resp.flag === '1') { // 可以使用
          this.open('success', '参数值代码可以使用')
        } else {
          this.open('error', '参数值代码已被使用，重新输入')
          this.addForm.code = ''
        }
      })
    },
    cancelAdd () { // 取消添加数据字典并清空数值
      this.$refs.addForm.resetFields()
      this.isAdd = false
    },
    categoryCodeMethod (query) { // 参数代码输入框搜索
      console.log(query)
      this.searchCategoryCode({'codeOrName': query}).then(resp => {
        console.log(resp)
        this.searchOptions = resp
      })
    },
    codeMethod (query) { // 参数值代码输入框搜索
      this.searchCode({'codeOrName': query, 'configSetCode': this.categoryCode}).then(resp => {
        this.searchCodeOptions = resp
      })
    },
    categoryCodeMethod_add (query) { // 参数代码输入框搜索
      console.log(query)
      this.searchCategoryCode({'codeOrName': query}).then(resp => {
        console.log(resp)
        this.searchOptions = resp
      })
    },
    codeMethod_add (query) { // 参数值代码输入框搜索
      this.searchCode({'codeOrName': query}).then(resp => {
        this.searchCodeOptions = resp
      })
    },
    handleSelectionChange (row) { // table勾选
      this.selectItem = JSON.parse(JSON.stringify(row))
    },
    open (type, mesg) { // 提示
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    Loading () {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)'
      })
    },
    closeLoading () {
      this.loading.close()
    },
    ...mapActions([
      'getDataDictionary',
      'addDataDictionary',
      'deleteDataDictionary',
      'updataDataDictionary',
      'searchCategoryCode',
      'searchCode',
      'checkedCode'
    ])
  },
  components: {[LabelText.name]: LabelText, [NoticeBar.name]: NoticeBar},
  created () {
  }
}
</script>
<style lang="scss" scoped type="text/css">
  #dataDictionary {
    padding: 0px 30px 30px 30px;
  }
  .ri-line{
    margin-bottom: 10px;
  }
  .btn-container{
    margin: 20px auto 20px;
  }
  /*分页*/
  .pagination {
    text-align: center;
    margin: 0 auto;
  }
  /*修改element样式*/
  .el-form {
    margin-top: 20px;
  } 
  
</style>
<style>
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
  .mesg_form .el-form-item__error { left: 130px;}
  .el-input__icon { line-height: inherit;}
</style>

