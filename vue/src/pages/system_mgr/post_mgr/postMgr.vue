<template>
  <div id="post_manage">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>岗位管理</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-container style="height: 500px; margin-top: 10px;">
      <el-aside width="200px">
        <h4>岗位</h4>
        <p class="green">销售管理系统 --sales</p>
        <ul class="left-nav-list">
          <li class="left-nav-item" v-for="(item, index) in roleList" :key="index">
             <el-radio v-model="roleId.id" :label='item.id' @change='queryInfo()'>{{item.id}}-{{item.name}}</el-radio>
          </li>
        </ul>
        <!-- <el-row> -->
        <div class="auth-btn">
          <el-button type="primary" @click='add()'>增加岗位</el-button>
        </div>
        <div class="auth-btn">
          <el-button type="primary" @click='update()'>配置岗位</el-button>
        </div>
        <!-- </el-row> -->
      </el-aside>

      <el-container>
        <el-main>
          <h4>岗位查看</h4>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120"  label="岗位名称中文:" >
                <el-input v-model='roleInfo.name' slot="text" :disabled='disabled'></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120"  label="岗位名称英文:" >
                <el-input v-model='roleInfo.code' slot="text" :disabled='disabled'></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="岗位归属机构:" >
                <el-input v-model='roleInfo.orgCode' slot="text" :disabled='disabled'></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="有效标志:" >
                <el-select v-model='roleInfo.status' :disabled='disabled' slot="text" placeholder="请选择" >
                  <el-option
                      label="有效"
                      value="有效">
                  </el-option>
                  <el-option
                      label="无效"
                      value="无效">
                  </el-option>
                </el-select>
              </ui-label-text>
            </el-col>
          </el-row>
          <h4>销售管理系统</h4>
          <el-tree
            :data="menuList1"
            node-key="code"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys='roleArr'
            :show-checkbox="true"
            :props="defaultProps">
          </el-tree>
          <div :class='className'>
            <el-button type="primary" @click.native.prevent="put()" >提交</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true">
      <span>{{message}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import IsEmpty from '@/utils/IsEmpty'
export default {
  name: '',
  data () {
    return {
      disabled: false,
      dialogVisible: false,
      className: 'btn-container hide',
      roleId: {
      },
      roleInfo: {
      },
      roleArr: [
      ],
      roleList: {
      },
      defenuList: [],
      menuList: [],
      option: '',
      menuArr: [],
      alldata: {},
      message: '',
      defaultProps: {
        children: 'childMenus',
        label: 'label'
      },
      loading: ''
    }
  },
  mounted () {
    this.getAllPost()
  },
  watch: {
  },
  methods: {
    getAllPost () {
      this.getRoleList().then(resp => {
        console.log(resp)
        this.roleList = resp.data.data
      }).catch(error => {
        return error
      })
    },
    getAllMenu () {
      this.Loading()
      this.getMenuList().then(resp => {
        this.closeLoading()
        if (resp.data.code === '000000') {
          this.open('success', resp.data.msg)
        } else {
          this.open('warning', resp.data.msg)
        }
        this.menuList = resp.data.data
        console.log(this.menuList)
      }).catch(error => {
        this.closeLoading()
        return error
      })
    },
    queryInfo () {
      this.roleArr = []
      this.getRoleInfo(this.roleId).then(resp => {
        this.roleInfo = resp.data.data.role
        this.disabled = true
        this.className = 'btn-container hide'

        if (resp.data.data.role.status === 0) {
          this.roleInfo.status = '无效'
        } else {
          this.roleInfo.status = '有效'
        }
        console.log(resp.data.data.menu)
        this.menuList = resp.data.data.menu
        this.menuList1.forEach((val, index, valarr) => {
          if (!IsEmpty(valarr[index].childMenus)) {
            val.disabled = true
            valarr[index].childMenus.forEach((el, i, elarr) => {
              el.disabled = true
              if (el.checked === true) {
                this.roleArr.push(el.code)
              }
              if (!IsEmpty(elarr[i].childMenus)) {
                elarr[i].childMenus.forEach((item, m, childarr) => {
                  item.disabled = true
                  if (item.checked === true) {
                    this.roleArr.push(item.code)
                  }
                  if (!IsEmpty(childarr[m].childMenus)) {
                    childarr[m].childMenus.forEach((item, n, childarrL) => {
                      item.disabled = true
                      if (item.checked === true) {
                        this.roleArr.push(item.code)
                      }
                    })
                  }
                })
              }
            })
          } else if (!IsEmpty(valarr[index].childFunctions)) {
            valarr[index].childFunctions.forEach((item, m, childarr) => {
              item.disabled = true
              if (item.checked === true) {
                this.roleArr.push(item.code)
              }
            })
          }
        })
        console.log(this.roleArr)
      }).catch(error => {
        return error
      })
    },
    add () {
      this.roleArr = []
      this.option = 'add'
      this.roleInfo = {}
      this.disabled = false
      this.className = 'btn-container add'
      this.getAllMenu()
    },
    update () {
      this.roleArr = []
      this.option = 'update'
      if (this.roleId.id) {
        this.Loading()
        this.getRoleInfo(this.roleId).then(resp => {
          console.log(resp)
          this.closeLoading()
          if (resp.data.code === '000000') {
            this.open('success', resp.data.msg)
          } else {
            this.open('warning', resp.data.msg)
          }
          this.roleInfo = resp.data.data.role
          this.disabled = false
          this.className = 'btn-container update'

          if (resp.data.data.role.status === 0) {
            this.roleInfo.status = '无效'
          } else {
            this.roleInfo.status = '有效'
          }
          this.menuList = resp.data.data.menu
          if (!IsEmpty(this.menuList1)) {
            this.menuList1.forEach((val, index, valarr) => {
              if (!IsEmpty(valarr[index].childMenus)) {
                valarr[index].childMenus.forEach((el, i, elarr) => {
                  if (!IsEmpty(elarr[i].childMenus)) {
                    elarr[i].childMenus.forEach((item, m, childarr) => {
                      if (!IsEmpty(childarr[m].childFunctions)) {
                        childarr[m].childFunctions.forEach((item, n, childarrL) => {
                          if (item.checked === true) {
                            this.roleArr.push(item.code)
                          }
                        })
                      } else {
                        if (item.checked === true) {
                          this.roleArr.push(item.code)
                        }
                      }
                    })
                  } else {
                    if (el.checked === true) {
                      this.roleArr.push(el.code)
                    }
                  }
                })
              } else if (!IsEmpty(valarr[index].childFunctions)) {
                valarr[index].childFunctions.forEach((item, m, childarr) => {
                  item.disabled = true
                  if (item.checked === true) {
                    this.roleArr.push(item.code)
                  }
                })
              }
            })
          }
        }).catch(error => {
          this.closeLoading()
          return error
        })
      } else {
        this.dialogVisible = true
        this.message = '请选择一条记录'
      }
    },
    put () {
      this.alldata.code = this.roleInfo.code
      this.alldata.name = this.roleInfo.name
      this.alldata.orgCode = this.roleInfo.orgCode
      this.alldata.menus = this.$refs.tree.getCheckedKeys()
      // this.alldata.menus = this.$refs.tree.getHalfCheckedNodes()
      console.log(this.alldata)
      if (this.option === 'add') {
        this.Loading()
        this.addRole(this.alldata).then(resp => {
          this.closeLoading()
          if (resp.data.code === '000000') {
            this.open('success', resp.data.msg)
            this.alldata = {}
          } else {
            this.open('warning', resp.data.msg)
            this.alldata = {}
          }
        }).catch(error => {
          this.closeLoading()
          return error
        })
      } else if (this.option === 'update') {
        this.alldata.id = this.roleId.id
        this.Loading()
        this.updateRole(this.alldata).then(resp => {
          this.closeLoading()
          console.log(resp)
          if (resp.data.code === '000000') {
            this.open('success', resp.data.msg)
            this.alldata = {}
          } else {
            this.open('warning', resp.data.msg)
            this.alldata = {}
          }
        }).catch(error => {
          this.closeLoading()
          return error
        })
      }
    },
    open (type, mesg) {
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
      'getMenuList',
      'getRoleList',
      'getRoleInfo',
      'addRole',
      'updateRole'
    ])
  },
  handleClose (done) {
    this.dialogVisible = false
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText
  },
  created () {
  },
  computed: {
    menuList1 () {
      let temp = this.menuList
      if (!IsEmpty(temp)) {
        for (let i = 0; i < temp.length; i++) {
          if (!IsEmpty(temp[i].childMenus)) {
            for (let j = 0; j < temp[i].childMenus.length; j++) {
              if (!IsEmpty(temp[i].childMenus[j].childMenus)) {
                for (let k = 0; k < temp[i].childMenus[j].childMenus.length; k++) {
                  if (!IsEmpty(temp[i].childMenus[j].childMenus[k].childFunctions)) {
                    temp[i].childMenus[j].childMenus[k].childMenus = temp[i].childMenus[j].childMenus[k].childFunctions
                    for (let m = 0; m < temp[i].childMenus[j].childMenus[k].childMenus.length; m++) {
                      temp[i].childMenus[j].childMenus[k].childMenus[m]['label'] = temp[i].childMenus[j].childMenus[k].childMenus[m].name
                    }
                  }
                }
              } else if (!IsEmpty(temp[i].childMenus[j].childFunctions)) {
                temp[i].childMenus[j].childMenus = temp[i].childMenus[j].childFunctions
                for (let m = 0; m < temp[i].childMenus[j].childMenus.length; m++) {
                  temp[i].childMenus[j].childMenus[m]['label'] = temp[i].childMenus[j].childMenus[m].name
                }
              }
            }
          } else if (!IsEmpty(temp[i].childFunctions)) {
            temp[i].childMenus = temp[i].childFunctions
            for (let m = 0; m < temp[i].childMenus.length; m++) {
              temp[i].childMenus[m]['label'] = temp[i].childMenus[m].name
            }
          }
        }
        console.log(temp)
        return temp
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="scss" type="text/css">
#post_manage {
  padding-left: 30px;
  padding-right: 30px;

  .el-aside h4 {
    margin-bottom: 10px;
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

  .left-nav-list {
    list-style: none;
    padding: 0;
  }

  .left-nav-item {
    margin: 4px 0;
    padding: 6px 10px;
    &:hover, &:focus, &:visited, &:link {
      background: #ecf5ff;
    }
  }

  .green {
    color: #328400;
    margin-top: 0;
  }
  .hide {
    display: none;
  }
  .auth-btn {
    margin-bottom: 6px
  }
}


</style>
