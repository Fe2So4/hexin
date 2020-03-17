const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const lifeCIRCReportmgr = _import('pages/CIRCReport_mgr/lifeCIRCReport_mgr')
const moneyCIRCReportmgr = _import('pages/CIRCReport_mgr/moneyCIRCReport_mgr')
const makeCIRCReportmgr = _import('pages/CIRCReport_mgr/makeCIRCReport_mgr')
const SideBar = _import('titcomponents/sideBar')
export const CIRCReportRouter = {
  path: '/CIRCReport_mgr/lifeCIRCReport_mgr',
  components: {
    header: HomeHeaderVue,
    main: lifeCIRCReportmgr,
    aside: SideBar
  }
}
export const MoneyCIRCReportRouter = {
  path: '/CIRCReport_mgr/moneyCIRCReport_mgr',
  components: {
    header: HomeHeaderVue,
    main: moneyCIRCReportmgr,
    aside: SideBar
  }
}
export const MakeCIRCReportRouter = {
  path: '/CIRCReport_mgr/makeCIRCReport_mgr',
  components: {
    header: HomeHeaderVue,
    main: makeCIRCReportmgr,
    aside: SideBar
  }
}
