const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const silverDitch = _import('pages/silverInsurAgent_mgr/silverDitch/silverDitch_import')
const silverDiffer = _import('pages/silverInsurAgent_mgr/silverDataDiffer/silverDataDiffer')
const SideBar = _import('titcomponents/sideBar')
export const silverDitchImport = {
  path: '/silverInsAgn/silverDitch',
  components: {
    header: HomeHeaderVue,
    main: silverDitch,
    aside: SideBar
  }
}

export const silverDataDiffer = {
  path: '/silverInsAgn/silverDiffer',
  components: {
    header: HomeHeaderVue,
    main: silverDiffer,
    aside: SideBar
  }
}
