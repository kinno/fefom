<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Identificación de costos
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headersCostos"
                  :items="costos"
                  hide-default-footer
                  class="tablaAlternativas"
                >
                  <template v-slot:item.descripcion="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.descripcion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.descripcion }}
                      <template v-slot:input>
                        <v-textarea
                          label="Descripción"
                          v-model="props.item.descripcion"
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
                  <template v-slot:item.cuantificacion="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.cuantificacion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.cuantificacion }}
                      <template v-slot:input>
                        <v-text-field
                          label="Cuantificación"
                          placeholder="Placeholder"
                          v-model="props.item.cuantificacion"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.valoracion="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.valoracion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.valoracion | currency }}
                      <template v-slot:input>
                        <v-text-field
                          label="Valoración"
                          placeholder="Placeholder"
                          reverse
                          v-model="props.item.valoracion"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.periodicidad="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.periodicidad"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.periodicidad }}
                      <template v-slot:input>
                        <v-text-field
                          label="periodicidad"
                          placeholder="Placeholder"
                          v-model="props.item.periodicidad"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                </v-data-table>
                <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                  {{ snackText }}
                  <v-btn text @click="snack = false">Close</v-btn>
                </v-snackbar>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Tabla componentes del proyecto -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Identificación de Beneficios
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" md="3" class="column">
                <div class="my-2">
                  <v-btn text color="green brighten-5" @click="agregarBeneficio"
                    >+ Agregar beneficio</v-btn
                  >
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headersBeneficios"
                  :items="beneficios"
                  hide-default-footer
                  class="tablaAlternativas"
                >
                  <template v-slot:item.beneficio="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.beneficio"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.beneficio }}
                      <template v-slot:input>
                        <v-textarea
                          label="Beneficio"
                          v-model="props.item.beneficio"
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
                  <template v-slot:item.descripcion="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.descripcion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.descripcion }}
                      <template v-slot:input>
                        <v-textarea
                          label="Descripción"
                          v-model="props.item.descripcion"
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
                  <template v-slot:item.cuantificacion="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.cuantificacion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.cuantificacion }}
                      <template v-slot:input>
                        <v-text-field
                          label="Cuantificación"
                          placeholder="Placeholder"
                          v-model="props.item.cuantificacion"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.valoracion="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.valoracion"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.valoracion | currency }}
                      <template v-slot:input>
                        <v-text-field
                          label="Valoración"
                          placeholder="Placeholder"
                          reverse
                          v-model="props.item.valoracion"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.periodicidad="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.periodicidad"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.periodicidad }}
                      <template v-slot:input>
                        <v-text-field
                          label="periodicidad"
                          placeholder="Placeholder"
                          v-model="props.item.periodicidad"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.accion="{ item }">
                    <v-icon @click="deleteItem(item)" color="red darken-1">
                      mdi-delete-forever
                    </v-icon>
                  </template>
                </v-data-table>
                <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                  {{ snackText }}
                  <v-btn text @click="snack = false">Close</v-btn>
                </v-snackbar>
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
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    // this.initialize();
  },
  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      max280chars: v => v.length <= 280 || "Input too long!",
      pagination: {},
      headersCostos: [
        {
          text: "Tipo de Costo",
          align: "center",
          sortable: false,
          value: "tipoCosto",
          width: "20%"
        },
        {
          text: "Descripción",
          align: "center",
          sortable: false,
          value: "descripcion",
          width: "20%"
        },
        {
          text: "Cuantificación",
          align: "center",
          sortable: false,
          value: "cuantificacion",
          width: "20%"
        },
        {
          text: "Valoración",
          align: "right",
          sortable: false,
          value: "valoracion",
          width: "20%"
        },
        {
          text: "Periodicidad",
          align: "center",
          sortable: false,
          value: "periodicidad",
          width: "20%"
        }
      ],
      headersBeneficios: [
        {
          text: "Beneficio",
          align: "center",
          sortable: false,
          value: "beneficio",
          width: "20%"
        },
        {
          text: "Descripción",
          align: "center",
          sortable: false,
          value: "descripcion",
          width: "20%"
        },
        {
          text: "Cuantificación",
          align: "center",
          sortable: false,
          value: "cuantificacion",
          width: "15%"
        },
        {
          text: "Valoración",
          align: "right",
          sortable: false,
          value: "valoracion",
          width: "20%"
        },
        {
          text: "Periodicidad",
          align: "center",
          sortable: false,
          value: "periodicidad",
          width: "20%"
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "accion",
          width: "5%"
        }
      ],
      costos: [
        {
          tipoCosto: "INVERSIÓN",
          descripcion: "editar",
          cuantificacion: "editar",
          valoracion: "0.00",
          periodicidad: "editar"
        },
        {
          tipoCosto: "COSTO DE MANTENIMIENTO",
          descripcion: "editar",
          cuantificacion: "editar",
          valoracion: "0.00",
          periodicidad: "editar"
        },
        {
          tipoCosto: "COSTO DE OPERACIÓN",
          descripcion: "editar",
          cuantificacion: "editar",
          valoracion: "0.00",
          periodicidad: "editar"
        }
      ],
      beneficios: []
    };
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Dato guardado";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Cancelado";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    agregarBeneficio() {
      this.beneficios.push({
          beneficio: "nuevo beneficio",
          descripcion: "nueva descripción",
          cuantificacion: "nueva cuantificacion",
          valoracion: "0.00",
          periodicidad: "nueva periodicidad"
      });
    },
    deleteItem(item) {
      const index = this.beneficios.indexOf(item);
      this.beneficios.splice(index, 1);
    }
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
.totalFooter > td:hover {
  background-color: transparent !important;
}
.totalFooter {
  background-color: #e0e0e0 !important;
}
</style>
