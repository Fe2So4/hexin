const _import = require('../../_import_' + process.env.NODE_ENV)
const myTest = _import('pages/a/a')
const HomeHeaderVue = _import('components/homeheader')
// const service = _import('pages/agreeRate_mgr/serviceChargeRate')
const SideBar = _import('titcomponents/sideBar')
export const demomyTest = {
    path: '/test/mytest',
    components: {
      header: HomeHeaderVue,
      main: myTest,
      aside: SideBar
    }
  }