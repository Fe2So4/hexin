const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const dataDictionary = _import('pages/system_mgr/dataDictionary/datadictionary')
const SideBar = _import('titcomponents/sideBar')
export const DataDictionary = {
  path: '/system_mgr/dictionary',
  components: {
    header: HomeHeaderVue,
    main: dataDictionary,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
