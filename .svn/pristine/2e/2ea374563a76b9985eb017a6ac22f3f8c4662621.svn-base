const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const ZongtRepoList = _import('pages/company_mgr/zongtRepoList')
const SideBar = _import('titcomponents/sideBar')

export const zongtRepoList = {
  path: '/advanceList/zongtRepoList',
  components: {
    header: HomeHeaderVue,
    main: ZongtRepoList,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
