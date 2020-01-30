<template>
  <v-container fluid class="pa-0">
    <v-card color="grey lighten-3">
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-toolbar flat color="grey lighten-3">
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="municipioSeleccionado"
              :items="municipios"
              item-text="descripcion"
              item-value="id"
              label="Ayuntamiento"
              dense
              outlined
              class="mt-5"
              return-object
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-select
              :items="ejercicios"
              v-model="ejercicioSeleccionado"
              dense
              label="Ejercicio"
              outlined
              class="mt-5"
              item-text="ejercicio"
              item-value="ejercicio"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6" class="text-center">
          </v-col>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-tabs
      v-model="tab"
      background-color="green lighten-5"
      color="black lighten-1"
      grow
     
      optional
    >
      <v-tab
        v-for="item in items"
        :key="item.titulo"
        @click="emiteEvento(item.name)"
      >
        {{ item.titulo }}
      </v-tab>
    </v-tabs>
    <v-card flat color="basil">
        <v-card-text>
          <oficios-form-component></oficios-form-component>
        </v-card-text>
    </v-card>
  </v-card>
  </v-container>
</template>
<script>
import {EventBus} from '../../utils/event-bus'
import OficiosFormComponent from './OficiosFormComponent'
export default {
  components:{
    OficiosFormComponent
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.initialize();
    this.showTab = false;
  },
  data: () => ({
    user: null,
    ejercicios: [],
    ejercicioSeleccionado: null,
    municipios: [],
    municipioSeleccionado: "",
    tab: null,
    showTab: false,
   
    items: [
        {
            titulo: 'Techos Financieros',
            link: `/control_oficios/techos/`,
            name: 'oficio_techos'
        },
        {
            titulo: 'Cartera de proyectos',
            link: '/control_oficios/cartera',
            name:'oficio_cartera'
        }
    ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
  watch: {
      municipioSeleccionado: function(val){
          if(val.id_municipio !== 0){
              this.showTab = true;
          }else{
              this.showTab = false
          }
        //  this.$router.replace({name: 'Oficios'})
      }
  },
  methods: {
    initialize() {
      this.$http
        .get("/catalogos/get_ejercicios")
        .then(response => {
          response.data.rows.forEach(element => {
            this.ejercicios.push(element);
          });
          this.ejercicioSeleccionado = this.ejercicios[this.ejercicios.length - 1].ejercicio
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
    aceptarProyecto(item){
      this.$http
        .post("/cartera_proyectos/aceptar_proyecto", {
          id: item.id,
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.getCartera()
          } else {
            this.$fire({
              type: "error",
              title: "Error",
              text: response.err,
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
          }
        })
        .catch(error => {
          this.$fire({
              type: "error",
              title: "Error",
              text: error,
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
        });
    },
    guardarRechazo() {
      this.$http
        .post("/cartera_proyectos/rechazar_proyecto", {
          id: this.editedItem.id,
          observaciones: this.editedItem.observaciones
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.dialog = false
            this.editedItem = { ejercicio: "",
              estatus: "",
              id: "",
              id_municipio: "",
              id_rubro: "",
              monto: "",
              nombre_proyecto: "",
              observaciones: ""}
              this.editedIndex = -1
            this.getCartera()
          } else {
            this.$fire({
              type: "error",
              title: "Error",
              text: response.err,
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
          }
        })
        .catch(error => {
          this.$fire({
              type: "error",
              title: "Error",
              text: error,
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
        });
    },
    emiteEvento(tipo){
      EventBus.$emit(tipo, {'ejercicio': this.ejercicioSeleccionado, 'municipio': this.municipioSeleccionado}) 
    }
  }
};
</script>
<style>
.tablaProyectos{
  margin-top: 15px;
}
.tablaProyectos table>thead>tr>th{
   background-color: #e8f5e9 !important;
}
</style>