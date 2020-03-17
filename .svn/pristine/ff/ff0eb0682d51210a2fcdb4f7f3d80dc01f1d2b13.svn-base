const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const guaQuery = _import('pages/moneyInsur_mgr/guaListQuery')
const batchQuery = _import('pages/moneyInsur_mgr/batchListQuery')
const SideBar = _import('titcomponents/sideBar')
export const rateIndexRouter = {
  path: '/listQuery/guaQuery',
  components: {
    header: HomeHeaderVue,
    main: guaQuery,
    aside: SideBar
  }
}

export const rateCheckRouter = {
  path: '/listQuery/batchQuery',
  components: {
    header: HomeHeaderVue,
    main: batchQuery,
    aside: SideBar
  }
}
