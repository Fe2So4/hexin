const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const RenewalRecord = _import('pages/lifeInsur_mgr/lifeInsur_renewal/renewalRecord')
const RenewalSuper = _import('pages/lifeInsur_mgr/lifeInsur_renewal/renewalRecordSuper')
const RenewalModify = _import('pages/lifeInsur_mgr/lifeInsur_renewal/renewalModify')
const RenewalMes = _import('pages/lifeInsur_mgr/lifeInsur_renewal/renewalMsg')
const SideBar = _import('titcomponents/sideBar')
const RenewalSuperEdit = _import('pages/lifeInsur_mgr/lifeInsur_renewal/renewalSuperEdit')
export const renewalRecordRouter = {
  path: 'lifeInsur_renewal/record',
  components: {
    header: HomeHeaderVue,
    main: RenewalRecord,
    aside: SideBar
  },
  meta: {
    keepAlive: false
  }
}

export const renewalSuperRouter = {
  path: 'lifeInsur_renewal/super',
  components: {
    header: HomeHeaderVue,
    main: RenewalSuper,
    aside: SideBar
  }
}

export const renewalModRouter = {
  path: 'lifeInsur_renewal/modify',
  components: {
    header: HomeHeaderVue,
    main: RenewalModify,
    aside: SideBar
  }
}

export const renewalMesRouter = {
  path: 'lifeInsur_renewal/message',
  components: {
    header: HomeHeaderVue,
    main: RenewalMes,
    aside: SideBar
  }
}

export const renewalNewRouter = {
  path: 'lifeInsur_renewal/renewalSuperEdit',
  components: {
    header: HomeHeaderVue,
    main: RenewalSuperEdit,
    aside: SideBar
  }
}
