<template>
    <el-submenu :popper-class ="children.parentId?'':'sub-popper'" v-if="children.children" :index="children.id">
      <side-bar-item v-if="children.children" v-for="item in children.children" :menu="menu + 1" :children="item" :key="item.id" :class="background"/>
      <template slot="title">
        <div :class="children.parentId?'':'my-el-menu-item'">
        <i v-if="children.icon" :class="`font_family icon-jy-menu-${children.icon || 1}`" ><div>{{children.label}}</div></i>
        <div v-else >{{children.label}}</div>
        </div>
      </template>
    </el-submenu>
    <el-menu-item @click="changeRoute(children.url)" :class="children.parentId?'':'my-el-menu-item'" v-else :index="children.id">
      <i v-if="children.icon" :class="`font_family icon-jy-menu-${children.icon || 1}`"><div>{{children.label}}</div></i>
      <div v-else >{{children.label}}</div>
    </el-menu-item>
</template>

<script>
export default {
  name: 'side-bar-item',
  data () {
    return {
      background: this.getBack()
    }
  },
  props: ['children', 'menu'],
  mounted () {
    setTimeout(() => {
      var width = document.getElementById('sideBar') ? document.getElementById('sideBar').clientWidth : 0
      console.log(width)
      this.$store.dispatch('changeView', width ? width + 20 : width)
    }, 0)
  },
  methods: {
    changeRoute (to) {
      if (to) {
        this.$router.push(to)
        setTimeout(() => {
          var width = document.getElementById('sideBar') ? document.getElementById('sideBar').clientWidth : 0
          console.log(width)
          this.$store.dispatch('changeView', width ? width + 20 : width)
        }, 0)
      }
    },
    getBack () {
      if (this.menu === 1) {
        return 'secondMenu'
      } else {
        return 'thirdMenu'
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
@import "../variable.scss";
i div {
  display: inline-block;
  font-size: 16px;
  margin-left: 10px;
  vertical-align: middle;
  color: #242424;
}
.el-menu-item.is-active i div,.el-menu-item.is-active i:before{
  color: #fff;
}
i:before{
  padding: 6PX;
  border: 2PX solid ;
  border-radius: 30PX;
  color: $base-blue;
}
</style>
