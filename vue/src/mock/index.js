import Mock from 'mockjs'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', {token: 'admin'})
Mock.mock(/\/login\/logout/, 'post', {})
// Mock.mock(/\/homePage\/getMenuInfo\.*/, 'post', {
//   userInfo: {
//     name: '@cname',
//     empno: 'ZHJ02832'
//   },
//   menuList: [
//     {id: '1', parentId: '', sort: 1, label: '公司管理', url: '', icon: ''},
//     // {id: '1', parentId: '', sort: 1, label: '供应商管理', url: '', icon: ''},
//     {id: '10', parentId: '', sort: 1, label: '对账单管理', url: '', icon: ''},
//     {id: '101', parentId: '10', sort: 1, label: '寿险对账单管理', url: '', icon: ''},
//     {id: '102', parentId: '10', sort: 1, label: '财险对账单管理', url: '', icon: ''},
//     {id: '103', parentId: '10', sort: 1, label: '银保代理对账单管理', url: '', icon: ''},
//     {id: '104', parentId: '10', sort: 1, label: '合作经代公司寿险对账单管理', url: '', icon: ''},
//     {id: '1011', parentId: '101', sort: 1, label: '手续费对账单手动生成', url: '/lifeInsurBill_mgr/lifeInsureBillMake', icon: ''},
//     {id: '1021', parentId: '102', sort: 1, label: '手续费对账单手动生成', url: '/moneyInsurBill_mgr/moneyInsureBillMake', icon: ''},
//     {id: '1031', parentId: '103', sort: 1, label: '手续费对账单手动生成', url: '/bankInsurBill_mgr/bankInsureBillMake', icon: ''},
//     {id: '1043', parentId: '104', sort: 1, label: '手续费对账单手动生成', url: '/cooperInsurBill_mgr/cooperInsureBillMake', icon: ''},
//     {id: '1012', parentId: '101', sort: 1, label: '财务部审核', url: '/lifeInsurBill_mgr/lifeInsureBillFinance', icon: ''},
//     {id: '1023', parentId: '102', sort: 1, label: '财务部审核', url: '/moneyInsurBill_mgr/moneyInsurBillFinance', icon: ''},
//     {id: '1034', parentId: '103', sort: 1, label: '财务部审核', url: '/bankInsurBill_mgr/silverInsurBillFinance', icon: ''},
//     {id: '1014', parentId: '101', sort: 1, label: '运营部审核', url: '/lifeInsurBill/view', icon: ''},
//     {id: '1022', parentId: '102', sort: 1, label: '运营部审核', url: '/moneyInsurBill_mgr/moneyInsurBillView', icon: ''},
//     {id: '1032', parentId: '103', sort: 1, label: '运营部审核', url: '/silverInsurAgentBill_mgr/bankInsureBillcheck', icon: ''},
//     {id: '1041', parentId: '104', sort: 1, label: '财务部审核', url: '/silverInsurBill_mgr/silverInsurBillFinance', icon: ''},
//     {id: '1042', parentId: '104', sort: 1, label: '渠道部审核', url: '/silverInsurBill_mgr/channelDapVerify', icon: ''},
//     {id: '11', parentId: '1', sort: 1, label: '机构管理', url: '/orgBy/manage', icon: ''},
//     {id: '12', parentId: '1', sort: 1, label: '批处理', url: '/batchprocess/BatchProcess', icon: ''},
//     {id: '13', parentId: '1', sort: 1, label: '银保代理人员匹配管理', url: '/agent/manage', icon: ''},
//     {id: '14', parentId: '1', sort: 1, label: '业务员', url: ''},
//     {id: '141', parentId: '14', sort: 1, label: '业务员', url: '/employee/employee'},
//     {id: '142', parentId: '14', sort: 1, label: '基本法', url: '/employee/basicLaw'},
//     {id: '143', parentId: '14', sort: 1, label: '团财险', url: '/employee/teamPropertyInsure'},
//     {id: '144', parentId: '14', sort: 1, label: '展期统计', url: '/employee/statisticsZhanqi'},
//     {id: '145', parentId: '14', sort: 1, label: '银保代理统计', url: '/employee/statisticsYbdl'},
//     {id: '146', parentId: '14', sort: 1, label: '出勤统计', url: '/employee/attendance'},
//     {id: '147', parentId: '14', sort: 1, label: 'T+1寿险', url: '/employee/statisticsTlife'},
//     {id: '148', parentId: '14', sort: 1, label: 'T+1车险', url: '/employee/statisticsTcar'},
//     {id: '149', parentId: '14', sort: 1, label: 'T+1团险', url: '/employee/statisticsTproperty'},
//     {id: '1410', parentId: '14', sort: 1, label: '上级业务申请', url: '/employee/incomeRevise'},
//     {id: '1411', parentId: '14', sort: 1, label: '收入管理', url: '/employee/manageIncome'},
//     {id: '1412', parentId: '14', sort: 1, label: '展期佣金率上传', url: '/employee/zhanqiRate'},
//     {id: '1413', parentId: '14', sort: 1, label: '收入统计', url: '/employee/income'},
//     {id: '1414', parentId: '14', sort: 1, label: '考核', url: '/employee/levelup'},
//     {id: '1415', parentId: '14', sort: 1, label: '考核统计', url: '/employee/statisticsLevelup'},
//     {id: '1416', parentId: '14', sort: 1, label: '在职销售人力统计', url: '/employee/statisticsEmployEmployee'},
//     {id: '1417', parentId: '14', sort: 1, label: '寿险人员活动率统计', url: '/employee/statisticsActiveEmployee'},
//     {id: '1418', parentId: '14', sort: 1, label: '寿险业绩统计', url: '/employee/statisticsReportPolicy'},
//     {id: '121', parentId: '12', sort: 1, label: '批处理三级', url: '/BatchProcess', icon: ''},
//     {id: '2', parentId: '', sort: 1, label: '系统管理', url: '', icon: ''},
//     {id: '21', parentId: '2', sort: 1, label: '黑灰名单', url: '', icon: ''},
//     {id: '211', parentId: '21', sort: 1, label: '黑灰名单管理', url: '/blackgrayList_mgr/blackgrayList', icon: ''},
//     {id: '215', parentId: '21', sort: 1, label: '黑灰名单投保信息查询 ', url: '/blackgrayList_mgr/blackInsure', icon: ''},
//     // {id: '32', parentId: '4', sort: 1, label: '黑灰名单管理', url: '/blackgrayList/blackgrayList', icon: ''}
//     // {id: '321', parentId: '3', sort: 1, label: '保险机构管理三级', url: '/batchprocess/BatchProcess', icon: ''},
//     // {id: '33', parentId: '3', sort: 1, label: '合作经代公司管理', url: '/org/add', icon: ''},
//     // {id: '34', parentId: '3', sort: 1, label: '合作经代机构管理', url: '/batchprocess/BatchProcess', icon: ''}
//     {id: '22', parentId: '2', sort: 1, label: '岗位管理', url: '/author/post', icon: ''},
//     {id: '23', parentId: '2', sort: 1, label: '人员权限设置', url: '', icon: ''},
//     {id: '231', parentId: '23', sort: 1, label: '权限详情设置', url: '/author/index', icon: ''},
//     {id: '232', parentId: '23', sort: 1, label: '权限完全复制', url: '/author/copy', icon: ''},
//     {id: '24', parentId: '2', sort: 1, label: '数据字典', url: '/system_mgr/dictionary', icon: ''},
//     {id: '3', parentId: '', sort: 1, label: '供应商管理', url: '', icon: ''},
//     {id: '31', parentId: '3', sort: 1, label: '保险公司管理', url: '/supplier_mgr/Insurance_Co', icon: ''},
//     {id: '32', parentId: '3', sort: 1, label: '保险机构管理', url: '/supplier_mgr/insManage', icon: ''},
//     {id: '33', parentId: '3', sort: 1, label: '合作经代公司管理', url: '/supplier_mgr/cooCompany', icon: ''},
//     {id: '34', parentId: '3', sort: 1, label: '合作经代机构管理', url: '/supplier_mgr/cooOrg', icon: ''},
//     {id: '4', parentId: '', sort: 1, label: '寿险折标系数管理', url: '/rate/rateIndex', icon: ''},
//     {id: '5', parentId: '', sort: 1, label: '寿险业务管理', url: '', icon: ''},
//     {id: '53', parentId: '5', sort: 1, label: '离职单管理', url: '', icon: ''},
//     {id: '531', parentId: '53', sort: 1, label: '离职单管理', url: '/lifeInsur_mgr/quitListMgr', icon: ''},
//     {id: '532', parentId: '53', sort: 1, label: '离职单批导结果查询', url: '/lifeInsur_mgr/batchImportCheck', icon: ''},
//     {id: '533', parentId: '53', sort: 1, label: '离职单管理超级权限', url: '/lifeInsur_mgr/quitListMgrAdmin', icon: ''},
//     {id: '51', parentId: '5', sort: 1, label: '寿险投保单管理', url: '', icon: ''},
//     {id: '513', parentId: '51', sort: 1, label: '投保单管理', url: '/lifeInsur_policy/lifeInsurMgr', icon: ''},
//     // {id: '514', parentId: '51', sort: 1, label: '投保单新增', url: '/lifeInsur_policy/lifeInsur_add', icon: ''},
//     {id: '512', parentId: '51', sort: 1, label: '对账单修改', url: '/lifeInsur_policy/lifeInsur_mod', icon: ''},
//     {id: '52', parentId: '5', sort: 1, label: '寿险首期保单管理', url: '', icon: ''},
//     {id: '521', parentId: '52', sort: 1, label: '寿险保险公司承保清单导入', url: '/lifeInsur/insComBusImp', icon: ''},
//     {id: '522', parentId: '52', sort: 1, label: '寿险承保数据批处理', url: '/lifeInsur/batchHandle', icon: ''},
//     {id: '523', parentId: '52', sort: 1, label: '寿险保单差异查询', url: '/lifeInsur/insDiffer', icon: ''},
//     {id: '524', parentId: '52', sort: 1, label: '保单修改', url: '/lifeInsur/billModify', icon: ''},
//     {id: '525', parentId: '52', sort: 1, label: '新契约保单回录', url: '/lifeInsur/newContractBill', icon: ''},
//     {id: '54', parentId: '5', sort: 1, label: '寿险续期保单管理', url: '', icon: ''},
//     {id: '541', parentId: '54', sort: 1, label: '续期保单回录', url: '/lifeInsur_renewal/record', icon: ''},
//     {id: '55', parentId: '5', sort: 1, label: '保单查询', url: '/lifeInsur_mgr/billSearch', icon: ''},
//     {id: '542', parentId: '54', sort: 1, label: '续期保单回录超级权限', url: '/lifeInsur_renewal/super', icon: ''},
//     {id: '543', parentId: '54', sort: 1, label: '续期保单修改超级权限', url: '/lifeInsur_renewal/modify', icon: ''},
//     {id: '544', parentId: '54', sort: 1, label: '续期短信提醒下载', url: '/lifeInsur_renewal/message', icon: ''},
//     {id: '6', parentId: '', sort: 1, label: '产品、佣金率管理', url: '', icon: ''},
//     {id: '61', parentId: '6', sort: 1, label: '产品管理', url: '/risk/index', icon: ''},
//     {id: '62', parentId: '6', sort: 1, label: '首/续佣率配置', url: '/goodsCommRate_mgr/commissionConfig', icon: ''},
//     {id: '63', parentId: '6', sort: 1, label: '银代首/续佣率配置', url: '/goodsCommRate_mgr/bankCommissionConfig', icon: ''},
//     {id: '7', parentId: '', sort: 1, label: '银保代理业务管理', url: '', icon: ''},
//     {id: '71', parentId: '7', sort: 1, label: '银保渠道保单批导', url: '/silverInsAgn/silverDitch', icon: ''},
//     {id: '72', parentId: '7', sort: 1, label: '银保渠道保单差异数据查询', url: '/silverInsAgn/silverDiffer', icon: ''},
//     {id: 'E', parentId: '', sort: 1, label: '银保代理佣金管理', url: '', icon: ''},
//     {id: 'E1', parentId: 'E', sort: 1, label: '银保代理算薪清单', url: '/agentCom/agentComIndex', icon: ''},
//     {id: 'E2', parentId: 'E', sort: 1, label: '银代佣金结算跑批', url: '/silverInsurCom_mgr/bankInsurBatchCal', icon: ''},
//     {id: 'F', parentId: '', sort: 1, label: '寿险续期佣金管理', url: '', icon: ''},
//     {id: 'F1', parentId: 'F', sort: 1, label: '继续率调节系数配置', url: '/index/renewalComIndex', icon: ''},
//     {id: 'F2', parentId: 'F', sort: 1, label: '续期佣金汇总', url: '/index/ComAmountIndex', icon: ''},
//     {id: 'F3', parentId: 'F', sort: 1, label: '继续续期佣金算薪清单', url: '/lifeInsurReneCom_mgr/renewCommCal', icon: ''},
//     {id: 'F5', parentId: 'F', sort: 1, label: '人管继续率查询', url: '/lifeInsurReneCom_mgr/contiPercheck', icon: ''},
//     {id: 'F6', parentId: 'F', sort: 1, label: '人管继续率、续佣跑批', url: '/lifeInsurReneCom_mgr/contiPerBatch', icon: ''},
//     {id: 'F7', parentId: 'F', sort: 1, label: '人管续期清单查询', url: '/lifeInsurReneCom_mgr/contiListCheck', icon: ''},
//     {id: 'L', parentId: '', sort: 1, label: '寿险业务报表管理', url: '', icon: ''},
//     {id: 'L1', parentId: 'L', sort: 1, label: '寿险预收清单', url: '/advanceList/advanceListIndex', icon: ''},
//     {id: 'L2', parentId: 'L', sort: 1, label: '分销商月度寿险手续费结算', url: '/advanceList/fenxiaoMonthlyBillList', icon: ''},
//     {id: 'L3', parentId: 'L', sort: 1, label: '寿险首期承保清单', url: '', icon: ''},
//     {id: 'L31', parentId: 'L3', sort: 1, label: '寿险承保清单', url: '/advanceList/lifeInsFirstList', icon: ''},
//     {id: 'L4', parentId: 'L', sort: 1, label: '寿险导入承保清单', url: '/advanceList/lifeInsListImp', icon: ''},
//     {id: 'M', parentId: '', sort: 1, label: '协议费率管理', url: '', icon: ''},
//     {id: 'M1', parentId: 'M', sort: 1, label: '合作经代公司手续费率导入', url: '/serviceChargeRate/service', icon: ''},
//     {id: 'G', parentId: '', sort: 1, label: '财险业务管理', url: '', icon: ''},
//     {id: 'G1', parentId: 'G', sort: 1, label: '产险承保清单导入', url: '', icon: ''},
//     {id: 'G11', parentId: 'G1', sort: 1, label: '车险承保清单导入', url: '/moneyInsur_mgr/carInsImp', icon: ''},
//     {id: 'G2', parentId: 'G', sort: 1, label: '产险批改清单导入', url: '', icon: ''},
//     {id: 'G21', parentId: 'G2', sort: 1, label: '车险批改清单导入', url: '/moneyInsur_mgr/carInsBatchImp', icon: ''},
//     {id: 'G3', parentId: 'G', sort: 1, label: '产险保单查询', url: '/listQuery/guaQuery', icon: ''},
//     {id: 'G4', parentId: 'G', sort: 1, label: '产险批单查询', url: '/listQuery/batchQuery', icon: ''},
//     {id: 'H', parentId: '', sort: 1, label: '协议费率管理', url: '', icon: ''},
//     {id: 'H1', parentId: 'H', sort: 1, label: '合作经代公司寿险协议管理', url: '', icon: ''},
//     {id: 'H11', parentId: 'H1', sort: 1, label: '合作经代协议管理', url: '/agreeRate_mgr/cooProMgr', icon: ''},
//     {id: 'H12', parentId: 'H1', sort: 1, label: '合作经代公司手续费率导入', url: '/serviceChargeRate/service', icon: ''},
//     {id: 'J', parentId: '', sort: 1, label: '继续率报表管理', url: '', icon: ''},
//     {id: 'J1', parentId: 'J', sort: 1, label: '运营继续率', url: '/contRate/contRate', icon: ''},
//     {id: 'k', parentId: '', sort: 1, label: '保监会报表', url: '/CIRCReport_mgr/CIRCReport_mgr', icon: ''},
//     {id: 'N', parentId: '', sort: 1, label: '银保代理业务报表管理', url: '', icon: ''},
//     {id: 'N1', parentId: 'N', sort: 1, label: '银保代理承保清单', url: '/silverList/silverInsListImp', icon: ''}
//   ],
//   admissibleReportNum: 6,
//   reportNum: 66,
//   riskNum: 166
// })
Mock.mock(/\/homePage\/getPageInfo\.*/, 'post', {
  'specialReport|20': [
    {
      name: '@cname',
      Status: '状态',
      auditStatus: '审核状态',
      auditType: '审核类型',
      lifeRenewalPolicyInfoVo: {
        'id|+1': 1,
        policyNo: '@id',
        proposalNo: '@id',
        agentName: '@cname'
      },
      lifeRenewalPartyInfoVo: {
        'id|+1': 1,
        customerName: '@cname'
      },
      lifeRenewalPolicyChargeListVo: [
        {
          'id|+1': 1,
          riskCode: '@id',
          riskName: '@cname',
          paidPremium: '123'
        },
        {
          'id|+1': 1,
          riskCode: '@id',
          riskName: '@cname',
          paidPremium: '123'
        }
      ],
      lifeRenewalRiskInfoListVo: [
        {
          'id|+1': 1,
          riskCode: '@id',
          riskName: '@cname',
          mainFlag: '1'
        },
        {
          'id|+1': 1,
          riskCode: '@id',
          riskName: '@cname',
          'mainFlag|1': ['2', '3']
        }
      ]
    }
  ]
})

Mock.mock(/\/enums\/getAllEnums/, 'post', [
  {
    discribe: '身份证', enumrate: '1', field: 'cardType'
  }, {
    discribe: '军官证', enumrate: '2', field: 'cardType'
  }, {
    discribe: '港澳通行证', enumrate: '3', field: 'cardType'
  },
  {
    discribe: '被保险人', enumrate: '1', field: 'acctType'
  }, {
    discribe: '报案人', enumrate: '2', field: 'acctType'
  }, {
    discribe: '投保人', enumrate: '3', field: 'acctType'
  }
])
