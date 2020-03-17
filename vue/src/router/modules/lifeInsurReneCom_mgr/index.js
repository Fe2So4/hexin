const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const renewalComIndex = _import('pages/lifeInsurReneCom_mgr/renewalConfigCoe')
const ComAmountIndex = _import('pages/lifeInsurReneCom_mgr/comAmount')
const renewCommCal = _import('pages/lifeInsurReneCom_mgr/renewCommCal')
const contiPerbatch = _import('pages/lifeInsurReneCom_mgr/contiPerBatch')
const contiPercheck = _import('pages/lifeInsurReneCom_mgr/contiPercheck')
const contiListCheck = _import('pages/lifeInsurReneCom_mgr/contiListCheck')
const SideBar = _import('titcomponents/sideBar')
export const advanceListIndexRouter = {
  path: '/index/renewalComIndex',
  components: {
    header: HomeHeaderVue,
    main: renewalComIndex,
    aside: SideBar
  }
}
export const ComAmountIndexRouter = {
  path: '/index/ComAmountIndex',
  components: {
    header: HomeHeaderVue,
    main: ComAmountIndex,
    aside: SideBar
  }
}
export const renewCommCalrouter = {
  path: '/lifeInsurReneCom_mgr/renewCommCal',
  components: {
    header: HomeHeaderVue,
    main: renewCommCal,
    aside: SideBar
  }
}
export const contiPerbatchrouter = {
  path: '/lifeInsurReneCom_mgr/contiPerbatch',
  components: {
    header: HomeHeaderVue,
    main: contiPerbatch,
    aside: SideBar
  }
}
export const contiPercheckrouter = {
  path: '/lifeInsurReneCom_mgr/contiPercheck',
  components: {
    header: HomeHeaderVue,
    main: contiPercheck,
    aside: SideBar
  }
}
export const contiListCheckrouter = {
  path: '/lifeInsurReneCom_mgr/contiListCheck',
  components: {
    header: HomeHeaderVue,
    main: contiListCheck,
    aside: SideBar
  }
}
