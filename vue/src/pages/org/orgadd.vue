<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>机构管理</el-breadcrumb-item>
            <el-breadcrumb-item>机构新增</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>机构新增
            </span>
            <div class="ri-content" slot="content" >
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="机构代码:" text="系统自动编码" >
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text :required="true" labelWidth="120" :text="info.idno" label="机构名称:" >
                    <el-input v-model="info.orgname" slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text :required="true"  labelWidth="120" label="所属省份:" >
                  <el-select v-model="info.province" slot="text" placeholder="请选择">
                    <el-option
                        label="上海市"
                        value="上海市">
                    </el-option>
                  </el-select>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                <ui-label-text :required="true"  labelWidth="120" label="所属城市:" >
                  <el-select v-model="info.city" slot="text" placeholder="请选择">
                    <el-option
                        label="上海市"
                        value="上海市">
                    </el-option>
                  </el-select>
                </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text :required="true"  labelWidth="120" label="地址:" >
                  <el-input v-model="info.addr" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="邮编:" >
                    <el-input v-model="info.postcode" slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="电话:" >
                  <el-input v-model="info.tel" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="传真:" >
                    <el-input v-model="info.tele" slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="成立日期:" >
                  <el-date-picker type="date" v-model="info.createdate" slot="text" ></el-date-picker>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="负责人:" >
                    <el-input v-model="info.responsor" slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="上级机构代码:" >
                  <el-input v-model="info.refno" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="上级机构名称:" text="上海分公司" >
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="机构级别:" >
                   <el-select v-model="info.reflevel" slot="text" placeholder="请选择">
                    <el-option
                        label="甲级"
                        value="1">
                    </el-option>
                    <el-option
                        label="乙级"
                        value="2">
                    </el-option>
                    <el-option
                        label="丙级"
                        value="3">
                    </el-option>
                  </el-select>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="保监批准文号:" >
                    <el-input v-model="info.aproveno" slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="许可证编号:" >
                  <el-input v-model="info.licenseno" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="营业执照注册号:" >
                    <el-input v-model="info.registorno" slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="组织机构代码:" >
                  <el-input v-model="info.orgcode" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="税务记证号:" >
                    <el-input v-model="info.taxno" slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="开户许可证编号:" >
                  <el-input v-model="info.opencode" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="24">
                <ui-label-text labelWidth="120" label="备注:" >
                  <el-input type="textarea" autosize  v-model="info.extra" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
              </el-row>
            </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>营改增信息
            </span>
            <div class="ri-content" slot="content" >
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text :required="true"  labelWidth="120" label="纳税人身份:" >
                   <el-select v-model="info.taxtype" slot="text" placeholder="请选择">
                    <el-option
                        label="一般纳税人"
                        value="1">
                    </el-option>
                    <el-option
                        label="海外纳税人"
                        value="2">
                    </el-option>
                    <el-option
                        label="集体纳税人"
                        value="3">
                    </el-option>
                  </el-select>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="适用税率:" >
                    <el-select v-model="info.taxrate" slot="text" placeholder="请选择">
                    <el-option
                        label="6%"
                        value="1">
                    </el-option>
                    <el-option
                        label="9%"
                        value="2">
                    </el-option>
                    <el-option
                        label="12%"
                        value="3">
                    </el-option>
                  </el-select>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="纳税人识别号:" >
                  <el-input v-model="info.texidno" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="纳税人地址:" >
                    <el-input v-model="info.taxaddr" slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="纳税人电话:" >
                  <el-input v-model="info.taxtel" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="纳税人开户行:" >
                    <el-input v-model="info.taxbank" slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                <ui-label-text labelWidth="120" label="纳税人银行卡号:" >
                  <el-input v-model="info.taxbankcard" slot="text" ></el-input>
                </ui-label-text>
                </el-col>
              </el-row>
            </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>证照情况
            </span>
            <div class="ri-content" slot="content" >
              <el-upload
                class="upload-demo"
                action="https://localhost:8082"
                :file-list="fileList"
                list-type="picture-card">
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>
        </ui-line-tittle>
      <div class="btn-container" slot="controlbar" >
          <el-button @click.native.prevent="put()">提交</el-button>
      </div>

  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      info: {
      },
      fileList: []
    }
  },
  mounted () {
  },
  methods: {
    put () {
      this.addOrg(this.info)
    },
    ...mapActions([
      'addOrg'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  created () {
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
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
