const _import = require('../../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const lifeInsureBillMake = _import('pages/bill_mgr/lifeInsurBill_mgr/lifeInsureBillMake')
const test = _import('pages/bill_mgr/lifeInsurBill_mgr/test')
const lifeInsureBillFinance = _import('pages/bill_mgr/lifeInsurBill_mgr/lifeInsureBillFinance')
const LifeInsureBillView = _import('pages/bill_mgr/lifeInsurBill_mgr/lifeInsureBillView')
const SideBar = _import('titcomponents/sideBar')
export const homeRouter = {
  path: 'lifeInsurBill_mgr/lifeInsureBillMake',
  components: {
    header: HomeHeaderVue,
    main: lifeInsureBillMake,
    aside: SideBar
  }
}

export const lIBillFinance = {
  path: 'lifeInsurBill_mgr/lifeInsureBillFinance',
  components: {
    header: HomeHeaderVue,
    main: lifeInsureBillFinance,
    aside: SideBar
  }
}

export const testRouter = {
  path: 'lifeInsurBill_mgr/test',
  components: {
    header: HomeHeaderVue,
    main: test,
    aside: SideBar
  }
}

export const lIBillView = {
  path: 'lifeInsurBill/view',
  components: {
    header: HomeHeaderVue,
    main: LifeInsureBillView,
    aside: SideBar
  }
}
