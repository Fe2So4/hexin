const _import = require('../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const HomeIndex = _import('pages/home/homeindex')
const employee = _import('pages/employee/employee')
const basicLaw = _import('pages/employee/basicLaw')
const teamPropertyInsure = _import('pages/employee/teamPropertyInsure')
const attendance = _import('pages/employee/attendance')
const statisticsTlife = _import('pages/employee/statisticsTlife')
const statisticsYbdl = _import('pages/employee/statisticsYbdl')
const statisticsZhanqi = _import('pages/employee/statisticsZhanqi')
const SideBar = _import('titcomponents/sideBar')

const statisticsTcar = _import('pages/employee/statisticsTcar')
const statisticsTproperty = _import('pages/employee/statisticsTproperty')

const manageIncome = _import('pages/employee/manageIncome')
const zhanqiRate = _import('pages/employee/zhanqiRate')

const income = _import('pages/employee/income')
const levelup = _import('pages/employee/levelup')

const statisticsLevelup = _import('pages/employee/statisticsLevelup')
const statisticsEmployEmployee = _import('pages/employee/statisticsEmployEmployee')

const statisticsActiveEmployee = _import('pages/employee/statisticsActiveEmployee')
const statisticsReportPolicy = _import('pages/employee/statisticsReportPolicy')
const incomeRevise = _import('pages/employee/incomeRevise')
const passWord = _import('pages/employee/passWord')
const salarylist = _import('pages/employee/salarylist')
const partnerRenewalProList = _import('pages/employee/partnerRenewalProList')
const lifeCharge = _import('pages/employee/lifeCharge')
export const homeRouter = {
  path: '/',
  components: {
    header: HomeHeaderVue,
    main: HomeIndex,
    aside: SideBar
  }
}
export const passWordRouter = {
  path: '/employee/account',
  components: {
    header: HomeHeaderVue,
    main: passWord,
    aside: SideBar
  }
}
export const employeeRouter = {
  path: '/employee/employee',
  components: {
    header: HomeHeaderVue,
    main: employee,
    aside: SideBar
  }
}
export const incomeReviseRouter = {
  path: '/employee/income-revise',
  components: {
    header: HomeHeaderVue,
    main: incomeRevise,
    aside: SideBar
  }
}
export const basicLawRouter = {
  path: '/employee/basic-law',
  components: {
    header: HomeHeaderVue,
    main: basicLaw,
    aside: SideBar
  }
}
export const teamPropertyInsureRouter = {
  path: '/employee/property-policy',
  components: {
    header: HomeHeaderVue,
    main: teamPropertyInsure,
    aside: SideBar
  }
}

export const attendanceRouter = {
  path: '/employee/attendance',
  components: {
    header: HomeHeaderVue,
    main: attendance,
    aside: SideBar
  }
}
export const statisticsTlifeRouter = {
  path: '/employee/statistics-tlife',
  components: {
    header: HomeHeaderVue,
    main: statisticsTlife,
    aside: SideBar
  }
}
export const statisticsYbdlRouter = {
  path: '/employee/statistics-ybdl',
  components: {
    header: HomeHeaderVue,
    main: statisticsYbdl,
    aside: SideBar
  }
}
export const statisticsZhanqiRouter = {
  path: '/employee/statistics-zhanqi',
  components: {
    header: HomeHeaderVue,
    main: statisticsZhanqi,
    aside: SideBar
  }
}

export const statisticsTcarRouter = {
  path: '/employee/statistics-tcar',
  components: {
    header: HomeHeaderVue,
    main: statisticsTcar,
    aside: SideBar
  }
}
export const statisticsTpropertyRouter = {
  path: '/employee/statistics-tproperty',
  components: {
    header: HomeHeaderVue,
    main: statisticsTproperty,
    aside: SideBar
  }
}
export const manageIncomeRouter = {
  path: '/employee/manage-income',
  components: {
    header: HomeHeaderVue,
    main: manageIncome,
    aside: SideBar
  }
}
export const zhanqiRateRouter = {
  path: '/employee/zhanqi-rate',
  components: {
    header: HomeHeaderVue,
    main: zhanqiRate,
    aside: SideBar
  }
}

export const incomeRouter = {
  path: '/employee/income',
  components: {
    header: HomeHeaderVue,
    main: income,
    aside: SideBar
  }
}
export const levelupRouter = {
  path: '/employee/levelup',
  components: {
    header: HomeHeaderVue,
    main: levelup,
    aside: SideBar
  }
}
export const statisticsLevelupRouter = {
  path: '/employee/statistics-levelup',
  components: {
    header: HomeHeaderVue,
    main: statisticsLevelup,
    aside: SideBar
  }
}
export const statisticsEmployEmployeeRouter = {
  path: '/employee/statistics-employ-employee',
  components: {
    header: HomeHeaderVue,
    main: statisticsEmployEmployee,
    aside: SideBar
  }
}

export const statisticsActiveEmployeeRouter = {
  path: '/employee/statistics-active-employee',
  components: {
    header: HomeHeaderVue,
    main: statisticsActiveEmployee,
    aside: SideBar
  }
}
export const statisticsReportPolicyRouter = {
  path: '/employee/statistics-report-policy',
  components: {
    header: HomeHeaderVue,
    main: statisticsReportPolicy,
    aside: SideBar
  }
}
export const salarylistRouter = {
  path: '/employee/salarylist',
  components: {
    header: HomeHeaderVue,
    main: salarylist,
    aside: SideBar
  }
}
export const partnerRenewalProListRouter = {
  path: '/employee/partnerRenewalProList',
  components: {
    header: HomeHeaderVue,
    main: partnerRenewalProList,
    aside: SideBar
  }
}
export const lifeChargeRouter = {
  path: '/employee/life-charge',
  components: {
    header: HomeHeaderVue,
    main: lifeCharge,
    aside: SideBar
  }
}
