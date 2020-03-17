const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const silverInsListImp = _import('pages/silverInsurBusReport_mgr/silverInslistImp')
const SideBar = _import('titcomponents/sideBar')
export const silverInsList = {
  path: '/silverList/silverInsListImp',
  components: {
    header: HomeHeaderVue,
    main: silverInsListImp,
    aside: SideBar
  }
}
