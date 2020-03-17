const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const contRate = _import('pages/contRateReport_mgr/serviceContRate')
const SideBar = _import('titcomponents/sideBar')

export const contRateIndex = {
  path: '/contRate/contRate',
  components: {
    header: HomeHeaderVue,
    main: contRate,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
