const _import = require('../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const OrgAdd = _import('pages/org/orgadd')
const SideBar = _import('titcomponents/sideBar')

export const addOrg = {
  path: '/org/add',
  components: {
    header: HomeHeaderVue,
    main: OrgAdd,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
