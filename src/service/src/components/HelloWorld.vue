<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { test } from '@common/helper/utils';
// const store = require('@common/helper/store')
import store from '@common/helper/store';
export default {
  name: '??',
  data () {
    return {
      msg: '??'
    }
  },

  created(){
    let uid = localStorage.getItem("uid")
    let suid = sessionStorage.getItem("uid")
    console.log("????", Cookies.get("uid"), uid, suid, store)
    test('?????')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
