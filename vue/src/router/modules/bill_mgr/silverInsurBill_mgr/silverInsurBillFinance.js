const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
// const cooperInsureBillFinance = _import('pages/bill_mgr/cooperInsurBill_mgr/cooperInsureBillFinance')
const renewRewardVerify = _import('pages/bill_mgr/cooperInsurBill_mgr/renewRewardVerify')
const channelDap = _import('pages/bill_mgr/cooperInsurBill_mgr/channelDapVerify')
const cooRenewRate = _import('pages/bill_mgr/cooperInsurBill_mgr/cooRenewRate')
const SideBar = _import('titcomponents/sideBar')
export const channelDapIndex = {
  path: '/silverInsurBill_mgr/channelDapVerify',
  components: {
    header: HomeHeaderVue,
    main: channelDap,
    aside: SideBar
  }
}
export const renewRewardVerifyIndex = {
  path: '/silverInsurBill_mgr/renewRewardVerify',
  components: {
    header: HomeHeaderVue,
    main: renewRewardVerify,
    aside: SideBar
  }
}
export const cooRenewRateIndex = {
  path: '/lifeInsurReneCom_mgr/cooRenewRate',
  components: {
    header: HomeHeaderVue,
    main: cooRenewRate,
    aside: SideBar
  }
}
