<template>
  <div class="container has-text-centered dashbody pb-2">
    <div class="container">
      <section class="hero is-primary mt-2">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Collector Dashboard
            </h1>
            <h2 class="subtitle">Welcome {{ this.userdata.fname }}</h2>
          </div>
        </div>
      </section>

      <section class="mt-2">
        <h1 class="title is-4">Current Requests</h1>
        <div class=" container req-table has-text-centered">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Request No.</th>
                <th>Item Category</th>
                <th>Sub Category</th>
                <th>Address</th>
                <th>Province</th>
                <th>Time</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(job, index) in jobslist" v-bind:key="index">
                <td>{{ job.ref.toString().substr(0, 7) }}</td>
                <td>{{ job.itemCategory }}</td>
                <td>{{ job.subCategory }}</td>
                <td>{{ job.pickupAddress }}</td>
                <td>{{ job.customerProvince }}</td>
                <td>{{ job.time }}</td>
                <td>{{ job.date }}</td>
                <td>
                  <button
                    class="button is-small is-warning hvr-pulse-grow"
                    @click="reserveJob(job.ref)"
                  >
                    Reserve
                  </button>
                </td>
              </tr>
              <tr v-if="this.jobslist.length == '0'">
                <td colspan="7" style="text-align: center">
                  There are no jobs available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mt-2">
        <h1 class="title is-4">Ongoing Jobs</h1>
        <div class=" container req-table has-text-centered">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Request No.</th>
                <th>Item Category</th>
                <th>Sub Category</th>
                <th>Address</th>
                <th>Province</th>
                <th>Time</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody v-for="(job, index) in ongoingjobs" v-bind:key="index">
              <tr v-if="!job.completed">
                <td>{{ job.ref.toString().substr(0, 7) }}</td>
                <td>{{ job.itemCategory }}</td>
                <td>{{ job.subCategory }}</td>
                <td>{{ job.pickupAddress }}</td>
                <td>{{ job.customerProvince }}</td>
                <td>{{ job.time }}</td>
                <td>{{ job.date }}</td>
                <td>
                  <button
                    class="button is-small is-warning hvr-pulse-grow"
                    v-on:click="job.open = !job.open"
                  >
                    <i v-if="job.open" class="fas fa-angle-down"></i>
                    <i v-if="!job.open" class="fas fa-angle-right"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="job.open && !job.completed">
                <td colspan="8">
                  <section class="mt-2">
                    <div class="card ongoing-card">
                      <h1 class="title is-4 ongoing-title">Update Job</h1>
                      <div class="columns mt-1">
                        <div class="column is-2"></div>
                        <div
                          class="column is-3 has-text-centered justify-content-center"
                        >
                          <img
                            src="https://nnimgt-a.akamaihd.net/transform/v1/crop/frm/fdcx/dc5syd-6pkhpem4t288etxj58g.jpg/r0_117_2111_1309_w1200_h678_fmax.jpg"
                          />
                        </div>
                        <div class="column is-5 has-text-left">
                          <p><b>Customer Name:</b> {{ job.customerName }}</p>
                          <p><b>Customer Name:</b> {{ job.customerPhone }}</p>
                          <p><b>Address:</b> {{ job.pickupAddress }}</p>
                          <p><b>Item Category:</b> {{ job.itemCategory }}</p>
                          <p><b>Sub Category:</b> {{ job.subCategory }}</p>
                          <hr class="mb-1" />
                          <div class="field">
                            <label class="label">Enter Weight (in kg)</label>
                            <div class="control field-control">
                              <input
                                class="input is-success"
                                type="text"
                                placeholder="Item weight in kilograms. Eg: 0.5"
                                v-model="itemWeight"
                                @input="job.weight = $event.target.value"
                              />
                            </div>
                            <p class="help is-danger">{{ error }}</p>
                          </div>
                          <button class="button is-danger mt-1">Cancel</button>
                          <button
                            class="button is-success mt-1 ml-1"
                            @click="completeJob(job)"
                          >
                            Mark as completed
                          </button>
                        </div>
                        <div class="column is-2"></div>
                      </div>
                    </div>
                  </section>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr v-if="this.ongoingjobs.length == '0'">
                <td colspan="7" style="text-align: center">
                  There are no jobs available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { firebaseApp, firebase } from "../firebase";
const axios = require("axios");

export default {
  name: "Dashboard",
  data() {
    return {
      jobslist: [],
      userdata: {},
      notify: false,
      notifyStatus: "",
      ongoingjobs: [],
      userid: "",
      itemWeight: 0,
      error: "",
      itemPoints: 0,
    };
  },
  created() {
    let thisState = this;
    let loggedUserEmail = firebaseApp.auth().currentUser.email;
    //Get Logged in Collector's details
    firebaseApp
      .firestore()
      .collection("collectors")
      .where("email", "==", loggedUserEmail)
      .onSnapshot(
        (querySnapshot) => {
          console.log(querySnapshot.empty);
          if (querySnapshot.empty === "true") {
            thisState.logout;
          }
          querySnapshot.forEach(function(doc) {
            thisState.userdata = doc.data();
            thisState.userid = doc.id.toString();
            if (doc.data().ongoing.length > 0) {
              let ongoingids = doc.data().ongoing;
              console.log(ongoingids);
              //If there is an ongoing job, fetch it
              let ongoingJobsArr = [];
              firebaseApp
                .firestore()
                .collection("jobs")
                .where(
                  firebase.firestore.FieldPath.documentId(),
                  "in",
                  ongoingids
                )
                .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach(function(doc) {
                    ongoingJobsArr.push({
                      ref: doc.id,
                      ...doc.data(),
                      open: false,
                      weight: 0,
                      completed: false,
                    });
                  });
                  console.log(ongoingJobsArr);
                  thisState.ongoingjobs = ongoingJobsArr;
                });
            }
            thisState.getJobsList();
          });
        },
        (error) => {
          console.log(error);
        }
      );
  },
  methods: {
    logout: function() {
      firebaseApp
        .auth()
        .signOut()
        .then(() => {
          this.isLoggedIn = false;
          this.$router.push("/");
        });
    },
    getJobsList: function() {
      let thisState = this;
      firebaseApp
        .firestore()
        .collection("jobs")
        .where("status", "==", "pending")
        .onSnapshot(
          (callback) => {
            console.log(callback);
            thisState.jobslist = [];
            callback.forEach(function(doc) {
              //Append document ID into job object
              let tempData = doc.data();
              tempData = Object.assign(tempData, { ref: doc.id.toString() });
              thisState.jobslist.push(tempData);
            });
          },
          (error) => {
            console.log(error);
          }
        );
    },
    reserveJob: function(jobId) {
      console.log(jobId);
      let thisState = this;
      let loggedUserEmail = firebaseApp.auth().currentUser.email;
      let currentuserid = thisState.userid;
      firebaseApp
        .firestore()
        .collection("jobs")
        .doc(jobId)
        .update({
          status: "active",
        })
        .then((callback) => {
          //Push the job into collector
          firebaseApp
            .firestore()
            .collection("collectors")
            .doc(currentuserid)
            .update({
              ongoing: firebase.firestore.FieldValue.arrayUnion(jobId),
            })
            .then((callback) => {
              this.notify = true;
              this.notifyStatus = "success";
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          this.notify = true;
          this.notifyStatus = "error";
          console.log(error);
        });
      window.scrollTo(0, 0);
    },
    cancelJob: function() {
      let thisState = this;
      let currentuserid = thisState.userid;
      let ongoingid = thisState.ongoingjob.ref;
    },
    completeJob: function(job) {
      console.log(job);
      let thisState = this;
      let currentuserid = thisState.userid;
      let jobId = job.ref;
      if (job.weight == "" || job.weight == 0) {
        this.error = "Please add the item weight in Kilograms";
        return;
      }

      axios({
        method: "post",
        url: "https://us-central1-ewaste-project.cloudfunctions.net/getPrice",
        data: {
          weight: job.weight,
          category: job.itemCategory,
          subcategory: job.subCategory,
        },
      }).then((response) => {
        if (response.data.points && response.data.points != 0) {
          thisState.itemPoints = response.data.points;
          firebaseApp
            .firestore()
            .collection("jobs")
            .doc(jobId)
            .update({
              status: "completed",
              points: thisState.itemPoints,
              weight: job.weight,
            })
            .then((callback) => {
              //Remove the job from collector
              firebaseApp
                .firestore()
                .collection("collectors")
                .doc(currentuserid)
                .update({
                  ongoing: firebase.firestore.FieldValue.arrayRemove(jobId),
                  completed: firebase.firestore.FieldValue.arrayUnion(jobId),
                })
                .then((callback) => {
                  //Update user
                  firebaseApp
                    .firestore()
                    .collection("users")
                    .doc(job.customerId)
                    .update({
                      points: firebase.firestore.FieldValue.arrayUnion({
                        date: new Date()
                          .toJSON()
                          .slice(0, 10)
                          .replace(/-/g, "/"),
                        time: new Date().toLocaleTimeString(),
                        points: thisState.itemPoints,
                        reason: "E-Waste",
                      }),
                    })
                    .then((callback) => {
                      this.notify = true;
                      this.notifyStatus = "success";
                      job.open = false;
                      job.completed = true;
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              this.notify = true;
              this.notifyStatus = "error";
              console.log(error);
            });
          window.scrollTo(0, 0);
        }
      });
    },
  },
};
</script>

<style scoped>
@import url("../assets/css/style.css");

/* .dashbody {
  height: 100vh !important;
} */

/* Pulse Grow */
@-webkit-keyframes hvr-pulse-grow {
  to {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
@keyframes hvr-pulse-grow {
  to {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
.hvr-pulse-grow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-pulse-grow:hover,
.hvr-pulse-grow:focus,
.hvr-pulse-grow:active {
  -webkit-animation-name: hvr-pulse-grow;
  animation-name: hvr-pulse-grow;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}
.field-control {
  text-align: left;
}
</style>
