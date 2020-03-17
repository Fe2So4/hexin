const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const advanceListIndex = _import('pages/lifeInsurBusReport_mgr/advanceList')
const fenxiaoMonthlyBillList = _import('pages/lifeInsurBusReport_mgr/fenxiaoMonthlyBillList')
const SideBar = _import('titcomponents/sideBar')
export const advanceListIndexRouter = {
  path: '/advanceList/advanceListIndex',
  components: {
    header: HomeHeaderVue,
    main: advanceListIndex,
    aside: SideBar
  }
}
export const fenxiaoMonthlyBillListRouter = {
  path: '/advanceList/advanceListIndex',
  components: {
    header: HomeHeaderVue,
    main: fenxiaoMonthlyBillList,
    aside: SideBar
  }
}
