<template>
  <div id="riskForm" >
      <div class="risk-dialog-wrapper">
        <div class="ri-content" slot="content" >
        <el-form :model="info" :rules="rules" ref="optionForm" :disabled="option==='detail'" :validate-on-rule-change="false">
        <el-row class="ri-line">
          <el-col :span="12">
            <!-- :text="info.typeName" -->
          <ui-label-text :required="true" labelWidth="184" label="产品类别:" prop="typeName" >
            <el-select v-model="info.type" slot="text" placeholder="请选择" :disabled='modDisable' >
              <el-option
                v-for="item in cplbList"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
          </ui-label-text>
          </el-col>
         </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="insurerCode" >
            <ui-label-text :required="true" labelWidth="184" label="保险公司代码:">
              <el-input v-model="info.insurerCode" slot="text" placeholder="双击可选择"  :disabled='modDisable' clearable @dblclick.native="dbqueryCom"  >
              </el-input>
            </ui-label-text>
              </el-form-item>
         
            </el-col>
            <el-col :span="12">
                <el-form-item prop="insurerName" >
                  <ui-label-text :required="true" labelWidth="184" label="保险公司名称:" >
                  <el-input v-model="info.insurerName" placeholder="双击可选择" slot="text" :disabled='modDisable' clearable @dblclick.native="dbqueryCom"></el-input>
                   </ui-label-text>
                </el-form-item>
             
            </el-col>
          </el-row>
          <!-- <el-row class="ri-line">
            <el-col :span="12">
            <ui-label-text labelWidth="184" label="产品类别:" :text="info.typeName" >

            </ui-label-text>
            </el-col>
          </el-row> -->
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="riskCode" >
                <ui-label-text :required="true" labelWidth="184" label="险种代码:" >
                <el-input v-model="info.riskCode" placeholder="" slot="text" :disabled='modDisable' clearable></el-input>
                </ui-label-text>
              </el-form-item>
     
            </el-col>
            <el-col :span="12">
              <el-form-item prop="riskName" >
              <ui-label-text :required="true" labelWidth="184" label=" 险种名称 :" >
                <el-input v-model="info.riskName" placeholder="" slot="text" clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="classBigCode" >
                <ui-label-text :required="true" labelWidth="184" label="险种类别（大类）:" >
                <el-select v-model="info.classBigCode" placeholder="请选择" slot="text" @change="indexSelect($event)">
                  <el-option
                    v-for="item in classBigNameList"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="classSmallCode" >
                <ui-label-text :required="true" labelWidth="184" label="险种类别（小类）:" >
                <el-select v-model="info.classSmallCode" placeholder="请选择" slot="text" >
                  <el-option
                    v-for="item in classSmallNameList"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="cxCode" >
                <ui-label-text labelWidth="184" label="险种大类代码（财险）:" >
                <el-input v-model="info.cxCode" placeholder="" clearable :disabled='disabled_2' slot="text"></el-input>
                 </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="cxName" >
                <ui-label-text labelWidth="184" label="险种大类名称（财险）:" >
                <el-input v-model="info.cxName" placeholder="" clearable :disabled='disabled_2' slot="text"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="flagCode" >
                <ui-label-text :required="true" labelWidth="184" label="车险/非车险 :" >
                <el-select v-model="info.flagCode" placeholder="请选择" :disabled='disabled_2' slot="text">
                  <el-option
                    label="车险"
                    value="1">
                  </el-option>
                  <el-option
                    label="非车险"
                    value="2">
                  </el-option>
                </el-select>
                </ui-label-text>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="classTypeCode" >
                <ui-label-text :required="true" labelWidth="184" label="险种类型:" >
                <el-select v-model="info.classTypeCode" placeholder="请选择" :disabled='disabled' slot="text">
                  <el-option
                    v-for="item in classTypeNameList"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="mainOrExtrFlagCode" >
                <ui-label-text :required="true" labelWidth="184" label="主险/附加险:" >
                <el-select v-model="info.mainOrExtrFlagCode" placeholder="请选择" :disabled='disabled' slot="text">
                  <el-option
                    v-for="item in mainOrExtrList"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="longShortFlagCode" >
                 <ui-label-text :required="true" labelWidth="184" label="长期/短期:" >
                <el-select v-model="info.longShortFlagCode" placeholder="请选择" :disabled='disabled' slot="text">
                  <el-option
                    v-for="item in longShortList"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="freeFlag" >
                <ui-label-text :required="true" labelWidth="184" label="是否豁免险:" >
                <el-select v-model="info.freeFlag" placeholder="请选择" :disabled='disabled_1' slot="text">
                  <el-option
                    v-for="item in freeFlagList"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="sexscopeCode" >
                <ui-label-text labelWidth="184" label="适用性别 :" >
                <el-select v-model="info.sexscopeCode" placeholder="请选择" :disabled='disabled_1' slot="text">
                  <el-option
                    v-for="item in sexscopeCodeList"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="agescopetop" >
                <ui-label-text labelWidth="184" label="年龄上限:" >
                <el-input v-model.number="info.agescopetop" placeholder="" @keyup.native="handleInput" clearable :disabled='disabled_1' slot="text"></el-input>
                 </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="agescopelow" >
                <ui-label-text labelWidth="184" label="年龄下限:" >
                <el-input v-model.number="info.agescopelow" @keyup.native="handleInputLow" placeholder="" clearable :disabled='disabled_1' slot="text"></el-input>
                 </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="payCycleCode" >
                <ui-label-text :required="true" labelWidth="184" label="保费缴费周期:" >
                <el-select v-model="info.payCycleCode" placeholder="请选择" :disabled='disabled' @change="paymentSelect" slot="text">
                  <el-option
                    v-for="item in paymentList"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="tovalueratio" >
                <ui-label-text :required="true" labelWidth="184" label="第三方保险公司折标系数（%）:" >
                <el-input v-model="info.tovalueratio" placeholder="" :disabled='disabled_1' clearable slot="text"></el-input>
                 </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="paymentperiod" >
                <ui-label-text :required="true" labelWidth="184" label="缴费年期:" v-show="isyearshow">
                <el-input v-model="info.paymentperiod" placeholder="" clearable slot="text"></el-input>
                 </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="payagetoplimit" >
                 <ui-label-text :required="true" labelWidth="184" label="缴至年龄:" v-show="isageshow">
                <el-input v-model="info.payagetoplimit" placeholder="" clearable slot="text"></el-input>
                 </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="paywayCode" >
                <ui-label-text :required="true" labelWidth="184" label="保费缴费方式:"  v-show="iswayshow">
                <el-select v-model="info.paywayCode" placeholder="请选择" slot="text">
                  <el-option
                    v-for="item in paywayCodeList"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <ui-label-text labelWidth="184" label="" >
                <el-form-item slot="text">
                </el-form-item>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
                <el-form-item prop="remark" >
                   <ui-label-text labelWidth="184" label="备注:" >
                  <el-input type="textarea" autosize  v-model="info.remark" slot="text"></el-input>
                  </ui-label-text>
                </el-form-item>
            </el-col>
            <!-- 状态 -->
            <!-- <el-col :span="12">
                  <el-form-item prop="validStatusCode">
                    <ui-label-text labelWidth="184" :required="true" label="状态:" >
                        <el-select slot="text" placeholder="请选择" v-model="addForm.validStatusCode">
                          <el-option label="有效" value="1"></el-option>
                          <el-option label="无效" value="0"></el-option>
                        </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col> -->
          </el-row>               
        </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="option!=='detail'">
        <div class="check-btn">
          <el-button type="primary" @click="checkSubmit">提交审核</el-button>
        </div>
      </span>
    <el-dialog :append-to-body="true" width="55%" :title="dbtitle" :visible.sync="dialogTableVisibleCode" center :before-close='comClose'>
      <risk-db ref="DbDia" :dbInfo="dbInfo" :dbTableTitle="dbTableTitle" :dbContent="dbContent" @getDbdata='showChildata' @getDbChangeData='getDbChangeData'></risk-db>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import RiskDb from '@/pages/goodsCommRate_mgr/riskdbDia'
import { mapActions } from 'vuex'
export default {
  name: 'risk-form',
  props: ['info', 'option'],
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      setTimeout(() => {
        value = Number(value)
        if (!Number.isInteger(value)) {
          callback(new Error('年龄必须为数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    var checkAge2 = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      setTimeout(() => {
        value = Number(value)
        if (!Number.isInteger(value)) {
          callback(new Error('年龄必须为数字值'))
        } else {
          if (value > this.info.agescopetop) {
            callback(new Error('年龄下限不能大于年龄上限'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      dbInfo: '',
      disabled: false, // 查询时输入框，下拉菜单无效
      disabled_1: false, // 弹出框内不是寿险，输入框，下拉菜单无效
      disabled_2: false, // 弹出框内输入框，下拉菜单无效
      dialogTableVisibleCode: false, // 双击弹窗
      dialogTableVisibleCode1: false, // 双击弹窗
      classBigNameList: [],
      classSmallNameList: [],
      paymentList: [],
      dbtitle: '',
      dbTableTitle: {},
      dbContent: '',
      agescopetopVal: '',
      rules: {},
      currentRules: {},
      addLiferules: {
        insurerCode: [
          {
            required: true,
            message: '请输入保险公司代码',
            trigger: 'blue, change'
          }
        ],
        insurerName: [
          {
            required: true,
            message: '请输入保险公司名称',
            trigger: 'blur, change'
          }
        ],
        riskCode: [
          { required: true, message: '请输入险种代码', trigger: 'blur, change' }
        ],
        riskName: [
          { required: true, message: '请输入险种名称', trigger: 'blur, change' }
        ],
        classBigCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        classSmallCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        classTypeCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        mainOrExtrFlagCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        longShortFlagCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        freeFlag: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        payCycleCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        tovalueratio: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        agescopetop: [{ validator: checkAge, trigger: 'blur' }],
        agescopelow: [{ validator: checkAge2, trigger: 'blur' }]
      },
      addrules: {
        validStatusCode: [
          { required: true, message: '请输入状态', trigger: 'blur' }
        ],
        insurerCode: [
          { required: true, message: '请输入保险公司代码', trigger: 'blur' }
        ],
        insurerName: [
          { required: true, message: '请输入保险公司名称', trigger: 'blur' }
        ],
        riskCode: [
          { required: true, message: '请输入险种代码', trigger: 'blur' }
        ],
        riskName: [
          { required: true, message: '请输入险种名称', trigger: 'blur' }
        ],
        classBigCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        classSmallCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        classTypeCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        mainOrExtrFlagCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        payCycleCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ]
      },
      paymentperiod: [
        { required: true, message: '请输入必填项', trigger: 'blur' }
      ],
      paywayCode: [
        { required: true, message: '请输入必填项', trigger: 'blur' }
      ],
      payagetoplimit: [
        { required: true, message: '请输入必填项', trigger: 'blur' }
      ],
      addMoneyrules: {
        insurerCode: [
          { required: true, message: '请输入保险公司代码', trigger: 'blur' }
        ],
        insurerName: [
          { required: true, message: '请输入保险公司名称', trigger: 'blur' }
        ],
        riskCode: [
          { required: true, message: '请输入险种代码', trigger: 'blur' }
        ],
        riskName: [
          { required: true, message: '请输入险种名称', trigger: 'blur' }
        ],
        classBigCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        classSmallCode: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        // cxCode: [
        //   { required: true, message: '请输入必填项', trigger: 'blur' }
        // ],
        // cxName: [
        //   { required: true, message: '请输入必填项', trigger: 'blur' }
        // ],
        flagCode: [{ required: true, message: '请输入必填项', trigger: 'blur' }]
      },
      modrules: {
        insurerCode: [
          { required: true, message: '请输入保险公司代码', trigger: 'blur' }
        ],
        insurerName: [
          { required: true, message: '请输入保险公司名称', trigger: 'blur' }
        ],
        riskCode: [
          { required: true, message: '请输入险种代码', trigger: 'blur' }
        ],
        riskName: [
          { required: true, message: '请输入险种名称', trigger: 'blur' }
        ]
      },
      detailrules: {},
      classTypeNameList: [
        {
          value: '1',
          label: '普通型'
        },
        {
          value: '2',
          label: '利差返还型'
        },
        {
          value: '3',
          label: '分红型'
        },
        {
          value: '4',
          label: '万能型'
        },
        {
          value: '5',
          label: '投资连结型'
        },
        {
          value: '6',
          label: '其他'
        }
      ],
      mainOrExtrList: [
        {
          value: '1',
          label: '主险'
        },
        {
          value: '2',
          label: '附加险'
        },
        {
          value: '3',
          label: '主/附险'
        }
      ],
      longShortList: [],
      longShortList1: [
        {
          value: '0',
          label: '极短险'
        },
        {
          value: '1',
          label: '短期'
        },
        {
          value: '2',
          label: '长期'
        }
      ],
      longShortList2: [
        {
          value: '2',
          label: '长期'
        },
        {
          value: '1',
          label: '短期'
        }
      ],
      valistatusList: [
        {
          value: '1',
          label: '待审核'
        },
        {
          value: '2',
          label: '审核通过'
        },
        {
          value: '3',
          label: '审核不通过'
        }
      ],
      cplbList: [
        {
          value: '1',
          label: '财险'
        },
        {
          value: '2',
          label: '寿险'
        },
        {
          value: '3',
          label: '银保代理'
        }
      ],
      riskSelectData: {
        select_1: [
          {
            value: '1',
            label: '人寿保险',
            sub_select: [
              {
                value: '1',
                label: '定期保险'
              },
              {
                value: '2',
                label: '终身保险'
              },
              {
                value: '3',
                label: '两全保险'
              },
              {
                value: '4',
                label: '年金保险'
              }
            ]
          },
          {
            value: '2',
            label: '健康保险',
            sub_select: [
              {
                value: '5',
                label: '疾病保险'
              },
              {
                value: '6',
                label: '医疗保险'
              },
              {
                value: '7',
                label: '失能收入损失险'
              },
              {
                value: '8',
                label: '护理保险'
              }
            ]
          },
          {
            value: '3',
            label: '意外伤害保险',
            sub_select: [
              {
                value: '9',
                label: '意外伤害保险'
              }
            ]
          },
          {
            value: '4',
            label: '其他类别',
            sub_select: [
              {
                value: '0',
                label: '其他'
              }
            ]
          }
        ],
        select_2: [
          {
            value: '1',
            label: '1-企业财产保险'
          },
          {
            value: '2',
            label: '2-家庭财产保险',
            sub_select: [
              {
                value: '1',
                label: '投资型家财险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '3',
            label: '3-机动车辆保险',
            sub_select: [
              {
                value: '2',
                label: '交强险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '4',
            label: '4-工程保险'
          },
          {
            value: '5',
            label: '5-责任保险'
          },
          {
            value: '6',
            label: '6-信用保险'
          },
          {
            value: '7',
            label: '7-保证保险',
            sub_select: [
              {
                value: '3',
                label: '机动车辆消费贷款保证保险'
              },
              {
                value: '4',
                label: '个人贷款抵押房屋保证保险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '8',
            label: '8-船舶保险'
          },
          {
            value: '9',
            label: '9-货物运输保险'
          },
          {
            value: '10',
            label: '10-特殊风险保险'
          },
          {
            value: '11',
            label: '11-农业保险'
          },
          {
            value: '12',
            label: '12-健康险',
            sub_select: [
              {
                value: '5',
                label: '投资性健康险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '13',
            label: '13-意外伤害险',
            sub_select: [
              {
                value: '6',
                label: '投资性意外险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '14',
            label: '14-其他险'
          }
        ]
      },
      paymentList_1: [
        {
          value: '1',
          label: '趸缴'
        },
        {
          value: '2',
          label: '期缴'
        },
        {
          value: '3',
          label: '不定期'
        },
        {
          value: '4',
          label: '缴至年龄'
        }
      ],
      paymentList_2: [
        {
          value: '1',
          label: '趸缴'
        },
        {
          value: '2',
          label: '期缴'
        },
        {
          value: '3',
          label: '不定期'
        }
      ],
      freeFlagList: [
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }
      ],
      paywayCodeList: [
        {
          value: '1',
          label: '年缴'
        },
        {
          value: '2',
          label: '季缴'
        },
        {
          value: '3',
          label: '月缴'
        },
        {
          value: '4',
          label: '天缴'
        }
      ],
      sexscopeCodeList: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        },
        {
          value: '0',
          label: '男女都适用'
        }
      ],
      isyearshow: false,
      iswayshow: false,
      isageshow: false
    }
  },
  mounted () {
    this.initForm()
  },
  methods: {
    comClose () {
      // 关闭弹窗
      // this.orgComSize = []
      this.dialogTableVisibleCode = false
      this.info.insurerCode = ''
      this.info.insurerName = ''
    },
    initForm () {
      if (this.option === 'add') {
        this.$nextTick(() => {
          this.$refs['optionForm'].resetFields()
        })
        this.rules = this.addrules
      } else if (this.option === 'mod') {
        this.selectOption()
        this.rules = this.modrules
      } else {
        this.selectOption()
        this.rules = this.detailrules
      }
    },
    selectOption () {
      this.isyearshow = false
      this.iswayshow = false
      this.isageshow = false
      if (this.info.typeName) {
        if (this.info.typeName === '寿险') {
          this.classBigNameList = this.riskSelectData.select_1
          this.longShortList = this.longShortList1
          this.paymentList = this.paymentList_1
          this.disabled = false
          this.disabled_1 = false
          this.disabled_2 = true
          this.rules = this.addLiferules
        } else if (this.info.typeName === '财险') {
          this.classBigNameList = this.riskSelectData.select_2
          this.disabled = true
          this.disabled_1 = true
          this.disabled_2 = false
          this.rules = this.addMoneyrules
        } else if (this.info.typeName === '银保代理') {
          this.classBigNameList = this.riskSelectData.select_1
          this.longShortList = this.longShortList2
          this.paymentList = this.paymentList_2
          this.disabled = false
          this.disabled_1 = true
          this.disabled_2 = true
          this.rules = this.addrules
        }
        if (
          this.info.typeName === '寿险' ||
          this.info.typeName === '银保代理'
        ) {
          for (let i = 0; i < this.riskSelectData.select_1.length; i++) {
            if (
              this.riskSelectData.select_1[i].value === this.info.classBigCode
            ) {
              this.classSmallNameList = this.riskSelectData.select_1[i]
                .sub_select
                ? this.riskSelectData.select_1[i].sub_select
                : []
            }
          }
        } else if (this.info.typeName === '财险') {
          for (let i = 0; i < this.riskSelectData.select_2.length; i++) {
            if (
              this.riskSelectData.select_2[i].value === this.info.classBigCode
            ) {
              this.classSmallNameList = this.riskSelectData.select_2[i]
                .sub_select
                ? this.riskSelectData.select_2[i].sub_select
                : []
              if (this.classSmallNameList === []) {
                this.addMoneyrules.classSmallCode = [
                  { required: false, message: '请输入必填项', trigger: 'blur' }
                ]
              } else {
                this.addMoneyrules.classSmallCode = [
                  { required: true, message: '请输入必填项', trigger: 'blur' }
                ]
              }
            }
          }
        }
        this.paymentSelect()
      } else {
        return []
      }
    },
    indexSelect (event) {
      this.classSmallNameList = this.riskFilter(this.info.classBigCode)
    },
    riskFilter (type) {
      let result = ''
      if (this.info.typeName === '寿险' || this.info.typeName === '银保代理') {
        for (let i = 0; i < this.riskSelectData.select_1.length; i++) {
          if (this.riskSelectData.select_1[i].value === type) {
            result = this.riskSelectData.select_1[i].sub_select
              ? this.riskSelectData.select_1[i].sub_select
              : []
          }
        }
      } else if (this.info.typeName === '财险') {
        for (let i = 0; i < this.riskSelectData.select_2.length; i++) {
          if (this.riskSelectData.select_2[i].value === type) {
            result = this.riskSelectData.select_2[i].sub_select
              ? this.riskSelectData.select_2[i].sub_select
              : []
          }
        }
      }
      return result
    },
    ...mapActions([
      'queryRisk',
      'getInsurers_1',
      'modRisk',
      'delRisk',
      'addRisk',
      'getRiskcodes',
      'getInsuranceCom'
    ]),
    dbqueryCom () {
      this.info.currentPage = 1
      this.info.pageSize = 5
      this.getdbqueryCom()
    },
    getdbqueryCom () {
      if (this.option === 'add') {
        this.dialogTableVisibleCode = true
        this.dbtitle = '保险公司代码'
        this.dbTableTitle = {
          title1: '保险公司代码',
          title2: '保险公司姓名'
        }
        this.dbContent = {
          key: 'insurercode',
          value: 'insurername'
        }
        this.dbInfo = 'com'
        this.getInsuranceCom(this.info)
        this.$nextTick(() => {
          // this.$refs.DbDia.resetPage()
        })
      }
    },
    dbqueryRisk () {
      this.info.currentPage = 1
      this.getdbqueryRisk()
    },
    getdbqueryRisk () {
      if (this.option === 'add') {
        this.dialogTableVisibleCode = true
        this.dbtitle = '险种代码'
        this.dbTableTitle = {
          title1: '险种代码',
          title2: '险种名称'
        }
        this.dbContent = {
          key: 'riskcode',
          value: 'riskname'
        }
        this.dbInfo = 'risk'
        this.getRiskcodes(this.info)
      }
    },
    paymentSelect () {
      if (this.info.typeName === '寿险') {
        this.currentRules = Object.assign({}, this.addLiferules)
      } else if (this.info.typeName === '银保代理') {
        this.currentRules = Object.assign({}, this.addrules)
      } else {
        return false
      }
      if (this.info.payCycleCode === '2') {
        this.isyearshow = true
        this.iswayshow = true
        this.isageshow = false
        this.currentRules.paymentperiod = this.paymentperiod
        this.currentRules.paywayCode = this.paywayCode
        if (this.option === 'add' || this.option === 'mod') {
          this.rules = this.currentRules
        }
      } else if (this.info.payCycleCode === '4') {
        this.isageshow = true
        this.iswayshow = true
        this.isyearshow = false
        this.currentRules.payagetoplimit = this.payagetoplimit
        this.currentRules.paywayCode = this.paywayCode
        if (this.option === 'add' || this.option === 'mod') {
          this.rules = this.currentRules
        }
      } else {
        this.isyearshow = false
        this.iswayshow = false
        this.isageshow = false
        if (this.option === 'add' || this.option === 'mod') {
          this.rules = this.currentRules
        }
      }
    },
    // 新增、修改提交审核
    checkSubmit () {
      this.$refs['optionForm'].validate(valid => {
        if (valid) {
          let paramData = Object.assign({}, this.info)
          this.$emit('getSubmitData', this.option, paramData)
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    showChildata (data) {
      if (this.dbInfo === 'com') {
        // this.resetForm()
        this.info.insurerCode = data.insurerCode
        this.info.insurerName = data.insurerName
        this.info.insurertype = data.insurertype
        if (this.info.insurertype === '1') {
          this.info.typeName = '财险'
          this.classBigNameList = this.riskSelectData.select_2
          this.disabled = true
          this.disabled_1 = true
          this.disabled_2 = false
          this.rules = this.addMoneyrules
        } else if (this.info.insurertype === '2') {
          this.info.typeName = '寿险'
          this.classBigNameList = this.riskSelectData.select_1
          this.disabled = false
          this.disabled_1 = false
          this.disabled_2 = true
          this.longShortList = this.longShortList1
          this.paymentList = this.paymentList_1
          this.rules = this.addLiferules
        } else if (this.info.insurertype === '3') {
          this.info.typeName = '银保代理'
          this.classBigNameList = this.riskSelectData.select_1
          this.paymentList = this.paymentList_2
          this.disabled = false
          this.disabled_1 = true
          this.disabled_2 = true
          this.longShortList = this.longShortList2
          this.rules = this.addrules
        }
      } else if (this.dbInfo === 'risk') {
        this.info.riskCode = data.riskCode
        this.info.riskName = data.riskName
      }
      this.dialogTableVisibleCode = false
    },
    getDbChangeData (opt, data) {
      this.info.currentPage = data.currentPage
      this.info.pageSize = data.pageSize
      if (opt === 'com') {
        this.getdbqueryCom()
      } else {
        this.getdbqueryRisk()
      }
    },
    handleInput (e) {
      let onlyNumvalue = e.target.value.replace(/[^\d]/g, '')
      this.info.agescopetop = onlyNumvalue
    },
    handleInputLow (e) {
      let onlyNumvalue = e.target.value.replace(/[^\d]/g, '')
      this.info.agescopelow = onlyNumvalue
    },
    getCaption (obj) {
      var index = obj.lastIndexOf('-')
      obj = obj.substring(index + 1, obj.length)
      return obj
    },
    resetForm () {
      this.disabled = false
      this.disabled_1 = false
      this.disabled_2 = false
      this.$refs['optionForm'].resetFields()
      this.info.type = '2'
    },
    clearValidate () {
      this.$refs['optionForm'].clearValidate()
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    [RiskDb.name]: RiskDb
  },
  created () {},
  watch: {
    'info.classBigCode' (newValue, oldValue) {
      // this.info.classSmallCode = ''
      this.classBigNameList.forEach(ele => {
        if (ele.value === this.info.classBigCode) {
          if (this.info.typeName === '财险') {
            this.info.classBigName = this.getCaption(ele.label)
          } else {
            this.info.classBigName = ele.label
          }
        }
      })
      if (this.info.typeName === '财险') {
        for (let i = 0; i < this.riskSelectData.select_2.length; i++) {
          if (
            this.riskSelectData.select_2[i].value === this.info.classBigCode
          ) {
            if (this.riskSelectData.select_2[i].sub_select) {
              this.addMoneyrules.classSmallCode = [
                { required: true, message: '请输入必填项', trigger: 'blur' }
              ]
            } else {
              this.addMoneyrules.classSmallCode = [
                { required: false, message: '请输入必填项', trigger: 'blur' }
              ]
            }
          }
        }
      }
    },
    'info.classSmallCode' (newValue, oldValue) {
      this.classSmallNameList.forEach(ele => {
        if (ele.value === this.info.classSmallCode) {
          this.info.classSmallName = ele.label
        }
      })
    },
    'info.classTypeCode' (newValue, oldValue) {
      this.classTypeNameList.forEach(ele => {
        if (ele.value === this.info.classTypeCode) {
          this.info.classTypeName = ele.label
        }
      })
    },
    'info.insurerCode' () {
      if (this.info.insurerCode === '') {
        this.info.insurerName = ''
        this.info.typeName = ''
      }
    },
    'info.insurerName' () {
      if (this.info.insurerName === '') {
        this.info.insurerCode = ''
        this.info.typeName = ''
      }
    },
    'info.type' () {
      if (this.info.type === '1') {
        this.info.insurerCode = ''
        this.info.insurerName = ''
      }
      if (this.info.type === '2') {
        this.info.insurerCode = ''
        this.info.insurerName = ''
      }
      if (this.info.type === '3') {
        this.info.insurerCode = ''
        this.info.insurerName = ''
      }
    }
  },
  computed: {
    insComData () {
      return this.$store.state.riskMgr.insComData
    },
    riskData () {
      return this.$store.state.riskMgr.riskData
    },
    modDisable () {
      if (this.option === 'mod') {
        return true
      } else {
        return false
      }
    },
    insurerBigtype () {
      if (this.info.typeName) {
        if (
          this.info.typeName === '寿险' ||
          this.info.typeName === '银保代理'
        ) {
          return this.riskSelectData.select_1
        } else if (this.info.typeName === '财险') {
          return this.riskSelectData.select_2
        }
      } else {
        return []
      }
    },
    insurerSmatype () {
      if (this.info.typeName) {
        if (
          this.info.typeName === '寿险' ||
          this.info.typeName === '银保代理'
        ) {
          for (let i = 0; i < this.riskSelectData.select_1.length; i++) {
            if (
              this.riskSelectData.select_1[i].value === this.info.classBigCode
            ) {
              return this.riskSelectData.select_1[i].sub_select
                ? this.riskSelectData.select_1[i].sub_select
                : []
            }
          }
        } else if (this.info.typeName === '财险') {
          for (let i = 0; i < this.riskSelectData.select_2.length; i++) {
            if (
              this.riskSelectData.select_2[i].value === this.info.classBigCode
            ) {
              return this.riskSelectData.select_2[i].sub_select
                ? this.riskSelectData.select_2[i].sub_select
                : []
            }
          }
        }
      } else {
        return []
      }
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

<style lang="scss" type="text/css" scoped>
.risk-dialog-wrapper .lt-label,
.risk-dialog-wrapper .el-form-item {
  // float: left;
  // margin-bottom: 2px;
}
</style>
