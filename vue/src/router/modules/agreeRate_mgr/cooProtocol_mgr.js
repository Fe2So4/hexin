const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const cooPromgr = _import('pages/agreeRate_mgr/lifeinsProtocol/cooProtocol_mgr')
const cooRepoExportRouter = _import('pages/agreeRate_mgr/cooRepoExport')
const SideBar = _import('titcomponents/sideBar')

export const cooProtocolMgr = {
  path: '/agreeRate_mgr/cooProMgr',
  components: {
    header: HomeHeaderVue,
    main: cooPromgr,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}

export const cooRepoExportMgr = {
  path: '/cooReportMgr/cooRepoExport',
  components: {
    header: HomeHeaderVue,
    main: cooRepoExportRouter,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
