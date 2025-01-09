<template>
    <div class="private-layout">
      <router-view />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: "privateLayout",
  
    data() {
      return {
      };
    },
  });
  
  </script>
  
  <style scoped>
  .private-layout {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  .my-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4CAF50;
    border-radius: 20px;
    color: white;
    padding: 10px 24px;
    text-align: center;
    text-decoration: none;
  }
  </style>