const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const lifeInsFirstImp = _import('pages/lifeInsurBusReport_mgr/lifeInsFirstList/lifeInsFirstList')
const caiwuAdmitList = _import('pages/lifeInsurBusReport_mgr/caiwuAdmitList')
const lifeInsListImp = _import('pages/lifeInsurBusReport_mgr/lifeInsListImp')
const fenxiaoMonthlyBillList = _import('pages/lifeInsurBusReport_mgr/fenxiaoMonthlyBillList')
const SideBar = _import('titcomponents/sideBar')
export const advanceListIndexRouter = {
  path: '/advanceList/lifeInsFirstList',
  components: {
    header: HomeHeaderVue,
    main: lifeInsFirstImp,
    aside: SideBar
  }
}

export const lifeInsListImpRouter = {
  path: '/advanceList/lifeInsListImp',
  components: {
    header: HomeHeaderVue,
    main: lifeInsListImp,
    aside: SideBar
  }
}

export const fenxiaoMonthlyBillListRouter = {
  path: '/advanceList/fenxiaoMonthlyBillList',
  components: {
    header: HomeHeaderVue,
    main: fenxiaoMonthlyBillList,
    aside: SideBar
  }
}
export const caiwuAdmitListRouter = {
  path: '/financialReport/caiwuAdmitList',
  components: {
    header: HomeHeaderVue,
    main: caiwuAdmitList,
    aside: SideBar
  }
}
