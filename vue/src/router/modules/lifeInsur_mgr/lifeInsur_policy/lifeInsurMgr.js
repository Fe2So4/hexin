const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const lifeInsurPolicy = _import('pages/lifeInsur_mgr/lifeInsur_policy/lifeInsurMgr')
const lifeInsurPolicyAdd = _import('pages/lifeInsur_mgr/lifeInsur_policy/lifeInsur_add')
const lifeInsurPolicyMod = _import('pages/lifeInsur_mgr/lifeInsur_policy/lifeInsur_mod')
const lifeInsurPolicySuperEdit = _import('pages/lifeInsur_mgr/lifeInsur_renewal/renewalSuperEdit')
const SideBar = _import('titcomponents/sideBar')
export const silInsurBillFin = {
  path: '/lifeInsur_policy/lifeInsurMgr',
  components: {
    header: HomeHeaderVue,
    main: lifeInsurPolicy,
    aside: SideBar
  }
}
export const lifeInsureMod = {
  path: '/lifeInsur_policy/lifeInsur_mod',
  components: {
    header: HomeHeaderVue,
    main: lifeInsurPolicySuperEdit,
    aside: SideBar
  }
}
export const lifeInsurAdd = {
  path: '/lifeInsur_policy/lifeInsur_add',
  components: {
    header: HomeHeaderVue,
    main: lifeInsurPolicyAdd,
    aside: SideBar
  }
}
export const lifeInsurEdit = {
  path: '/lifeInsur_renewal/renewalSuperEdit',
  components: {
    header: HomeHeaderVue,
    main: lifeInsurPolicyMod,
    aside: SideBar
  }
}
