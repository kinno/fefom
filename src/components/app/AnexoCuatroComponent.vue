<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Posibles medidas de optimización</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="6" class="column">
                <v-textarea
                  label="Medida:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                ></v-textarea>
              </v-col>
              <v-col cols="6" class="column">
                <v-textarea
                  label="Descripción:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title class="subtitle-2 text-center">Análisis de la oferta sin proyecto* (considerando medidas de optimización)</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="column">
                <v-textarea
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title class="subtitle-2 text-center">Análisis de la demanda sin proyecto* (considerando medidas de optimización)</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="column">
                <v-textarea
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {EventBus} from '../../utils/event-bus'

export default {
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.initialize();
    this.showTab = false;
  },
  data: () => ({
    user: null,
    ejercicios: [],
    ejercicioSeleccionado: "2020",
    municipios: [],
    municipioSeleccionado: "",
    tab: null,
    showTab: false,
  }),
  watch: {
     
  },
  methods: {
    initialize() {
      this.$http
        .get("/catalogos/get_ejercicios")
        .then(response => {
          response.data.rows.forEach(element => {
            this.ejercicios.push(element);
          });
        })
        .catch(err => {});

      this.$http
        .get("/catalogos/get_municipios")
        .then(response => {
          response.data.rows.forEach(element => {
            this.municipios.push(element);
          });
        })
        .catch(err => {});
    },
    emiteEvento(tipo){
      EventBus.$emit(tipo, {'ejercicio': this.ejercicioSeleccionado, 'municipio': this.municipioSeleccionado}) 
    }
  }
};
</script>
<style>

</style>