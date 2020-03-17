const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const OrgManage = _import('pages/company_mgr/byOrgan_mgr/orgmanage')
const SideBar = _import('titcomponents/sideBar')

export const orgManage = {
  path: '/orgBy/manage',
  components: {
    header: HomeHeaderVue,
    main: OrgManage,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
