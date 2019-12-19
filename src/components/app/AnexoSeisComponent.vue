<template>
  <v-container fluid class="pa-0">
    
    <!-- Descripción general -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Descripción General
            </v-toolbar-title>
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
    <!-- Tabla componentes del proyecto -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Descripción de los componentes del proyecto
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" md="3" class="column">
                <div class="my-2">
                  <v-btn text color="green brighten-5" @click="agregarComponente">+ Agregar componente</v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  hide-default-footer
                  class="tablaAlternativas"
                >
                  <template v-slot:item.componente="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.componente"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.componente }}
                      <template v-slot:input>
                        <v-text-field
                          label="Componente"
                          placeholder="Placeholder"
                          v-model="props.item.componente"
                        ></v-text-field>
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
                  <template v-slot:item.costoUnitario="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.costoUnitario"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.costoUnitario | currency }}
                      <template v-slot:input>
                        <v-text-field
                          label="Costo Unitario"
                          placeholder="Placeholder"
                          reverse
                          v-model="props.item.costoUnitario"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.cantidad="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.cantidad"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.cantidad }}
                      <template v-slot:input>
                        <v-text-field
                          label="Costo Unitario"
                          placeholder="Placeholder"
                          v-model="props.item.cantidad"
                          type="number"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.unidadMedida="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.unidadMedida"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.unidadMedida }}
                      <template v-slot:input>
                        <v-text-field
                          label="Unidad de medida"
                          placeholder="Placeholder"
                          v-model="props.item.unidadMedida"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.montoTotal="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.montoTotal"
                      @save="save"
                      save-text="Aceptar"
                      @cancel="cancel"
                      cancel-text="Cancelar"
                      @open="open"
                      @close="close"
                      large
                      persistent
                    >
                      {{ props.item.montoTotal | currency }}
                      <template v-slot:input>
                        <v-text-field
                          label="Monto total (con IVA)"
                          placeholder="Monto Total"
                          v-model="props.item.montoTotal"
                          reverse
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.accion="{ item }">
                    <v-icon
                      @click="deleteItem(item)"
                      color="red darken-1"
                    >
                      mdi-delete-forever
                    </v-icon>
                  </template>
                  <template v-slot:body.append="{footers}">
                     <tr class="totalFooter">
                      <td :colspan="5" class="text-right font-weight-black">
                        Total
                      </td>
                      <td :colspan="5" class="text-right font-weight-black">
                        $ 0.00
                      </td>
                    </tr>
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
    <!-- Aspectos relevantes y mapa -->
    <v-row>
      <v-col cols="6">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card outlined>
              <v-toolbar dense flat color="grey lighten-2">
                <v-toolbar-title>
                  Aspectos ambientales más relevantes
                </v-toolbar-title>
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
          <v-col cols="12">
            <v-card outlined>
              <v-toolbar dense flat color="grey lighten-2">
                <v-toolbar-title>
                  Aspectos técnicos más relevantes
                </v-toolbar-title>
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
          <v-col cols="12">
            <v-card outlined>
              <v-toolbar dense flat color="grey lighten-2">
                <v-toolbar-title>
                  Aspectos legales más relevantes
                </v-toolbar-title>
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
      </v-col>
      <v-col cols="6">
          <v-card outlined>
              <v-toolbar dense flat color="grey lighten-2">
                <v-toolbar-title>
                  Plano de localización del proyecto
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
               
              </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <!-- Análisis proyecto -->
     <v-row >
      <v-col cols="6">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Análisis de la oferta con proyecto
            </v-toolbar-title>
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
            <v-toolbar-title>
              Análisis de la demanda con proyecto
            </v-toolbar-title>
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
    <!-- Diagnóstico -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title>
              Diagnostico de la sitación con proyecto
            </v-toolbar-title>
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
      headers: [
        {
          text: "Componente",
          align: "center",
          sortable: false,
          value: "componente",
          width: "10%"
        },
        {
          text: "Descripción",
          align: "center",
          sortable: false,
          value: "descripcion",
          width: "35%"
        },
        {
          text: "Costo Unitario",
          align: "right",
          sortable: false,
          value: "costoUnitario",
          width: "15%"
        },
        {
          text: "Cantidad",
          align: "center",
          sortable: false,
          value: "cantidad",
          width: "10%"
        },
        {
          text: "Unidad de medida",
          align: "center",
          sortable: false,
          value: "unidadMedida",
          width: "10%"
        },
        {
          text: "Monto Total (Incluye IVA)",
          align: "right",
          sortable: false,
          value: "montoTotal",
          width: "15%"
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "accion",
          width: "5%"
        },
      ],
      desserts: []
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
    agregarComponente(){
      this.desserts.push(
         {
          componente: "Nuevo",
          descripcion: "Nuevo",
          costoUnitario: 0.00,
          cantidad: 0.00,
          unidadMedida: "nuevo",
          montoTotal: 0.00
        }
      )
    },
    deleteItem (item) {
        const index = this.desserts.indexOf(item)
        this.desserts.splice(index, 1)
      },
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
.totalFooter > td:hover{
  background-color: transparent !important;
}
.totalFooter{
  background-color: #e0e0e0 !important;
}
</style>
