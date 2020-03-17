const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const bankInsureBillcheck = _import('pages/bill_mgr/bankInsurBill_mgr/bankInsureBillcheck')
const SideBar = _import('titcomponents/sideBar')
export const homeRouter = {
  path: 'silverInsurAgentBill_mgr/bankInsureBillcheck',
  components: {
    header: HomeHeaderVue,
    main: bankInsureBillcheck,
    aside: SideBar
  }
}
