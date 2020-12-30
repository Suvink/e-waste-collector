<template>
  <div class="container login-container mt-1">
    <div class="has-text-centered">
      <h1 class="title is-2">Staff Log-in</h1>
      <img class="login-image" src="../assets/login.png">
      
      <div class="container has-text-centered">
        <div class="has-text-centred" v-if="isloading">
          <img src="../assets/loader.gif" style="height: 50px">
          <p>Signing in...</p>
        </div>
        <h1 class="title is-6" v-if="!isloading">Don't have an account? <router-link to="/signup">Signup</router-link></h1>
        <form v-if="!isloading">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input is-success" type="text" placeholder="Your username here..." value="" v-model="email">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input is-success" type="password" placeholder="Your password here..." value="" v-model="password">
            </div>
            <p class="help is-danger">{{ error }}</p>
          </div>
          <div class="field is-grouped justify-content-center">
            <div class="control">
              <button class="button is-primary" @click="login">Login</button>
            </div>
            <div class="control">
              <button class="button is-primary is-light" @click="reset">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseApp }  from '../firebase'

export default {
    name: 'Login',
    data: function(){
      return{
        email: '',
        password: '',
        error: '',
        isloading: false
      }
    },
    methods: {
      login: function(e){
        this.isloading = true
        firebaseApp.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user=>{
            console.log(user.user.email)
            this.$router.go({ path: this.$router.path })
          },
          err =>{
            this.isloading = false
            this.error = err.message
          }
        )
        e.preventDefault();
      },
      reset: function(e){
        this.email = ''
        this.password = ''
        this.error = ''
        e.preventDefault()
      }
    }
}
</script>

<style>
@import url('../assets/css/style.css');
</style>