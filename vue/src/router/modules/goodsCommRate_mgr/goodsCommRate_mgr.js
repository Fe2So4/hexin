const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const bankCommissionConfig = _import('pages/goodsCommRate_mgr/bankCommissionConfig')
const commissionConfig = _import('pages/goodsCommRate_mgr/commissionConfig')
const ProCommissionSet = _import('pages/goodsCommRate_mgr/ProCommissionSet')
const SideBar = _import('titcomponents/sideBar')
const bankCommissionConfigRouter = {
  path: '/goodsCommRate_mgr/bankCommissionConfig',
  components: {
    header: HomeHeaderVue,
    main: bankCommissionConfig,
    aside: SideBar
  }
}
const commissionConfigRouter = {
  path: '/goodsCommRate_mgr/commissionConfig',
  components: {
    header: HomeHeaderVue,
    main: commissionConfig,
    aside: SideBar
  }
}
const commissionSetRouter = {
  path: '/goodsCommRate_mgr/commissionSet',
  components: {
    header: HomeHeaderVue,
    main: ProCommissionSet,
    aside: SideBar
  }
}
export {bankCommissionConfigRouter, commissionConfigRouter, commissionSetRouter}
