const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const underWrite = _import('pages/moneyInsur_mgr/accInsListImp/carInsurance')
const carInsBatchImp = _import('pages/moneyInsur_mgr/checkInsListImp/carInsBatchImp')
const SideBar = _import('titcomponents/sideBar')

export const listImportRouter = {
  path: '/moneyInsur_mgr/carInsImp',
  components: {
    header: HomeHeaderVue,
    main: underWrite,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}

export const carInsBatchtRouter = {
  path: '/moneyInsur_mgr/carInsBatchImp',
  components: {
    header: HomeHeaderVue,
    main: carInsBatchImp,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
