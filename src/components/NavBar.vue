<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link to="/">
      <a class="navbar-item">
        <img src="../assets/logo.png" height="28">
      </a>
    </router-link>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link  v-if="!isLoggedIn" to="/signup">
            <a class="button is-primary mr-1">
              <strong>Sign up</strong>
            </a>
          </router-link>
          <router-link to="/">
            <a class="button is-light"  v-if="!isLoggedIn">
              Log in
            </a>
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
            <a class="navbar-link">
              {{ this.currentUser }}
              <i class="fas fa-user login-icon"></i>
            </a>

            <div class="navbar-dropdown">
              <router-link to="/dashboard">
                <a class="navbar-item">
                  Dashboard
                </a>
              </router-link>
              <router-link to="/profile">
                <a class="navbar-item">
                  Account Settings
                </a>
              </router-link>
              <router-link to="/history">
                <a class="navbar-item">
                  E-waste History
                </a>
              </router-link>
              <hr class="navbar-divider">
              <div class="has-text-centered">
                <a class="button is-danger" @click="logout">
                Sign Out
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { firebaseApp } from '../firebase'

export default {
    name: 'NavBar',
    data(){
      return{
        isLoggedIn: 'false',
        currentUser: 'false'
      }
    },
    created(){
      this.$root.$on("reloadNav", () => {
        if(firebaseApp.auth().currentUser){
          this.isLoggedIn = true
          this.currentUser = firebaseApp.auth().currentUser.email
        }else{
          this.isLoggedIn = false
        }
      });
      
      if(firebaseApp.auth().currentUser){
        this.isLoggedIn = true
        this.currentUser = firebaseApp.auth().currentUser.email
      }else{
        this.isLoggedIn = false
      }
    },
    methods: {
      logout: function(){
        firebaseApp.auth().signOut()
        .then(() => {
          this.isLoggedIn = false;
          this.$router.push("/")
        })
      }
    }
}

</script>

<style>
@import url('../assets/css/style.css');
</style>