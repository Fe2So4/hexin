<template>
    <div class="container">
        <button @click="add">点我添加</button>
        <ul>
            <li v-for="item in list" :key="item.id">
                <input type="text" v-model="item.name"> 
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                list:[],
                id:1,
                test:'name'
            }
        },
        methods:{
            add() {
                var student = {
                    name:'数学',
                    id:this.id
                }
                this.list.push(student)
                this.id++
            }
        },
        components: {
            
        },
        watch: {
            
        }
    }
</script>  
<style lang="scss" scoped type="text/css">
   .container {
       margin-top: 100px;
       margin-left: 100px;
   }
</style>