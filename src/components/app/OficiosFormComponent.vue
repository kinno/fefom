<template>
  <div>
    <v-container>
      <v-row v-if="oficio.id_principal_oficio !== null">
        <v-col cols="3">
          Oficio actual:
          <span class="font-weight-black">{{ oficio.clave_oficio }}</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn
          color="green"
          class=" white--text"
          small
          @click="actualizarOficio()"
        >
          <v-icon small left>mdi-content-save-move</v-icon>
          Guardar
        </v-btn>
        <v-btn
          color="green"
          class=" white--text"
          small
          @click="cerrarCartera()"
        >
          <v-icon small left>mdi-checkbox-multiple-marked</v-icon>
          Aceptar
        </v-btn>
        <v-btn
          color="green"
          class=" white--text"
          small
          @click="imprimirOficio()"
        >
          <v-icon small left>mdi-printer</v-icon>
          Imprimir
        </v-btn>
      </v-row>
      <v-row v-else>
        <v-spacer></v-spacer>
        <v-btn color="green" class=" white--text" small @click="crearOficio()">
          <v-icon small left>mdi-file-eye</v-icon>
          Crear Oficio
        </v-btn>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-subheader height="10px">Detalle del oficio:</v-subheader>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="pt-0 pb-0">
          <!-- <v-text-field
           v-model="oficio.fecha_oficio"
            dense
            label="Fecha:"
            outlined
            ></v-text-field> -->
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            max-width="290"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                dense
                label="Fecha:"
                outlined
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="oficio.fecha_oficio"
              @change="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6" class="pt-0 pb-0">
          <v-text-field
            v-model="oficio.clave_oficio"
            dense
            label="Clave del oficio:"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pt-0 pb-0">
          <v-textarea
            :auto-grow="true"
            outlined
            label="Título: "
            v-model="oficio.titulo"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="pt-0 pb-0">
          <v-textarea
            outlined
            rows="10"
            :auto-grow="true"
            label="Texto:"
            v-model="oficio.texto"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pt-0 pb-0">
          <v-textarea
            :auto-grow="true"
            outlined
            label="Copias:"
            v-model="oficio.copias"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6" class="pt-0 pb-0">
          <v-text-field
            dense
            label="T.A.T.:"
            outlined
            v-model="oficio.tat"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pt-0 pb-0">
          <v-text-field
            dense
            label="Iniciales:"
            outlined
            v-model="oficio.iniciales"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { EventBus } from "../../utils/event-bus";
import moment from "moment";
moment.locale("es");
export default {
  mounted() {
    EventBus.$on("oficio_techos", data => {
      this.ejercicio = data.ejercicio;
      this.municipio = data.municipio;
      this.tipo_oficio = 1;
      this.restaurarDatos();
      this.buscarOficio('buscar_oficio_techos');
      this.buscarTecho();
    });
    EventBus.$on("oficio_cartera", data => {
      this.ejercicio = data.ejercicio;
      this.municipio = data.municipio;
      this.tipo_oficio = 2;
      this.restaurarDatos();
      this.buscarOficio('buscar_oficio_cartera');
      this.buscarCartera();
    });
  },
  data() {
    return {
      ejercicio: "",
      municipio: "",
      techo_financiero: [],
      oficio: {
        id_principal_oficio: null,
        id_tipo_oficio: null,
        ejercicio: null,
        id_municipio: null,
        clave_oficio: null,
        estatus: null,
        fecha_oficio: null,
        fecha_creacion: null,
        titulo: null,
        texto: null,
        copias: null,
        iniciales: null,
        tat: null,
        id_techo_financiero: null
      },
      cartera: [],
      menu1: false,
      tipo_oficio: null,
    };
  },
  computed: {
    computedDateFormattedMomentjs() {
      if (this.oficio.fecha_oficio !== null) {
        return moment(this.oficio.fecha_oficio).format("DD MMMM YYYY");
      } else {
        return "";
      }
    }
  },
  methods: {
    buscarOficio(url) {
      this.$http
        .post("/oficios/"+url, {
          ejercicio: this.ejercicio,
          municipio: this.municipio.id_municipio
        })
        .then(response => {
          // console.log(response);
          if (response.status == 201) {
            // no hay registros
            (this.techo_financiero = []),
              (this.oficio = {
                id_principal_oficio: null,
                id_tipo_oficio: null,
                ejercicio: null,
                id_municipio: null,
                clave_oficio: null,
                estatus: null,
                fecha_oficio: null,
                fecha_creacion: null,
                titulo: null,
                texto: null,
                copias: null,
                iniciales: null,
                tat: null,
                id_techo_financiero: null
              });
          } else {
            if (response.status == 200) {
              // console.log(response.data.datos)
              this.oficio = response.data.datos[0];
              this.oficio.fecha_oficio = this.oficio.fecha_oficio.substr(0, 10);
              this.cartera = response.data.datos[1];
            } else {
              this.$fire({
                type: "error",
                title: "Error",
                text: response.err,
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
              });
            }
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
    buscarTecho() {
      this.$http
        .post(
          "/techos_financieros/get_techos_ayuntamiento",
          {
            ejercicio: this.ejercicio,
            id_municipio: this.municipio.id_municipio
          }
        )
        .then(response => {
          this.techo_financiero = response.data.rows[0];
        })
        .catch(error => {
          console.error(error);
        });
    },
    buscarCartera() {
      this.$http
        .post(
          "/cartera_proyectos/get_cartera_simple",
          {
            ejercicio: this.ejercicio,
            id_municipio: this.municipio.id_municipio
          }
        )
        .then(response => {
          // console.log(response.data)
          this.cartera = response.data.rows;
        })
        .catch(error => {
          console.error(error);
        });
    },
    crearOficio() {
      this.$http
        .post("/oficios/crear_oficio", {
          ejercicio: this.ejercicio,
          municipio: this.municipio,
          id_techo: this.techo_financiero.id_techo_financiero,
          cartera : this.cartera,
          tipo_oficio: this.tipo_oficio,
        })
        .then(response => {
          // console.log(response);
          if (response.status == 201) {
            // no hay registros
            // console.log("No hay oficios registrados")
          } else {
            if (response.status == 200) {
              switch (this.tipo_oficio) {
                case 1:
                  this.buscarOficio('buscar_oficio_techos')
                  break;
                case 2:
                  this.buscarOficio('buscar_oficio_cartera')
                  break;
                default:
                  break;
              }
              
            } else {
              this.$fire({
                type: "error",
                title: "Error",
                text: response.err,
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#d33"
              });
            }
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
    actualizarOficio() {
      this.$http
        .post("/oficios/actualizar_oficio", {
          oficio: this.oficio
        })
        .then(response => {
          // console.log(response);
          if (response.status == 200) {
            this.$fire({
              type: "success",
              title: "Oficio actualizado correctamente",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#d33"
            });
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
    imprimirOficio() {
      this.$http
        .get("/oficios/imprimir_oficio", {responseType: 'arraybuffer',params:{
          oficio: this.oficio,
          techo: this.techo_financiero,
          cartera: this.cartera,
        }})
        .then(response => {
          // console.log(response);
          if (response.status == 200) {
             
           var blob = new Blob([response.data], {type: 'application/pdf'});

            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.target = "_blank"
            // link.download = "filename.pdf";
            link.click();
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
    restaurarDatos(){
      (this.techo_financiero = []),
              (this.oficio = {
                id_principal_oficio: null,
                id_tipo_oficio: null,
                ejercicio: null,
                id_municipio: null,
                clave_oficio: null,
                estatus: null,
                fecha_oficio: null,
                fecha_creacion: null,
                titulo: null,
                texto: null,
                copias: null,
                iniciales: null,
                tat: null,
                id_techo_financiero: null
              });
    }
  },
  beforeDestroy() {
    EventBus.$off("oficio_techos");
  }
};
</script>
