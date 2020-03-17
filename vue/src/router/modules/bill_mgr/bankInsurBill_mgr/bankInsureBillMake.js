const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const bankInsureBillMake = _import('pages/bill_mgr/bankInsurBill_mgr/bankInsureBillMake')
const SideBar = _import('titcomponents/sideBar')
export const homeRouter = {
  path: 'bankInsurBill_mgr/bankInsureBillMake',
  components: {
    header: HomeHeaderVue,
    main: bankInsureBillMake,
    aside: SideBar
  }
}
