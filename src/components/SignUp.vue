<template>
  <div class="container has-text-centered dashbody pb-2">
    <div class="container">
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Collector Sign Up
            </h1>
          </div>
        </div>
      </section>

      <div
        class="notification mt-2"
        v-if="this.notify"
        v-bind:class="{
          'is-danger': this.notifyStatus == 'error',
          'is-success': this.notifyStatus == 'success',
        }"
      >
        <button class="delete" @click="this.hideNotification"></button>
        <p v-if="this.notifyStatus == 'error'">Something went wrong!</p>
        <p v-if="this.notifyStatus == 'success'">Signed Up successfully!</p>
      </div>

      <div class="container mt-2">
        <div class="columns">
          <div class="column is-6 ">
            <h1 class="title is-4 mb-0">Sign Up for a better</h1>
            <h1 class="title is-2 mt-0">TOMORROW!</h1>
            <img
              class="profile-image"
              src="https://www.greenmatch.co.uk/media/2464522/most-and-least-polluted-countries.jpg"
              alt=""
            />
            <h1 class="title is-6 mt-2">Instructions</h1>
            <p class="justify-text pl-1 pr-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>
          <div class="column is-6">
            <h1 class="title is-6">Register to collect E-Waste</h1>
            <div class="has-text-left">
              <form>
                <div class="field">
                  <label class="label">First Name</label>
                  <div class="control has-text-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="Text input"
                      v-model.trim="$v.userdata.fname.$model"
                    />
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.fname.required">
                    First Name is Required
                  </p>
                </div>
                <div class="field">
                  <label class="label">Last Name</label>
                  <div class="control has-text-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="Text input"
                      v-model.trim="$v.userdata.lname.$model"
                    />
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.lname.required">
                    Last Name is Required
                  </p>
                </div>
                <div class="field">
                  <label class="label">Email Address</label>
                  <div class="control has-text-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="Text input"
                      v-model.trim="$v.userdata.email.$model"
                    />
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.email.required">
                    Email is Required
                  </p>
                  <p class="help is-danger" v-if="!$v.userdata.email.email">
                    Must be a valid email address
                  </p>
                </div>
                <div class="field">
                  <label class="label">Age</label>
                  <div class="control has-text-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="Text input"
                      v-model.trim="$v.userdata.age.$model"
                    />
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.age.required">
                    Age is Required
                  </p>
                </div>
                <div class="field">
                  <label class="label">Phone No.</label>
                  <div class="control has-text-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="Text input"
                      v-model.trim="$v.userdata.phone.$model"
                    />
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.phone.required">
                    Phone Number is Required
                  </p>
                  <p class="help is-danger" v-if="!$v.userdata.phone.numeric">
                    Phone Number can only be numeric values
                  </p>
                </div>
                <div class="field">
                  <label class="label">Date of Birth</label>
                  <div class="control has-text-left">
                    <input
                      class="input"
                      type="date"
                      placeholder="Text input"
                      v-model.trim="$v.userdata.dob.$model"
                    />
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.dob.required">
                    Date of birth is Required
                  </p>
                </div>
                <div class="field">
                  <label class="label">NIC Number</label>
                  <div class="control has-text-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="Your NIC"
                      v-model.trim="$v.userdata.nic.$model"
                    />
                  </div>
                  <p class="help is-danger" v-if="!$v.userdata.nic.required">
                    NIC Number is Required
                  </p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-text-left">
                    <input
                      class="input"
                      type="password"
                      placeholder="Your Password goes here"
                      v-model.trim="$v.userdata.password.$model"
                    />
                  </div>
                  <p
                    class="help is-danger"
                    v-if="!$v.userdata.password.required"
                  >
                    A password is Required
                  </p>
                  <p
                    class="help is-danger"
                    v-if="!$v.userdata.password.minLength"
                  >
                    Password needs to be minimum 6 characters long
                  </p>
                </div>
                <div class="field">
                  <label class="label">Confirm Password</label>
                  <div class="control has-text-left">
                    <input
                      class="input"
                      type="password"
                      placeholder="Confirm your password"
                      v-model.trim="$v.userdata.confirmpassword.$model"
                    />
                  </div>
                  <p
                    class="help is-danger"
                    v-if="!$v.userdata.confirmpassword.required"
                  >
                    You need to confirm the password
                  </p>
                  <p class="help is-danger" v-if="this.passwordError">
                    Password Mismatch
                  </p>
                </div>
                <div class="field is-grouped justify-content-center">
                  <div class="control">
                    <button class="button is-primary" @click="signup">
                      Sign Up
                    </button>
                  </div>
                  <div class="control">
                    <button class="button is-danger" @click="reset">
                      Cancel
                    </button>
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
import { required, email, numeric, minLength } from "vuelidate/lib/validators";
import { firebaseApp, firebase, firebaseFirestore } from "../firebase";

export default {
  name: "Signup",
  data() {
    return {
      notify: false,
      notifyStatus: "",
      isLoading: false,
      passwordError: false,
      userdata: {
        fname: "",
        lname: "",
        age: "",
        phone: "",
        dob: "",
        nic: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
    };
  },
  validations: {
    userdata: {
      fname: { required },
      lname: { required },
      age: { required },
      phone: { required, numeric },
      dob: { required },
      nic: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmpassword: { required },
    },
  },
  methods: {
    signup(e) {
      this.isLoading = true;
      let thisState = this;
      let newUserId;
      if (this.$v.$anyError || this.$v.$invalid) {
        return;
      }
      if (this.userdata.password !== this.userdata.confirmpassword) {
        this.isLoading = false;
        this.passwordError = true;
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          thisState.userdata.email,
          thisState.userdata.password
        )
        .then(function() {
          console.log("Auth Added Successfully");
          thisState.newUserId = firebaseApp.auth().currentUser.uid;
        })
        .then((callback) => {
          //Create Authentication
          firebaseFirestore
            .collection("collectors")
            .doc(thisState.newUserId)
            .set({
              fname: thisState.userdata.fname,
              lname: thisState.userdata.lname,
              age: thisState.userdata.age,
              phone: thisState.userdata.phone,
              email: thisState.userdata.email,
              dob: thisState.userdata.dob,
              nic: thisState.userdata.nic,
              ongoing: "",
            })
            .catch(function(error) {
              if (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                return errorMessage;
              }
            });
          this.notify = true;
          this.notifyStatus = "success";
          thisState.$root.$emit("reloadNav", true);
          this.isLoading = false;
          this.reset();
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.notifyStatus = "error";
        });
      this.isLoading = false;
      window.scrollTo(0, 0);
      e.preventDefault();
    },
    reset: function(e) {
      this.userdata.fname = "";
      this.userdata.lname = "";
      this.userdata.age = "";
      this.userdata.phone = "";
      this.userdata.email = "";
      this.userdata.dob = "";
      this.userdata.nic = "";
      this.userdata.password = "";
      this.userdata.confirmpassword = "";
    },
    hideNotification: function() {
      this.notify = false;
    },
  },
};
</script>

<style></style>
