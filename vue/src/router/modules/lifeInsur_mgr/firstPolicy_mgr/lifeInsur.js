const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const insComBus = _import('pages/lifeInsur_mgr/firstPolicy_mgr/insComBusiness_import')
const insBatch = _import('pages/lifeInsur_mgr/firstPolicy_mgr/batchHandle')
const insDiffer = _import('pages/lifeInsur_mgr/firstPolicy_mgr/lifeInsur_differ')
const clientInfoUpdate = _import('pages/lifeInsur_mgr/firstPolicy_mgr/clientInfoUpdate')
const insModify = _import('pages/lifeInsur_mgr/firstPolicy_mgr/insBillModify')
const newBill = _import('pages/lifeInsur_mgr/firstPolicy_mgr/newContractBillEnter')
const SideBar = _import('titcomponents/sideBar')
export const insComBusiness = {
  path: '/lifeInsur/insComBusImp',
  components: {
    header: HomeHeaderVue,
    main: insComBus,
    aside: SideBar
  }
}

export const batchHandle = {
  path: '/lifeInsur/batchHandle',
  components: {
    header: HomeHeaderVue,
    main: insBatch,
    aside: SideBar
  }
}

export const lifeInsDiffer = {
  path: '/lifeInsur/insDiffer',
  components: {
    header: HomeHeaderVue,
    main: insDiffer,
    aside: SideBar
  }
}

export const clientInfoUpdateRoute = {
  path: '/lifeInsur/clientInfoUpdate',
  components: {
    header: HomeHeaderVue,
    main: clientInfoUpdate,
    aside: SideBar
  }
}

export const insBillModify = {
  path: '/lifeInsur/billModify',
  components: {
    header: HomeHeaderVue,
    main: insModify,
    aside: SideBar
  }
}

export const newContractBill = {
  path: '/lifeInsur/newContractBill',
  components: {
    header: HomeHeaderVue,
    main: newBill,
    aside: SideBar
  }
}
