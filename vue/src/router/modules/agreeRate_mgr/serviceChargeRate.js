const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
// const service = _import('pages/agreeRate_mgr/serviceChargeRate')
const serviceChargeRate = _import('pages/agreeRate_mgr/lifeinsProtocol/cooRateMgr')
const SideBar = _import('titcomponents/sideBar')
export const serviceIndex = {
  path: '/serviceChargeRate/service',
  components: {
    header: HomeHeaderVue,
    main: serviceChargeRate,
    aside: SideBar
  }
}
