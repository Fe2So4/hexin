const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const agentComIndex = _import('pages/silverInsurCom_mgr/silverInsurAgentList')
const topComProfitListIndex = _import('pages/lifeInsurReneCom_mgr/topComProfitList')
const neiMengComProfitListIndex = _import('pages/lifeInsurReneCom_mgr/neiMengComProfitList')
const moneyComBatchIndex = _import('pages/moneyInsur_mgr/moneyComBatch')
const SideBar = _import('titcomponents/sideBar')
export const advanceListIndexRouter = {
  path: '/agentCom/agentComIndex',
  components: {
    header: HomeHeaderVue,
    main: agentComIndex,
    aside: SideBar
  }
}
export const moneyComBatchRouter = {
  path: '/moneyInsur_mgr/moneyComBatch',
  components: {
    header: HomeHeaderVue,
    main: moneyComBatchIndex,
    aside: SideBar
  }
}
export const topComProfitListRouter = {
  path: '/advanceList/topComProfitList',
  components: {
    header: HomeHeaderVue,
    main: topComProfitListIndex,
    aside: SideBar
  }
}
export const neiMengComProfitListRouter = {
  path: '/advanceList/neiMengComProfitList',
  components: {
    header: HomeHeaderVue,
    main: neiMengComProfitListIndex,
    aside: SideBar
  }
}
