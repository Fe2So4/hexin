const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const quitListMgr = _import('pages/lifeInsur_mgr/quitListMgr')
const quitListMgrAdmin = _import('pages/lifeInsur_mgr/quitListMgrAdmin')
const agentSalCheck = _import('pages/employee/agentSalCheck')

const SideBar = _import('titcomponents/sideBar')
export const homeRouter = {
  path: '/lifeInsur_mgr/quitListMgr',
  components: {
    header: HomeHeaderVue,
    main: quitListMgr,
    aside: SideBar
  }
}
export const homeRouter1 = {
  path: '/lifeInsur_mgr/quitListMgrAdmin',
  components: {
    header: HomeHeaderVue,
    main: quitListMgrAdmin,
    aside: SideBar
  }
}
export const agentSalCheckRouter = {
  path: '/lifeInsur_mgr/agentSalCheck',
  components: {
    header: HomeHeaderVue,
    main: agentSalCheck,
    aside: SideBar
  }
}
