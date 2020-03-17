<template>
<div ref="RenewalAllocation">
  <el-form-item>
    <ui-label-text labelWidth="80" label="费用类别:" >
      <el-select slot="text" v-model="renewalRate.renewalrateData">
        <el-option v-for="(item,index) in renewalrateList" :key="'list-'+index" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </ui-label-text>
  </el-form-item>
  <el-checkbox-group v-model="checklistModel" class="checkgroup checkboxList">
    <el-checkbox @change="getcheckboxValue" :disabled="renewalRate.title === 0" :class="{checkboxpColor: renewalRate.title === 0}"
    v-for="(items,index) in checkList[renewalRate.renewalrateData]" :label="items.flag" :key="'list2-'+index">{{items.menu}}</el-checkbox>
  </el-checkbox-group>
  <div style="color: red; margin: 5px 0 20px; " v-show="renewalRate.renewalrateData==1">注:若服务费率与标准保费档次或继续率有关，请在服务费率中导入中配置</div>
  <el-container class="coopContent coopMargin">
    <el-header>计算公式</el-header>
    <div style="padding: 20px;">
    <!-- 费率是否与标保档次有关53 开始-->
    <div v-show="checklistModel.includes('flag53')==true&&renewalRate.renewalrateData==1">
      <ui-label-text label="标准保费=规模保费*系数："></ui-label-text>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxrenewList.list1" :key="'list53-'+index">
        <ui-label-text label="缴费年期范围："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jfnqfw1" @blur="getinputValue"></el-input>
          <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jfnqfw2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="系数："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jfnqxs" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="renewalRate.title === 1"
        @click="addcheckBox(checkboxrenewList.list1)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="renewalRate.title === 1"
        @click="deletecheckBox(checkboxrenewList.list1)"></el-button>
      </div>    
    </div>
    <!-- 是否根据继续区间调节比例 54 开始-->
    <div v-show="checklistModel.includes('flag54')==true&&renewalRate.renewalrateData==1">
      <div class="mg10">
        <el-form-item prop="insurerType">
          <ui-label-text labelWidth="80" label="继续率类别：" @change="getselectValue">
            <el-select :disabled="renewalRate.title === 0"
            slot="text" v-model="renewalRate.continuityCategory1" @change="getselectValue">
                <el-option v-for="(item,index) in gradeSetting" :key="'list54-'+index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </ui-label-text>
        </el-form-item>
      </div>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxrenewList.list2" :key="'list55-'+index">
        <ui-label-text label="继续费率区间："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jxlqj1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jxlqj2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="调节比例："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.tjbl" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="renewalRate.title === 1"
        @click="addcheckBox(checkboxrenewList.list2)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="renewalRate.title === 1"
        @click="deletecheckBox(checkboxrenewList.list2)"></el-button>
      </div>
    </div>
    <!-- 是否根据继续区间调节比例63 开始-->
    <div v-show="checklistModel.includes('flag63')==true&&renewalRate.renewalrateData==2">
      <div class="mg10">
        <el-form-item prop="insurerType">
          <ui-label-text labelWidth="80" label="继续率类别：" @change="getselectValue">
            <el-select :disabled="renewalRate.title === 0"
            slot="text" v-model="renewalRate.continuityCategory2" @change="getselectValue">
                <el-option v-for="(item,index) in gradeSetting" :key="'list63-'+index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </ui-label-text>
        </el-form-item>
      </div>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxrenewList.list3" :key="'list64-'+index">
        <ui-label-text label="继续费率区间："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jxlqj1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jxlqj2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="调节比例："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.tjbl" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="renewalRate.title === 1"
        @click="addcheckBox(checkboxrenewList.list3)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="renewalRate.title === 1"
        @click="deletecheckBox(checkboxrenewList.list3)"></el-button>
      </div>
    </div>
    <!-- 继续率奖金率72 开始-->
    <div class="mg10" v-show="checklistModel.includes('flag72')==true&&renewalRate.renewalrateData==3">
      <div class="mg10">
        <el-form-item prop="insurerType">
          <ui-label-text labelWidth="80" label="继续率类别：" @change="getselectValue">
            <el-select :disabled="renewalRate.title === 0"
            slot="text" v-model="renewalRate.continuityCategory3" @change="getselectValue">
                <el-option v-for="(item,index) in gradeSetting" :key="'list721-'+index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </ui-label-text>
        </el-form-item>
      </div>
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxrenewList.list4" :key="'list72-'+index">
        <ui-label-text label="继续率范围："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jxlqj1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jxlqj2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="继续率奖金率："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jxljjl" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="renewalRate.title === 1"
        @click="addcheckBox(checkboxrenewList.list4)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="renewalRate.title === 1"
        @click="deletecheckBox(checkboxrenewList.list4)"></el-button>
      </div>
    </div>
    <!-- 年期别换算系数73 开始-->
    <div class="mg10" v-show="checklistModel.includes('flag73')==true&&renewalRate.renewalrateData==3">
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxrenewList.list5" :key="'list73-'+index">
        <ui-label-text label="年期范围："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.nqfw1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.nqfw2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="换算系数："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.jfnqxs" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="renewalRate.title === 1"
        @click="addcheckBox(checkboxrenewList.list5)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="renewalRate.title === 1"
        @click="deletecheckBox(checkboxrenewList.list5)"></el-button>
      </div>
    </div>
    <!-- 是否根据规模保费达成情况增加费率74 开始-->
    <div class="mg10" v-show="checklistModel.includes('flag74')==true&&renewalRate.renewalrateData==3">
      <div class="checkboxlistCenter" v-for="(item,index) in checkboxrenewList.list6" :key="'list741-'+index">
        <ui-label-text label="规模保费范围："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.gmbffw1" @blur="getinputValue"></el-input>
        <ui-label-text label="-"></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.gmbffw2" @blur="getinputValue"></el-input>
        <ui-label-text class="marginlr" label="增加奖金率："></ui-label-text>
        <el-input :readonly="renewalRate.title === 0" v-model="item.zjjjl" @blur="getinputValue"></el-input>
      </div>
      <div class="addIcon">
        <el-button size="small" icon="el-icon-plus" v-show="renewalRate.title === 1"
        @click="addcheckBox(checkboxrenewList.list6)"></el-button>
        <el-button size="small" icon="el-icon-minus" v-show="renewalRate.title === 1"
        @click="deletecheckBox(checkboxrenewList.list6)"></el-button>
      </div>
    </div>
  </div>
  <el-footer>
    <div class="tips" v-show="renewalRate.renewalrateData==(index+1)" v-for="(item,index) in renewalrateList" :key="'list99-'+index">{{item.msg}}</div>
    <div style="color: red; margin: 5px 0;" v-show="renewalRate.renewalrateData==(index+1)" v-for="(item,index) in renewalrateList" :key="'list98-'+index">{{item.msgred}}</div>
  </el-footer>
</el-container>
<ui-label-text label="续期服务费计算公式："></ui-label-text>
<ui-label-text label="续期服务费=续期基础服务费+续期服务津贴+继续率奖金"></ui-label-text>
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
      renewalRate: {
        title: 1,
        renewalrateData: '1',
        continuityCategory1: '1',
        continuityCategory2: '1',
        continuityCategory3: '1'
      },
      renewalrateList: [
        {
          label: '续期基础服务费',
          value: '1',
          msg: '续期基础服务费=规模保费*费率*调节比例',
          msgred: '注:不勾选“是否根据继续区间调节比例”时，调节比例默认为1'
        },
        {
          label: '续期服务津贴',
          value: '2',
          msg: '续期服务津贴=规模保费*费率*调节比例',
          msgred: '注:不勾选“是否根据继续区间调节比例”时，调节比例默认为1'
        },
        {
          label: '继续率奖金',
          value: '3',
          msg: '继续率奖金=继续率奖金率*规模保费*年期换算系数*(1+增加奖金率)',
          msgred: '注:不勾选“是否根据规模保费达成情况增加费率”时，增加奖金率默认为0'
        }
      ],
      gradeSetting: [
        {label: '请选择', value: '0'},
        {label: 'R13', value: '1'},
        {label: 'R25', value: '2'},
        {label: 'R37', value: '3'},
        {label: 'R49', value: '4'}
      ],
      checkList: [
        ['不可删除'],
        [
          {menu: '规模保费', flag: 'flag51'},
          {menu: '费率', flag: 'flag52'},
          {menu: '费率是否与标保档次有关', flag: 'flag53'},
          {menu: '是否根据继续区间调节比例 ', flag: 'flag54'},
          {menu: '费率是否与继续率有关 ', flag: 'flag56'}
        ],
        [
          {menu: '规模保费', flag: 'flag61'},
          {menu: '费率', flag: 'flag62'},
          {menu: '是否根据继续区间调节比例 ', flag: 'flag63'}
        ],
        [
          {menu: '规模保费', flag: 'flag71'},
          {menu: '继续率奖金率', flag: 'flag72'},
          {menu: '年期别换算系数', flag: 'flag73'},
          {menu: '是否根据规模保费达成情况增加费率  ', flag: 'flag74'}
        ]
      ],
      checklistModel: [],
      checkboxrenewList: {
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list6: []
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
      this.renewalRate.title = ams.title
      this.renewalRate.renewalrateData = ams.renewalrateData
      this.renewalRate.continuityCategory1 = ams.flag55
      this.renewalRate.continuityCategory2 = ams.flag64
      this.renewalRate.continuityCategory3 = ams.flag75
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
              let obj2 = {}
              obj2.jxlqj1 = e.jxlqj1
              obj2.jxlqj2 = e.jxlqj2
              obj2.tjbl = e.tjbl
              this.removeEmpty(obj, this.checkboxrenewList.list1)
              this.removeEmpty(obj2, this.checkboxrenewList.list2)
            })
          }
          if (ab[1] !== undefined) {
            ab[1].feedetailList.forEach(e => {
              let obj = {}
              obj.jxlqj1 = e.jxlqj1
              obj.jxlqj2 = e.jxlqj2
              obj.tjbl = e.tjbl
              this.removeEmpty(obj, this.checkboxrenewList.list3)
            })
          }
          if (ab[2] !== undefined) {
            ab[2].feedetailList.forEach(e => {
              let obj = {}
              obj.jxlqj1 = e.jxlqj1
              obj.jxlqj2 = e.jxlqj2
              obj.jxljjl = e.jxljjl
              let obj2 = {}
              obj2.nqfw1 = e.nqfw1
              obj2.nqfw2 = e.nqfw2
              obj2.jfnqxs = e.jfnqxs
              let obj3 = {}
              obj3.gmbffw1 = e.gmbffw1
              obj3.gmbffw2 = e.gmbffw2
              obj3.zjjjl = e.zjjjl
              this.removeEmpty(obj, this.checkboxrenewList.list4)
              this.removeEmpty(obj2, this.checkboxrenewList.list5)
              this.removeEmpty(obj3, this.checkboxrenewList.list6)
            })
          }
        }
      }
    },
    getcheckboxValue () {
      this.$emit('getrenewalData1', {
        checklistModel: this.checklistModel, // 费用类别
        gradeSetting: this.renewalRate, // 继续率类别
        checkboxrenewList: this.checkboxrenewList // 添加数据
      })
      this.$emit('getrenewalData2', {
        checklistModel: this.checklistModel, // 费用类别
        gradeSetting: this.renewalRate, // 继续率类别
        checkboxrenewList: this.checkboxrenewList // 添加数据
      })
    },
    getinputValue () { // 计算公式
      this.$emit('getrenewalData1', {
        checkboxrenewList: this.checkboxrenewList, // 添加数据
        gradeSetting: this.renewalRate // 继续率类别
      })
      this.$emit('getrenewalData2', {
        checkboxrenewList: this.checkboxrenewList, //
        gradeSetting: this.renewalRate // 继续率类别
      })
    },
    getselectValue () {
      this.$emit('getrenewalData1', {
        checkboxrenewList: this.checkboxrenewList, // 添加数据
        gradeSetting: this.renewalRate // 继续率类别
      })
      this.$emit('getrenewalData2', {
        checkboxrenewList: this.checkboxrenewList, // 添加数据
        gradeSetting: this.renewalRate // 继续率类别
      })
    },
    addcheckBox (e) {
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
        if (newValue.includes('flag52') && newValue.includes('flag53')) {
          if (newValue[newValue.length - 1] === 'flag52') {
            newValue.splice(newValue.indexOf('flag53'), 1)
          } else {
            newValue.splice(newValue.indexOf('flag52'), 1)
          }
        } else if (newValue.includes('flag52') && newValue.includes('flag56')) {
          if (newValue[newValue.length - 1] === 'flag52') {
            newValue.splice(newValue.indexOf('flag56'), 1)
          } else {
            newValue.splice(newValue.indexOf('flag52'), 1)
          }
        } else if (newValue.includes('flag53') && newValue.includes('flag56')) {
          if (newValue[newValue.length - 1] === 'flag53') {
            newValue.splice(newValue.indexOf('flag56'), 1)
          } else {
            newValue.splice(newValue.indexOf('flag53'), 1)
          }
        }
        this.$emit('getrenewalData1', {
          checklistModel: this.checklistModel, // 费用类别
          gradeSetting: this.renewalRate, // 继续率类别
          checkboxrenewList: this.checkboxrenewList // 添加数据
        })
      },
      deep: true
    },
    allModel: {
      handler (newValue, oldValue) {
        this.checklistModel = []
        this.checkboxrenewList = {
          list1: [],
          list2: [],
          list3: [],
          list4: [],
          list5: [],
          list6: []
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
.tips { width: 70%; line-height: 30px; padding-left: 10px; border: 1px solid #dcdfe6; }
</style>
<style>
.checkboxpColor span{ color: #409EFF !important; }
</style>
