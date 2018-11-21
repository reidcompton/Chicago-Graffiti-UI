<template>
  <div>
    <div class="columns is-centered is-multiline" v-if="feedback != null && showMap == null">
      <div class="column is-full">
        <div class="notification is-danger">
          <button class="delete" v-on:click="blankFeedback()"></button>
          {{feedback}}
        </div>
      </div>
    </div>
    <div class="columns is-centered is-multiline" v-if="graffiti.length == 0 && showMap == null">
      <div class="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile is-centered columns">
        <h2>
          Graffiti Records
        </h2>
      </div>
      <div class="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile columns">
        <p class="has-text-left">Enter your Alderman's Name</p>
      </div>
      <div class="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile is-centered columns">
        <input class="column is-full" v-model="query.aldermanName" placeholder="e.g. Ramirez">
      </div>
      <div class="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile columns">
        <p class="has-text-left">Choose a month to search</p>
      </div>
      <div class="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile is-centered columns">
        <input class="column is-full" v-model="query.startDate" type="month">
      </div>
      <div class="column is-half-desktop is-three-quarters-tablet is-full-mobile is-centered columns">
        <input class="column is-full" v-on:click="getGraffiti()" type="button" value="Search">
      </div>
      <div class="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile is-centered columns">
        <img v-show="isLoading" src="../assets/loader.svg" style="height:100px;" alt="loading icon by loading.io">
      </div>
    </div>
    <div class="columns is-centered is-multiline" v-if="graffiti.length > 0  && showMap == null" v-for="g in graffiti" v-bind:key="g.ward">
      <div class="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile is-centered columns">
        <h2>
          Results
        </h2>
      </div>
      <div class="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile is-centered columns">
        <p>
          <strong>Alderman: </strong> {{g.alderman}}, Ward {{g.ward}}
        </p>
      </div>
      <div class="column is-three-quarters-desktop is-three-quarters-tablet is-full-mobile is-centered columns">
        <p>
          <strong>Date:</strong> {{g.date}} &mdash; {{g.end_date}}
        </p>
      </div>
      <div class="column is-half-desktop is-three-quarters-tablet is-full-mobile is-centered columns">
        <p>
          <strong>Graffiti Requests:</strong> {{g.graffiti_instances.length}}
        </p>
      </div>
      <div class="column is-full is-centered columns">
        <p><a href="javascript:void(0)" v-on:click="showAllOnMap(g.ward)">View all</a></p>
      </div>
      <div class="column is-full is-centered columns">
        <p><a href="javascript:void(0)" v-on:click="reset()">Back</a></p>
      </div>
      <div class="column is-full is-centered columns">
        <hr>
      </div>
    </div>
    <div class="columns is-centered is-multiline" v-if="showMap != null">
      <div id="closeMap">
        <img v-on:click="closeMap()" src="../assets/close-button.png">
      </div>
      <div id="map" class="column is-full-screen">
        <google-map
            :center="{lat:parseFloat(showMap.lat), lng:parseFloat(showMap.long)}"
            :zoom="14"
            map-type-id="terrain"
            style="width: 100%; height: 100%"
          >
            <google-marker
              :key="index"
              v-for="(m, index) in showMap.graffiti"
              :position="{lat:parseFloat(m.latitude), lng: parseFloat(m.longitude)}"
              :clickable="true"
              :draggable="true"
              @click="center={lat:parseFloat(m.latitude), lng: parseFloat(m.longitude)}"
            />
          </google-map>
        <!-- <iframe style="width:100%; height:100%; border:0" frameborder="0" v-bind:src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyBXUgBqKjqv-75O6SfPwZVe2hwhxorg0RM&q=' + showMap.address + 'Chicago+IL'" allowfullscreen></iframe> -->
      </div>
    </div>
  </div>
</template>

<script>
import datalayer from '../datalayer'
export default {
  name: 'Graffiti',
  data () {
    return {
      feedback: null,
      query: {
        aldermanName: '',
        startDate: ''
      },
      graffiti: [],
      showMap: null,
      isLoading: false
    }
  },
  methods: {
    getGraffiti () {
      this.isLoading = true
      this.feedback = null
      datalayer.get(this.query.aldermanName, this.query.startDate)
        .then((response) => response.json())
        .then((responseJSON) => {
          this.isLoading = false
          this.graffiti = responseJSON
          if (this.graffiti.length === 0) {
            this.feedback = 'Alderman not found. Please try again.'
          }
        })
    },
    showAllOnMap (ward) {
      this.showMap = {
        ward: ward,
        lat: this.graffiti.find(x => x.ward === ward).lat,
        long: this.graffiti.find(x => x.ward === ward).long,
        graffiti: this.graffiti.find(x => x.ward === ward).graffiti_instances
      }
    },
    reset () {
      this.graffiti = []
      this.aldermanName = ''
      this.startDate = ''
    },
    blankFeedback () {
      this.feedback = null
    },
    closeMap () {
      this.showMap = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.is-full-screen {
  height:100vh;
  width:100vw;
}
#map {
  margin-top: -60px;
}
h2 {
  font-weight: bold;
  font-size:2em;
}
#closeMap {
  position:fixed;
  top:10px;
  left:10px;
  z-index:101;
  cursor:pointer;
}
#closeMap img {
  height:50px;
}
</style>
