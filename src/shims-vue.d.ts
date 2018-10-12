declare module 'vue-script2';

declare module 'vue-analytics' {
  const content: any;
  export default content;
}

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
