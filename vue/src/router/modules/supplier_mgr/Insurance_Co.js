const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const QueryInsuranceCo = _import('pages/supplier_mgr/Insurance_Co')
const insOrgManage = _import('pages/supplier_mgr/Insurance_Org')
const cooCompany = _import('pages/supplier_mgr/Cooperation_Com')
const cooOrg = _import('pages/supplier_mgr/cooperation_Org')
const SideBar = _import('titcomponents/sideBar')
export const homeRouter = {
  path: '/supplier_mgr/Insurance_Co',
  components: {
    header: HomeHeaderVue,
    main: QueryInsuranceCo,
    aside: SideBar
  }
}

export const insuranceManage = {
  path: '/supplier_mgr/insManage',
  components: {
    header: HomeHeaderVue,
    main: insOrgManage,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}

export const cooComManage = {
  path: '/supplier_mgr/cooCompany',
  components: {
    header: HomeHeaderVue,
    main: cooCompany,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}

export const cooOrgManage = {
  path: '/supplier_mgr/cooOrg',
  components: {
    header: HomeHeaderVue,
    main: cooOrg,
    aside: SideBar
  },
  props: {
    aside: {hide: true}
  }
}
