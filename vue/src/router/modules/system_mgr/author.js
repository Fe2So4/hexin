const _import = require('../../_import_' + process.env.NODE_ENV)
const HomeHeaderVue = _import('components/homeheader')
const AuthorIndex = _import('pages/system_mgr/persPermSet/authorIndex')
const PostManage = _import('pages/system_mgr/post_mgr/postMgr')
const AuthorCopy = _import('pages/system_mgr/persPermSet/authorCopy')
const SideBar = _import('titcomponents/sideBar')
export const authorRouter = {
  path: '/author/index',
  components: {
    header: HomeHeaderVue,
    main: AuthorIndex,
    aside: SideBar
  }
}

export const postRouter = {
  path: '/author/post',
  components: {
    header: HomeHeaderVue,
    main: PostManage,
    aside: SideBar
  }
}

export const authorCopyRouter = {
  path: '/author/copy',
  components: {
    header: HomeHeaderVue,
    main: AuthorCopy,
    aside: SideBar
  }
}
