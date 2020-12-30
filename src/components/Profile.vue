<template>
  <div class="container has-text-centered dashbody pb-2">
      <div class="container">
          <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                  <h1 class="title">
                      Account Settings
                  </h1>
                </div>
            </div>
        </section>

      <div class="notification mt-2" v-if="this.notify" v-bind:class="{'is-danger': this.notifyStatus=='error', 'is-success': this.notifyStatus == 'success'}">
        <button class="delete" @click="this.hideNotification"></button>
        <p v-if="this.notifyStatus == 'error'">Something went wrong!</p>
        <p v-if="this.notifyStatus == 'success'">Details Edited successfully!</p>
      </div>

        <div class="container mt-2">
          <div class="columns">
            <div class="column is-6 ">
              <img class="profile-image" src="../assets/dp.png" alt="">
              <h1 class="title is-4 mb-0">{{ this.userdataDefault.fname }} {{this.userdataDefault.lname}}</h1>
              <h1 class="subtitle is-6 mt-0">{{ this.userdataDefault.email }}</h1>
            </div>
            <div class="column is-6">
              <h1 class="title is-6">Edit Account Settings</h1>
              <div class="has-text-left">
                <form>
                <div class="field">
                  <label class="label">First Name</label>
                  <div class="control has-text-left">
                    <input class="input" type="text" placeholder="Text input"
                     v-model.trim='$v.userdata.fname.$model'
                     >
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.fname.required">First Name is Required</p>
                </div>
                <div class="field">
                  <label class="label">Last Name</label>
                  <div class="control has-text-left">
                    <input class="input" type="text" placeholder="Text input"
                    v-model.trim='$v.userdata.lname.$model'
                    >
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.lname.required">Last Name is Required</p>
                </div>
                <div class="field">
                  <label class="label">Email Address</label>
                  <div class="control has-text-left">
                    <input class="input" type="text" placeholder="Text input" disabled v-model="this.userdata.email">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Phone No.</label>
                  <div class="control has-text-left">
                    <input class="input" type="text" placeholder="Text input"
                    v-model.trim='$v.userdata.phone.$model'
                    >
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.phone.required">Phone Number is Required</p>
                  <p class="help is-danger" v-if="!$v.userdata.phone.numeric">Phone Number can only be numeric values</p>
                </div>
                <div class="field">
                  <label class="label">NIC Number</label>
                  <div class="control has-text-left">
                    <input class="input" type="text" placeholder="Text input"
                    v-model.trim='$v.userdata.nic.$model'
                    >
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.nic.required">NIC Number is Required</p>
                </div>
                <div class="field is-grouped justify-content-center">
                  <div class="control">
                    <button class="button is-primary" @click="updateInfo">Save</button>
                  </div>
                  <div class="control">
                    <button class="button is-danger" @click="cancel">Cancel</button>
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import { required, email, numeric } from 'vuelidate/lib/validators'
import { firebaseApp } from '../firebase'
export default {
    name: 'Profile',
    data(){
      return{
        loggedUserEmail: '',
        userdata: {},
        userdataDefault: {},
        notify: false,
        notifyStatus: '',
        uid: ''
      }
    },
    validations: {
      userdata: {
        fname: {required},
        lname: {required},
        phone: {required,numeric},
        nic: {required}
      }
    },
    created(){
      let loggedUserEmail = firebaseApp.auth().currentUser.email
      let thisState = this

      firebaseApp.firestore().collection("collectors").where("email","==", loggedUserEmail)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(function(doc){
            //Get user UID
            thisState.uid = doc.id

            thisState.userdata = doc.data()
            //For defaults
            thisState.userdataDefault = doc.data()
          })
        },
        error => {
          console.log(error)
        }
      )
    },
    methods: {
      updateInfo: function(e){
        let thisState = this
        firebaseApp.firestore().collection("users").doc(thisState.uid).update({
          fname: thisState.userdata.fname,
          lname: thisState.userdata.lname,
          email: thisState.userdata.email,
          phone: thisState.userdata.phone,
          nic: thisState.userdata.nic
        })
        .then(callback => {
          this.notify = true
          this.notifyStatus = 'success'
        })
        .catch(error => {
          this.notify = true
          this.notifyStatus = 'error'
          console.log(error)
        })
        window.scrollTo(0,0);
        e.preventDefault()
      },
      cancel: function(e){
        this.$router.go()
        e.preventDefault()
      },
      hideNotification: function(){
        this.notify = false,
        this.notifyStatus = ''
      }
    }
}
</script>

<style>

</style>