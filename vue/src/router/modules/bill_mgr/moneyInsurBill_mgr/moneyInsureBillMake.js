const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const moneyInsureBillMake = _import('pages/bill_mgr/moneyInsurBill_mgr/moneyInsureBillMake')
const SideBar = _import('titcomponents/sideBar')
export const homeRouter = {
  path: 'moneyInsurBill_mgr/moneyInsureBillMake',
  components: {
    header: HomeHeaderVue,
    main: moneyInsureBillMake,
    aside: SideBar
  }
}
