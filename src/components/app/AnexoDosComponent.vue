<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>Alineación estratégica</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="alineacion_estrategica"
              hide-default-footer
              class="tablaAlternativas"
            >
              <template v-slot:item.programa="props">
                <v-edit-dialog
                  :return-value.sync="props.item.programa"
                  @save="save"
                  save-text="Aceptar"
                  @cancel="cancel"
                  cancel-text="Cancelar"
                  @open="open"
                  @close="close"
                  large
                  persistent
                >
                  {{ props.item.programa }}
                  <template v-slot:input>
                    <v-textarea
                      v-model="props.item.programa"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="15"
                      maxlength="280"
                      counter="280"
                      class="mt-5"
                    ></v-textarea>
                  </template>
                </v-edit-dialog>
              </template>
              <template v-slot:item.objetivoEstrategia="props">
                <v-edit-dialog
                  :return-value.sync="props.item.objetivoEstrategia"
                  @save="save"
                  save-text="Aceptar"
                  @cancel="cancel"
                  cancel-text="Cancelar"
                  @open="open"
                  @close="close"
                  large
                  persistent
                >
                  {{ props.item.objetivoEstrategia }}
                  <template v-slot:input>
                    <v-textarea
                      v-model="props.item.objetivoEstrategia"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="15"
                      maxlength="280"
                      counter="280"
                      class="mt-5"
                    ></v-textarea>
                  </template>
                </v-edit-dialog>
              </template>
              <template v-slot:item.lineaAccion="props">
                <v-edit-dialog
                  :return-value.sync="props.item.lineaAccion"
                  @save="save"
                  save-text="Aceptar"
                  @cancel="cancel"
                  cancel-text="Cancelar"
                  @open="open"
                  @close="close"
                  large
                  persistent
                >
                  {{ props.item.lineaAccion }}
                  <template v-slot:input>
                    <v-textarea
                      v-model="props.item.lineaAccion"
                      auto-grow
                      outlined
                      rows="3"
                      row-height="15"
                      maxlength="280"
                      counter="280"
                      class="mt-5"
                    ></v-textarea>
                  </template>
                </v-edit-dialog>
              </template>
            </v-data-table>

            <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
              {{ snackText }}
              <v-btn text @click="snack = false">Close</v-btn>
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title
              >Programas o proyectos complementarios o
              relacionados</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="5">
                <v-textarea
                  label="Proyecto:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                  v-model="proyecto_complementario"
                ></v-textarea>
              </v-col>
              <v-col cols="7">
                <v-textarea
                  label="Relación:"
                  auto-grow
                  outlined
                  rows="5"
                  row-height="15"
                  maxlength="280"
                  counter="280"
                  v-model="relacion_complementaria"
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
import { EventBus } from "../../utils/event-bus";

export default {
  props:['ficha_tecnica'],
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.ficha_tecnica.id_anexo_dos !== null) {
      this.id_anexo_dos = this.ficha_tecnica.id_anexo_dos;
      this.buscarAnexoDos();
    }

    EventBus.$on("guardarFicha", data => {
      this.guardarAnexoDos(data);
      // console.log("Guardar Anexo 1", data.id_ficha_tecnica)
    });
  },
  data() {
    return {
      id_anexo_dos: null,
      snack: false,
      snackColor: "",
      snackText: "",
      max280chars: v => v.length <= 280 || "Input too long!",
      pagination: {},
      headers: [
        {
          text: "Programa(s) Relacionado(s)",
          align: "center",
          sortable: false,
          value: "programa",
          width: "33.3%"
        },
        {
          text: "Objetivo(s)/Estrategia(s)",
          align: "center",
          sortable: false,
          value: "objetivoEstrategia",
          width: "33.3%"
        },
        {
          text: "Líneas de Acción",
          align: "center",
          sortable: false,
          value: "lineaAccion",
          width: "33.3%"
        }
      ],
      alineacion_estrategica: [
        {
          programa: "Programa Federal",
          objetivoEstrategia: "Objetivo Federal",
          lineaAccion: "Accion Federal"
        },
        {
          programa: "Programa Estatal",
          objetivoEstrategia: "Objetivo Estatal",
          lineaAccion: "Accion Estatal"
        },
        {
          programa: "Programa Municipal",
          objetivoEstrategia: "Objetivo Municipal",
          lineaAccion: "Accion Municipal"
        }
      ],
      proyecto_complementario: null,
      relacion_complementaria: null,
    };
  },
  methods: {
    buscarAnexoDos(){
      this.$http
        .post("/ficha_tecnica/buscar_anexo_dos", {
          id_anexo_dos: this.id_anexo_dos
        })
        .then(response => {
          if (response.status == 200) {
            var data = response.data[0]
            console.log(data)
            this.alineacion_estrategica = JSON.parse(data.alineacion_estrategica)
            this.proyecto_complementario = data.proyecto_complementario
            this.relacion_complementaria = data.relacion_complementaria
          } else {
            console.log("Error", response.err);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    guardarAnexoDos(data) {
      if (this.verificarDatos()) {
        this.$http
          .post("/ficha_tecnica/guardar_anexo_dos", { 
            id_ficha_tecnica:  this.ficha_tecnica.id_ficha_tecnica,
            id_anexo_dos: this.ficha_tecnica.id_anexo_dos,
            alineacion_estrategica: JSON.stringify(this.alineacion_estrategica),
            proyecto_complementario: this.proyecto_complementario,
            relacion_complementaria: this.relacion_complementaria,
          })
          .then(response => {
            if (response.status == 200) {
              // console.log(response);
              EventBus.$emit("actualizaPropAnexoDos",response.data.id_anexo_dos)
               this.$fire({
                  type: "success",
                  title: "Sección guardada correctamente",
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
      }
    },
    verificarDatos() {
      return true;
    }
  },
  beforeDestroy() {
    EventBus.$off("guardarFicha");
  }
};
</script>
<style lang="css">
.tablaAlternativas table > thead > tr > th {
  background-color: #e0e0e0 !important;
}
.tablaAlternativas table > tbody > tr:hover {
  background-color: transparent !important;
}
.tablaAlternativas table > tbody > tr > td:hover {
  background-color: #f5f5f5 !important;
  /* font-size: 12pt !important; */
  font-weight: bold;
  text-align: right;
  width: 12.5%;
}
</style>
