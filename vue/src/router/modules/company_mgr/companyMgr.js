const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const OrgManage = _import('pages/company_mgr/byOrgan_mgr/orgmanage')
const agentMgr = _import('pages/company_mgr/agent_mgr/agentManage')
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

export const agentManage = {
  path: '/agent/manage',
  components: {
    header: HomeHeaderVue,
    main: agentMgr,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
