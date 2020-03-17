<template>
  <div id="sideBar">
    <transition name="slide-left">
      <div v-show="show">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="false"
          @open="handleOpen"
          @close="handleClose">
        <side-bar-item :key="item.id" :children="item" :menu="1" v-for="item in menus" class="firstMenu"/>
        </el-menu>
      </div>
    </transition>
    <!-- <div v-show="show">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="false"
          @open="handleOpen"
          @close="handleClose">
        <side-bar-item :key="item.id" :children="item" :menu="1" v-for="item in menus" class="firstMenu"/>
        </el-menu>
      </div> -->
    <div class="menu-hover" @click="showMenu">
      <i style="margin-top: 10px;" :class="icon"></i>
    </div>
  </div>

</template>

<script>
import SideBarItem from './sideBarItem.vue'
export default {
  name: '',
  data () {
    return {
      show: true,
      icon: 'el-icon-d-arrow-left'
    }
  },
  mounted () {
    this.clacMargin()
    window.onresize = this.clacMargin()
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    clacMargin () {
      setTimeout(() => {
        var width = document.getElementById('sideBar') ? document.getElementById('sideBar').clientWidth : 0
        console.log(width)
        if (this.show) {
          this.$store.dispatch('changeView', width + 20)
        } else {
          this.$store.dispatch('changeView', 0)
        }
        // this.$store.dispatch('changeView', width ? width + 20 : width)
      }, 150)
    },
    showMenu () {
      this.show = !this.show
      if (this.show) {
        this.icon = 'el-icon-d-arrow-left'
      } else {
        this.icon = 'el-icon-d-arrow-right'
      }
      this.clacMargin()
    },
    hideMenu () {
      this.show = false
      this.clacMargin()
    }
  },
  components: {
    [SideBarItem.name]: SideBarItem
  },
  computed: {
    menus () {
      return this.$store.state.login.menuData
    },
    defaultActive () {
      const selected = this.$store.state.login.menuData.find(ele => {
        return ele.linkto === this.$router.currentRoute.fullPath
      }) || {}
      return selected.id
    }
  },
  props: ['hide']
}
</script>

<style lang="scss" type="text/css">
@import "../variable.scss";
#sideBar{
  position: fixed;
  top: 69px;
  background: #fff;
  border: #d0d0d0;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  z-index: 5;
  height: 90%;
  overflow-y: auto;
  color: #ffffff;
}
.sibar{
  top: 8rem!important;
  margin-left: 0!important;
}
.side_bar_control{
  text-align: center;
  cursor: pointer;
  line-height: 30px;
  background: #bfe1f7;
  color: #ffffff;
}
/* .firstMenu{
  background: #02213f;
}
.secondMenu{
  background: #011528;
}
.thirdMenu{
  background: #000c16;
} */
.firstMenu{
  background: #f5f5f5;
}
.secondMenu{
  background: #e9e9e9;
}
.thirdMenu{
  background: #d9d9d9;
}
.el-menu{
  border-right: 0;
}
.my-el-menu-item a{
  color: #242424;
  text-decoration:none;
}
.el-menu-item,.my-el-menu-item,.el-submenu__title,.el-submenu .el-menu-item {
  height: 52px;
  line-height: 3.25;
  font-size: 16px;
 // color: white;
}
.el-menu-item.is-active{
  color: #ffffff;
  background: #2593fb
}
.el-menu-item.is-active a {
  color: #fff;
  text-decoration:none;
}
.el-menu--collapse{
  width: auto;
}
.el-menu-item:hover {
  background: #ecf6fd !important;
  color: #1f90e6 !important;
}
.el-submenu__title:hover {
  background: #ecf6fd !important;
  color: #1f90e6 !important;
}
.menu-hover {
  position: fixed;
  left: 0;
  top: 45%;
  bottom: 0;
  width: 20px;
  color: white;
  height: 40px;
  background-color: #04143c5c;
  vertical-align:middle;
  display: table-cell;
}
.el-checkbox__inner {
  border: 1px solid #191817 ;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #ecf6fd;
}
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: -webkit-gradient(linear, left bottom, right top, from(#003cce), to(#52CEFF));
}
</style>
