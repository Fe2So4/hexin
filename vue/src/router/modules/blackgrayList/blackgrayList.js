const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const blackgrayList = _import('pages/blackgrayList_mgr/blackgrayList')
const SideBar = _import('titcomponents/sideBar')
export const homeRouter = {
  path: '/blackgrayList_mgr/blackgrayList',
  components: {
    header: HomeHeaderVue,
    main: blackgrayList,
    aside: SideBar
  }
}
