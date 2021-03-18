<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">Todo</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/todos" class="nav-link" v-if="is_authenticated">My Todos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link" v-if="is_authenticated">Add Todo</router-link>
        </li>
      </div>
          <router-link to="/auth/login" class="nav-link" v-if="!is_authenticated">Login</router-link>
          <router-link to="/auth/register" class="nav-link" v-if="!is_authenticated">Register</router-link>
      <div>
         <a to="/auth/register" @click="logOut" class="nav-link" v-if="is_authenticated">Logout</a>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { isAuthenticated } from '../src/services/utils';
const auth = isAuthenticated();


export default {
  name: "app",
  data() {
    return {
      "is_authenticated" : auth ? true : false,
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('x-access-token');
      document.location.href = "/auth/login";
    },
  }
};
</script>
