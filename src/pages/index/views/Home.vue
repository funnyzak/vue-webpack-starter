<template>
  <div class="home">
    <img alt="Vue logo"
         src="@/assets/logo.png" />
    {{hello}}
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    {{apiResponseString}}
  </div>
</template>

<script lang="ts">
import Component, { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import AxiosRequest from '@/utils/request';
import { AxiosResponse } from 'axios';

const api: AxiosRequest = new AxiosRequest({
  baseURL: 'https://reqbin.com/echo/post/json'
});
@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  apiResponseString: string = '';

  apiDemo() {
    api.get('').then((res: AxiosResponse<any, any>) => {
      this.apiResponseString = JSON.stringify(res);
    });
  }

  mounted() {
    this.apiDemo();
  }

  data() {
    return {
      hello: 'hello world'
    };
  }
}
</script>
