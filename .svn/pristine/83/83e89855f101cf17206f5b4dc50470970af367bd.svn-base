const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const Rateindex = _import('pages/rate_mgr/rateIndex')
const neiMengRateIndex = _import('pages/rate_mgr/neiMengRateIndex')
const Ratecheck = _import('pages/rate_mgr/rateCheck')
const neimengRateCheck = _import('pages/rate_mgr/neimengRateCheck')
const SideBar = _import('titcomponents/sideBar')
export const rateIndexRouter = {
  path: '/rate/rateIndex',
  components: {
    header: HomeHeaderVue,
    main: Rateindex,
    aside: SideBar
  }
}

export const neiMengRateIndexRouter = {
  path: '/rate/neimengRateIndex',
  components: {
    header: HomeHeaderVue,
    main: neiMengRateIndex,
    aside: SideBar
  }
}

export const rateCheckRouter = {
  path: '/rate/rateCheck',
  components: {
    header: HomeHeaderVue,
    main: Ratecheck,
    aside: SideBar
  }
}
export const neiMengRateCheckRouter = {
  path: '/rate/neimengRateCheck',
  components: {
    header: HomeHeaderVue,
    main: neimengRateCheck,
    aside: SideBar
  }
}
