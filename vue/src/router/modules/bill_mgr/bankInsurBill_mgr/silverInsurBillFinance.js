const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const silverInsureBillFinance = _import('pages/bill_mgr/bankInsurBill_mgr/bankInsurBillFinance')
const SideBar = _import('titcomponents/sideBar')
export const silInsurBillFin = {
  path: '/bankInsurBill_mgr/silverInsurBillFinance',
  components: {
    header: HomeHeaderVue,
    main: silverInsureBillFinance,
    aside: SideBar
  }
}
