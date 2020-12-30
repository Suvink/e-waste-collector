<template>
  <div class="container has-text-centered dashbody pb-2">
      <div class="container">
          <section class="hero is-primary">
          <div class="hero-body">
              <div class="container">
                <h1 class="title">
                    Request History
                </h1>
                <h2 class="subtitle">
                    Welcome {{userdata.fname}}
                </h2>
              </div>
          </div>
      </section>

        <h1 class="title is-4 mt-1">My Completed Requests</h1>
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
                <tr
                    v-for="(job, index) in userjobs"
                    v-bind:key= "index"
                >
                    <td>{{ job.ref.toString().substr(0,7) }}</td>
                    <td>{{ job.itemCategory }}</td>
                    <td>{{ job.subCategory }}</td>
                    <td>{{ job.pickupAddress }}</td>
                    <td>{{ job.customerProvince }}</td>
                    <td>{{ job.time }}</td>
                    <td>{{ job.date }}</td>
                    <td>
                      <span class="tag is-danger is-small" v-if="job.status=='cancelled'">Cancelled</span>
                      <span class="tag is-success is-small" v-if="job.status=='completed'">Completed</span>
                    </td>
                </tr>
                <tr v-if="this.userjobs.length=='0'">
                <td colspan="7" style="text-align: center">You have no previous requests</td>
                </tr>
            </tbody>
            </table>
        </div>

      </div>
  </div>
</template>

<script>
import { firebaseApp,firebase } from '../firebase'
export default {
    name: 'History',
    data(){
        return{
            loggedUserEmail: '',
            docid: '',
            userdata: {},
            userjobs: [],
        }
    },
    created(){
      let loggedUserEmail = firebaseApp.auth().currentUser.email
      let thisState = this

      firebaseApp.firestore().collection("collectors").where("email","==", loggedUserEmail)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(function(doc){
          thisState.userdata = doc.data()
        
        //Fetch jobs
        firebaseApp.firestore().collection("jobs").where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          thisState.userdata.completed
        )
        .onSnapshot(callback =>{
            thisState.userjobs = []
            callback.forEach(function(docs){
            //console.log(docs.id)
            if(docs.data().status == 'completed' ||docs.data().status == 'cancelled' ){
              //Append document ID into job object
              let tempData = docs.data()
              tempData = Object.assign(tempData,{ref: docs.id.toString()})
              thisState.userjobs.push(tempData)
            }
            
          })
        },
        error =>{
          console.log(error)
        }
        )

        })
      },
      error => {
        console.log(error)
      }
      )

    }
}
</script>

<style>
@import url('../assets/css/style.css');
</style>



