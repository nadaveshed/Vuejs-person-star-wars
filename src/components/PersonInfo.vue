<template>
  <div>
    <h1>{{ personData.name }}</h1>

    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Height
          </th>
          <th class="text-left">
            Hair color
          </th>
          <th class="text-left">
            Eye color
          </th>
          <th class="text-left">
            Skin color
          </th>
          <th class="text-left">
            Birth year
          </th>
          <th class="text-left">
            Gender
          </th>
          <th class="text-left">
            Films
          </th>
        </tr>
        </thead>
        <tbody @blur="filmsOrganizer">
        <td>{{personData.height}}cm</td>
        <td>{{personData.hair_color}}</td>
        <td>{{personData.eye_color}}</td>
        <td>{{personData.skin_color}}</td>
        <td>{{personData.birth_year}}</td>
        <td>{{personData.gender}}</td>
        <td class="film-table">
          <table>
          <tr class="films-data">
            <th>Title</th>
            <th>Release Date</th>
            <th>Opening Crawl</th>
          </tr>
          <tr v-for="item in test" :key="item.id" class="films-data">
            <td>{{ item.title }}</td>
            <td>{{ item.releaseDate }}</td>
            <td>{{ item.opening_crawl }}</td>
          </tr>
          </table>
        </td>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      personData: [],
      filmsArray: [],
      filmData: {},
      title: "",
      releaseDate: "",
      openingCrawl: "",
      test: []
    }
  },
  async created() {
    // console.log("id", this.$route.params.id)
    await axios.get('https://swapi.dev/api/people/' + this.$route.params.id)
        .then(resp => {
          this.personData = resp.data
          this.filmsArray = this.personData.films
          // console.log("data", this.filmsArray)

        })
        .catch(e => console.log("Error", e));
  },
  computed: {
    filmsOrganizer() {
      let arr = [];
      for (let i = 0; i < this.filmsArray.length; i++) {
        console.log("index", this.getData(this.filmsArray[i]))
      }
      return arr;
    }
  },
  methods: {
    async getData(url){
      await axios.get(url)
          .then(resp => {
            this.title = resp.data.title
            this.releaseDate = resp.data.release_date
            this.openingCrawl = resp.data.opening_crawl
            this.filmData = {title: this.title, releaseDate: this.releaseDate,
              opening_crawl: resp.data.opening_crawl.split(' ').length}
            this.test.push(this.filmData)
            console.log("filmsData", this.test)
          })
          .catch(e => console.log("Error", e));
    }
  }
}
</script>

<style scoped>
table, tr, th, td {
  border: 1px solid black;
}

.film-table {
  display: flex;
  justify-content: space-evenly;
}

</style>