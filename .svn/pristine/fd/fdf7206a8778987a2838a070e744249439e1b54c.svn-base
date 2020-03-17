const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const RiskIndex = _import('pages/goodsCommRate_mgr/riskindex')
const RiskImport = _import('pages/goodsCommRate_mgr/riskImport')
const SideBar = _import('titcomponents/sideBar')

export const riskRouter = {
  path: '/risk/index',
  components: {
    header: HomeHeaderVue,
    main: RiskIndex,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}

export const riskUpRouter = {
  path: '/risk/upload',
  components: {
    header: HomeHeaderVue,
    main: RiskImport,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
