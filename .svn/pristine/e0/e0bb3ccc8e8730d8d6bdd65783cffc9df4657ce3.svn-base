<template>
<div ref="FirstAllocation">
  <el-form-item>
    <ui-label-text labelWidth="80" label="费用类别:">
      <el-select slot="text" v-model="firstRate.firstrateData">
        <el-option v-for="(item,index) in firstrateList" :key="'list-'+index" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </ui-label-text>
  </el-form-item>
  <el-checkbox-group v-model="checklistModel" class="checkgroup checkboxList">
    <el-checkbox disabled class="checkboxpColor" label="flag11" v-show="firstRate.firstrateData==1">规模保费</el-checkbox>
    <el-checkbox @change="getcheckboxValue" :disabled="firstRate.title === 0" :class="{checkboxpColor: firstRate.title === 0}"
    v-for="(items,index) in checkList[firstRate.firstrateData]" :label="items.flag" :key="'list2-'+index">{{items.menu}}</el-checkbox>
  </el-checkbox-group>
  <div style="color: red; margin: 5px 0 20px; " v-show="firstRate.firstrateData==1">注:若服务费率与标准保费档次有关，请在服务费率中导入中配置 </div>
  <el-container class="coopContent coopMargin">
    <el-header>计算公式</el-header>
    <div style="padding: 20px;">
    <!-- 标准保费计算系数13 开始-->
    <div v-show="checklistModel.includes('flag13')==true&&firstRate.firstrateData==1">
      <ui-label-text label="标准保费=规模保费*系数："></ui-label-text>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxfirstList.list1" :key="'list3-'+index">
        <ui-label-text label="缴费年期范围："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.jfnqfw1" @blur="getinputValue"></el-input>
          <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.jfnqfw2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="系数："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.jfnqxs" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="firstRate.title === 1"
        @click="addcheckBox(checkboxfirstList.list1)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="firstRate.title === 1"
        @click="deletecheckBox(checkboxfirstList.list1)"></el-button>
      </div>
    </div>
    <!-- 费率23 开始-->
    <div v-show="checklistModel.includes('flag23')==true&&firstRate.firstrateData==2">
      <ui-label-text label="标准保费或协议保费=规模保费*系数："></ui-label-text>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxfirstList.list2" :key="'list4-'+index">
        <ui-label-text label="缴费年期范围："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.jfnqfw1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.jfnqfw2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="系数："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.jfnqxs" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="firstRate.title === 1"
        @click="addcheckBox(checkboxfirstList.list2)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="firstRate.title === 1"
        @click="deletecheckBox(checkboxfirstList.list2)"></el-button>
      </div>
      <ui-label-text label="费率与档次关系配置："></ui-label-text>
      <div class="mg10">
        <el-form-item prop="insurerType">
          <ui-label-text labelWidth="80" label="档次设置（万元）：" >
            <el-select :disabled="firstRate.title === 0"
            slot="text" v-model="firstRate.gradesettingSupply" @change="getselectValue">
                <el-option v-for="(item,index) in gradeSetting" :key="'list41-'+index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </ui-label-text>
        </el-form-item>
      </div>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxfirstList.list3" :key="'list5-'+index">
        <ui-label-text label="适用范围："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.syfw1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.syfw2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="费率："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.syfwfl" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="firstRate.title === 1"
        @click="addcheckBox(checkboxfirstList.list3)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="firstRate.title === 1"
        @click="deletecheckBox(checkboxfirstList.list3)"></el-button>
      </div>
    </div>
    <!-- 是否限制缴费年期22 开始-->
    <div v-show="checklistModel.includes('flag22')==true&&firstRate.firstrateData==2">
      <ui-label-text label="缴费年期限制："></ui-label-text>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxfirstList.list4" :key="'list6-'+index">
        <ui-label-text label="年期范围："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.nqfw1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.nqfw2" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="firstRate.title === 1"
        @click="addcheckBox(checkboxfirstList.list4)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="firstRate.title === 1"
        @click="deletecheckBox(checkboxfirstList.list4)"></el-button>
      </div>    
    </div>
    <!-- 费率32 开始-->
    <div v-show="checklistModel.includes('flag32')==true&&firstRate.firstrateData==3">
      <ui-label-text label="标准保费或协议保费=规模保费*系数："></ui-label-text>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxfirstList.list5" :key="'list32-'+index">
        <ui-label-text label="缴费年期范围："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.jfnqfw1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.jfnqfw2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="系数："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.jfnqxs" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="firstRate.title === 1"
        @click="addcheckBox(checkboxfirstList.list5)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="firstRate.title === 1"
        @click="deletecheckBox(checkboxfirstList.list5)"></el-button>
      </div>
      <ui-label-text label="费率与档次关系配置："></ui-label-text>
      <div class="mg10">
        <ui-label-text labelWidth="80" label="档次设置（万元）：" >
          <el-select :disabled="firstRate.title === 0"
          slot="text" v-model="firstRate.gradesettingAward" @change="getselectValue">
              <el-option v-for="(item,index) in gradeSetting" :key="'list33-'+index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </ui-label-text>
      </div>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxfirstList.list6" :key="'list34-'+index">
        <ui-label-text label="适用范围："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.syfw1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.syfw2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="费率："></ui-label-text>
        <el-input :readonly="firstRate.title === 0" v-model="item.syfwfl" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="firstRate.title === 1"
        @click="addcheckBox(checkboxfirstList.list6)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="firstRate.title === 1"
        @click="deletecheckBox(checkboxfirstList.list6)"></el-button>
      </div>
    </div>
    <!-- 激励费率41 开始-->
    <div v-show="checklistModel.includes('flag41')==true&&firstRate.firstrateData==4">
      <div class="incentiveRate mg10" v-for="(item,index) in checkboxfirstList.list7" :key="'list41-'+index">
        <ui-label-text labelWidth="80" label="专票税率：">
          <el-select :disabled="firstRate.title === 0" placeholder="请选择"
          slot="text" v-model="item.zpsl" @change="getinputValue">
              <el-option label="3%" value="3"></el-option><el-option label="6%" value="6"></el-option>
          </el-select>
        </ui-label-text><div style="width: 20px;"></div>
        <ui-label-text labelWidth="80" label="激励费率：">
          <el-select :disabled="firstRate.title === 0" placeholder="请选择"
          slot="text" v-model="item.jlfl" @change="getinputValue">
              <el-option label="3%" value="3"></el-option><el-option label="6%" value="6"></el-option>
          </el-select>
        </ui-label-text>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="firstRate.title === 1"
        @click="addcheckBox2(checkboxfirstList.list7)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="firstRate.title === 1"
        @click="deletecheckBox(checkboxfirstList.list7)"></el-button>
      </div>
    </div>
  </div>
  <el-footer><div class="tips" v-show="firstRate.firstrateData==(index+1)" v-for="(item,index) in firstrateList" :key="'list7-'+index">{{item.msg}}</div></el-footer>
</el-container>
<ui-label-text label="首期手续费=首年基础服务费+补充手续费+平台奖励费用+增值税专票抵扣费用"></ui-label-text>
</div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'

export default {
  props: ['allModel'],
  data () {
    return {
      sonallModel: this.allModel,
      firstRate: {
        title: 1,
        firstrateData: '1', // 费用类别
        gradesettingSupply: '1', // 档次设置2
        gradesettingAward: '1' // 档次设置3
      },
      firstrateList: [
        {label: '首年基础服务费', value: '1', msg: '首年基础服务费=规模保费*费率'},
        {label: '补充手续费', value: '2', msg: '补充手续费=规模保费*费率或者补充手续费=标准保费*费率'},
        {label: '平台奖励费用', value: '3', msg: '平台奖励费用=规模保费*费率'},
        {label: '增值税专票抵扣费用', value: '4', msg: '增值专票抵扣费用=首期基础服务费*激励费率'}
      ],
      gradeSetting: [
        {label: '请选择', value: '0'},
        {label: '标准保费', value: '1'},
        {label: '协议保费', value: '2'},
        {label: '规模保费', value: '3'}
      ],
      checkList: [
        ['不可删除'],
        [
          {menu: '服务费率', flag: 'flag12'},
          {menu: '标准保费计算系数', flag: 'flag13'}
        ],
        [
          {menu: '规模保费', flag: 'flag21'},
          {menu: '是否限制缴费年期', flag: 'flag22'},
          {menu: '费率', flag: 'flag23'},
          {menu: '标准保费', flag: 'flag25'}
        ],
        [
          {menu: '规模保费', flag: 'flag31'},
          {menu: '费率', flag: 'flag32'}
        ],
        [
          {menu: '激励费率', flag: 'flag41'},
          {menu: '首期基础服务费', flag: 'flag42'}
        ]
      ],
      checklistModel: ['flag11'],
      checkboxfirstList: {
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list6: [],
        list7: []
      }
    }
  },
  methods: {
    notNull (obj) {
      if (obj === null || obj === undefined || obj === '') {
        return false
      }
    },
    removeEmpty (obj, arr) {
      for (var key in obj) {
        if (obj[key] !== null) {
          arr.push(obj)
          break
        }
      }
    },
    loadingData (ams) {
      this.notNull(ams)
      this.firstRate.title = ams.title
      this.firstRate.firstrateData = ams.firstrateData
      this.firstRate.gradesettingSupply = ams.flag24
      this.firstRate.gradesettingAward = ams.flag33
      Object.keys(ams).forEach(key => { // 回显 复选框
        if (key.includes('flag') === true && Array.isArray(key) !== true && key !== null) {
          if (ams[key] === '1') {
            this.checklistModel.push(key)
            this.checklistModel = Array.from(new Set(this.checklistModel))
          }
        }
      })
      let ab = ams.baseCoolifefeecongigdetailhisList
      if (ab !== undefined) {
        if (ab.length !== 0) {
          if (ab[0] !== undefined) {
            ab[0].feedetailList.forEach(e => {
              let obj = {}
              obj.jfnqfw1 = e.jfnqfw1
              obj.jfnqfw2 = e.jfnqfw2
              obj.jfnqxs = e.jfnqxs
              this.removeEmpty(obj, this.checkboxfirstList.list1)
            })
          }
          if (ab[1] !== undefined) {
            ab[1].feedetailList.forEach(e => {
              let obj = {}
              obj.jfnqfw1 = e.jfnqfw1
              obj.jfnqfw2 = e.jfnqfw2
              obj.jfnqxs = e.jfnqxs
              let obj2 = {}
              obj2.syfw1 = e.syfw1
              obj2.syfw2 = e.syfw2
              obj2.syfwfl = e.syfwfl
              let obj3 = {}
              obj3.nqfw1 = e.nqfw1
              obj3.nqfw2 = e.nqfw2
              this.removeEmpty(obj, this.checkboxfirstList.list2)
              this.removeEmpty(obj2, this.checkboxfirstList.list3)
              this.removeEmpty(obj3, this.checkboxfirstList.list4)
            })
          }
          if (ab[2] !== undefined) {
            ab[2].feedetailList.forEach(e => {
              let obj = {}
              obj.jfnqfw1 = e.jfnqfw1
              obj.jfnqfw2 = e.jfnqfw2
              obj.jfnqxs = e.jfnqxs
              let obj2 = {}
              obj2.syfw1 = e.syfw1
              obj2.syfw2 = e.syfw2
              obj2.syfwfl = e.syfwfl
              this.removeEmpty(obj, this.checkboxfirstList.list5)
              this.removeEmpty(obj2, this.checkboxfirstList.list6)
            })
          }
          if (ab[3] !== undefined) {
            ab[3].feedetailList.forEach(e => {
              let obj = {}
              obj.zpsl = e.zpsl
              obj.jlfl = e.jlfl
              this.removeEmpty(obj, this.checkboxfirstList.list7)
            })
          }
        }
      }
    },
    getcheckboxValue () {
      this.$emit('getfirstData1', {
        checklistModel: this.checklistModel, // 费用类别
        gradeSetting: this.firstRate, // 档次设置
        checkboxfirstList: this.checkboxfirstList // 添加数据
      })
      this.$emit('getfirstData2', {
        checklistModel: this.checklistModel, // 费用类别
        gradeSetting: this.firstRate, // 档次设置
        checkboxfirstList: this.checkboxfirstList // 添加数据
      })
      this.$emit('getfirstData3', {
        checklistModel: this.checklistModel, // 费用类别
        gradeSetting: this.firstRate, // 档次设置
        checkboxfirstList: this.checkboxfirstList // 添加数据
      })
    },
    getinputValue () { // 计算公式
      this.$emit('getfirstData1', {
        checkboxfirstList: this.checkboxfirstList, // 添加数据
        gradeSetting: this.firstRate // 档次设置
      })
      this.$emit('getfirstData2', {
        checkboxfirstList: this.checkboxfirstList,
        gradeSetting: this.firstRate // 档次设置
      })
      this.$emit('getfirstData3', {
        checkboxfirstList: this.checkboxfirstList,
        gradeSetting: this.firstRate // 档次设置
      })
    },
    getselectValue () {
      this.$emit('getfirstData1', {
        checkboxfirstList: this.checkboxfirstList, // 添加数据
        gradeSetting: this.firstRate // 档次设置
      })
      this.$emit('getfirstData2', {
        checkboxfirstList: this.checkboxfirstList, // 添加数据
        gradeSetting: this.firstRate // 档次设置
      })
      this.$emit('getfirstData3', {
        checkboxfirstList: this.checkboxfirstList, // 添加数据
        gradeSetting: this.firstRate // 档次设置
      })
    },
    addcheckBox (e) {
      e.push({})
    },
    addcheckBox2 (e) {
      e.push({})
    },
    deletecheckBox (e) {
      e.pop(1)
    },
    creatModel (obj) {
      if (obj !== '' && obj !== null && obj !== undefined) {
        this.loadingData(obj)
      }
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  watch: {
    checklistModel: {
      handler (newValue, oldValue) {
        if (newValue.includes('flag12') && newValue.includes('flag13')) {
          if (newValue[newValue.length - 1] === 'flag12') {
            newValue.splice(newValue.indexOf('flag13'), 1)
          } else {
            newValue.splice(newValue.indexOf('flag12'), 1)
          }
        }
        if (newValue.includes('flag21') && newValue.includes('flag25')) {
          if (newValue[newValue.length - 1] === 'flag21') {
            newValue.splice(newValue.indexOf('flag25'), 1)
          } else {
            newValue.splice(newValue.indexOf('flag21'), 1)
          }
        }
        this.$emit('getfirstData1', {
          checklistModel: this.checklistModel, // 费用类别
          gradeSetting: this.firstRate, // 档次设置
          checkboxfirstList: this.checkboxfirstList // 添加数据
        })
      },
      deep: true
    },
    allModel: {
      handler (newValue, oldValue) {
        this.checklistModel = ['flag11']
        this.checkboxfirstList = {
          list1: [],
          list2: [],
          list3: [],
          list4: [],
          list5: [],
          list6: [],
          list7: []
        }
        this.creatModel(newValue)
      },
      deep: true
    }
  },
  mounted () {
    this.creatModel(this.sonallModel)
  }
}
</script>
<style lang="scss" scoped type="text/css">
.incentiveRate{ display: flex; justify-content: flex-start; }
.incentiveRate .el-input { height: 30px; padding: 0 6px; width: 110px !important; }
.checkboxlistCenter { display: flex; justify-content: flex-start; align-items: center; margin: 10px 0;}
.checkboxlistCenter .el-input { width: 60px; }
.el-button--small {width: 50px;}
.addIcon{ display: flex; justify-content: flex-end; margin-right: 12px; }
.coopMargin { margin-top: 20px; }
.checkboxList { display: flex; justify-content: flex-start; }
.el-footer{height: auto!important;}
.marginlr { margin-left: 20px; }
.mg10 { margin: 10px 0; }
.tips { width: 70%; line-height: 30px; margin: 20px 0; padding-left: 10px; border: 1px solid #dcdfe6; }
</style>
<style>
.checkboxpColor span{ color: #409EFF !important; }
</style>
