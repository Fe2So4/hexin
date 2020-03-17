const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const bankInsurBatchCal = _import('pages/silverInsurCom_mgr/bankInsurBatchCal')
const moneyCalList = _import('pages/moneyInsur_mgr/moneyCalList')
const SideBar = _import('titcomponents/sideBar')
export const homeRouter = {
  path: '/silverInsurCom_mgr/bankInsurBatchCal',
  components: {
    header: HomeHeaderVue,
    main: bankInsurBatchCal,
    aside: SideBar
  }
}
export const moneyCalListRouter = {
  path: '/moneyInsur_mgr/moneyCalList',
  components: {
    header: HomeHeaderVue,
    main: moneyCalList,
    aside: SideBar
  }
}
