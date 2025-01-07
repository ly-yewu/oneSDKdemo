<script setup lang="ts">
import { ref} from 'vue'

const num=ref<number>(0)
const add=()=>{
  num.value++
}
</script>
<template>
  <div @click="add" class='wrapper'>{{ `${num}` }}</div>
</template>
<style lang="less" scoped>
@import '../style/mixin.less';
.wrapper{
  .border-radius(10px);
  color:@common-background;
}
</style>