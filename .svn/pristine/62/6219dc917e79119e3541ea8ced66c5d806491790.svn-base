<template>
<el-collapse-transition>
  <div id="temp">
    <span v-if="id" >订单号:{{id}}</span>
    <el-form label-position="left" label-width="80px" :model="order">
      <el-form-item label="商品名">
        <el-input v-model="order.cname"></el-input>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="order.num"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="order.price"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="order.address"></el-input>
      </el-form-item>
      <el-form-item label="邮编">
        <el-input v-model="order.zip"></el-input>
      </el-form-item>
    </el-form>
    <el-button v-if="id" @click="updateOrder(order)" type="primary">
      保存
    </el-button>
    <el-button v-else @click="addOrder(order)" type="primary">
      新增
    </el-button>
  </div>
</el-collapse-transition>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      order: {}
    }
  },
  mounted () {
    if (this.id !== undefined) {
      this.order = this.$store.getters.getOrderById(parseInt(this.id))
    }
  },
  methods: {
    addOrder (order) {
      this.$store.dispatch('addOrder', order).then(() => {
        this.$router.push('/orderList')
      })
    },
    updateOrder (order) {
      this.$store.dispatch('updateOrder', order).then(() => {
        this.$router.push('/orderList')
      })
    }
  },
  props: ['id']
}
</script>

<style lang="scss" scoped type="text/css">
</style>
