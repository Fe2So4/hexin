const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const TdEmpIntern = _import('pages/company_mgr/tdEmpIntern')
const SideBar = _import('titcomponents/sideBar')

export const tdEmpIntern = {
  path: '/orgBy/tdEmpIntern',
  components: {
    header: HomeHeaderVue,
    main: TdEmpIntern,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
