<template>
  <div id="app">
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <TheHeader />
    <main id="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { api } from "@/services.js";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  created() {
    if (window.localStorage.token) {
      api
        .validateToken()
        .then(() => {
          this.$store.dispatch("getUsuario");
        })
        .catch(() => {
          window.localStorage.removeItem("token");
        });
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body,
ul,
li,
h1,
h2,
p {
  padding: 0px;
  margin: 0px;
}

ul {
  list-style: none;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #345;
  background: #f4f7fc;
}

.area {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(86, 143, 135, 0.2);
  animation: animate 20s linear infinite;
  bottom: -200px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
  background: rgba(232, 128, 0, 0.2);
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
  border-radius: 50%;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
  border-radius: 20%;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
  background: rgba(232, 128, 0, 0.25);
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
  border-radius: 50%;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
  background: rgba(86, 143, 135, 0.15);
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
  border-radius: 50%;
  background: rgba(232, 128, 0, 0.3);
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-120vh) rotate(720deg);
    opacity: 0;
  }
}

a {
  color: #345;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #568f87;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}

.btn:hover {
  background: #568f87;
  transform: scale(1.1);
}

.btn-disabled,
.btn-disabled:hover {
  background: #bbc;
  transform: scale(1);
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  position: relative;
}

#main {
  flex: 1;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
  width: 100%;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #568f87;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
