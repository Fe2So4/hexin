const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const moneyInsureBillFinance = _import('pages/bill_mgr/moneyInsurBill_mgr/moneyInsurBillFinance')
const moneyInsureBillView = _import('pages/bill_mgr/moneyInsurBill_mgr/moneyInsurBillView')
const SideBar = _import('titcomponents/sideBar')
export const monInsurBillFin = {
  path: 'moneyInsurBill_mgr/moneyInsurBillFinance',
  components: {
    header: HomeHeaderVue,
    main: moneyInsureBillFinance,
    aside: SideBar
  }
}

export const monInsurBillView = {
  path: 'moneyInsurBill_mgr/moneyInsurBillView',
  components: {
    header: HomeHeaderVue,
    main: moneyInsureBillView,
    aside: SideBar
  }
}
