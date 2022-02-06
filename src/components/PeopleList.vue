<template>
  <div class="hello" data-app>
    <h1>{{ msg }}</h1>
    <div class="top-panel">
      <div>
        <div>Search person by name: </div>
<!--        <input type="text" class="clsCommon" v-model="searchText" ref="searchText" maxlength="50"/>-->
        <v-text-field
            label="Enter person name"
            solo
            v-model="searchText" ref="searchText" maxlength="50"
        ></v-text-field>
      </div>
      <div>
        <div class="select-div">
          <div>Search person by film/specie: </div>
          <div class="select-filter">
            <v-select
                :items="filmsArray"
                v-model="film"
                :menu-props="{ maxWidth: '300' }"
                label="Search by movie name"
                item-text="name"
                class="select"
                :rules="[(v) => !!v || 'Film is required']"
                required
                solo
                req
            ></v-select>
            <v-select
                :items="speciesArray"
                v-model="species"
                :menu-props="{ maxWidth: '200' }"
                label="Search by species name"
                item-text="name"
                class="select"
                solo
                req
            ></v-select>

          </div>
        </div>
        <v-btn @click="filmsFilterArray()" :disabled="disabled">Search</v-btn>
        <v-btn @click="reset">clear</v-btn>
      </div>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
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
            Birth year
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(person, idx) in filter" :key="idx"
            @click="goToPersonData(person.url)"
        >
          <td>{{ person.name }}</td>
          <td>{{ person.height }}cm</td>
          <td>{{ person.hair_color }}</td>
          <td>{{ person.eye_color }}</td>
          <td>{{ person.birth_year }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      msg: "Star wars persons",
      responseData: [],
      dataArray: [],
      filmsData: "",
      data: '',
      searchText: '',
      filmsArray: [
        { name: "A New Hope", value: "https://swapi.dev/api/films/1/"},
        { name: "The Empire Strikes Back", value: "https://swapi.dev/api/films/2/"},
        { name: "Return of the Jedi", value: "https://swapi.dev/api/films/3/"},
        { name: "The Phantom Menace", value: "https://swapi.dev/api/films/4/"},
        { name: "Attack of the Clones", value: "https://swapi.dev/api/films/5/"},
        { name: "Revenge of the Sith", value: "https://swapi.dev/api/films/6/"}
      ],
      speciesArray: [
        {name: "Human", value: "https://swapi.dev/api/species/1/"},
        {name: "Droid", value: "https://swapi.dev/api/species/2/"},
        {name: "Wookie", value: "https://swapi.dev/api/species/3/"},
        {name: "Rodian", value: "https://swapi.dev/api/species/4/"},
        {name: "Hutt", value: "https://swapi.dev/api/species/5/"},
        {name: "Yoda's species", value: "https://swapi.dev/api/species/6/"},
        {name: "Trandoshan", value: "https://swapi.dev/api/species/7/"},
        {name: "Mon Calamari", value: "https://swapi.dev/api/species/8/"},
        {name: "Ewok", value: "https://swapi.dev/api/species/9/"},
        {name: "Sullustan", value: "https://swapi.dev/api/species/10/"},
      ],
      film: "",
      species: null,
      filterFilmArray: [],
      filterSpeciesArray: [],
    }
  },
   async created() {
    for (let i = 0; i < 83; i++) {
       await axios.get('https://swapi.dev/api/people/' + i)
          .then(resp => {
            this.responseData.push(resp.data)
            this.dataArray = this.responseData;
          })
          .catch(e => console.log("Error", e));
    }
    console.log("Created")
  },
  computed: {
    filter() {
      return this.dataArray.filter(person => {
        return person.name.toLowerCase().includes(this.searchText.toLowerCase())})
    },
    disabled() {
      return this.film.length < 1;
    },
  },
  methods: {
    goToPersonData(str) {
      const param = (new URL(str)).pathname.split('/')[3];
      this.$router.push({name: 'PersonInfo', params: { id: param}});
    },
    filmsFilterArray() {
      this.filterFilmArray = [];
      this.filterSpeciesArray = [];

      for (let key in this.responseData) {
        for (let i in this.responseData[key].films) {
          if (this.responseData[key].films[i] === this.film) {
            this.filterFilmArray.push(this.responseData[key])
          }
        }
      }

      for (let specie in this.filterFilmArray) {
        for (let i in this.filterFilmArray[specie].species) {
          if (this.filterFilmArray[specie].species[i] === this.species) {
            this.filterSpeciesArray.push(this.filterFilmArray[specie])
          }
        }
      }

      this.dataArray = this.filterSpeciesArray
      if(this.dataArray.length <= 0) {
        this.dataArray = this.filterFilmArray
      }
      return this.dataArray;
    },
    reset(){
      this.species = null;
    }
  },
}
</script>

<style>
.top-panel {
  background-color: cornsilk;
  display: flex;
  justify-content: center;
}

.select-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.select-filter {
  display: flex;
}

.select {
width: 220px;
}

.clsCommon {
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
}
</style>
