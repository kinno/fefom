<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="desserts" hide-default-footer class="tablaAlternativas">
          <template v-slot:item.descripcion="props" >
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
                label="Descripción de alternativa"
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
          <template v-slot:item.costoMantenimiento="props">
            <v-edit-dialog
              :return-value.sync="props.item.costoMantenimiento"
              @save="save"
              save-text="Aceptar"
              @cancel="cancel"
              cancel-text="Cancelar"
              @open="open"
              @close="close"
              large
              persistent
            >
              {{ props.item.costoMantenimiento | currency}}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.costoMantenimiento"
                  label="Costo de mantenimiento"
                  reverse
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.costoOperacion="props">
            <v-edit-dialog
              :return-value.sync="props.item.costoOperacion"
              @save="save"
              save-text="Aceptar"
              @cancel="cancel"
              cancel-text="Cancelar"
              @open="open"
              @close="close"
              large
              persistent
            >
              {{ props.item.costoOperacion | currency}}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.costoOperacion"
                  label="Costo de mantenimiento"
                  reverse
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.costoTotal="props">
            <v-edit-dialog
              :return-value.sync="props.item.costoTotal"
              @save="save"
              save-text="Aceptar"
              @cancel="cancel"
              cancel-text="Cancelar"
              @open="open"
              @close="close"
              large
              persistent
            >
              {{ props.item.costoTotal | currency}}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.costoTotal"
                  label="Costo de mantenimiento"
                  reverse
                  counter
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
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar dense flat color="grey lighten-2">
            <v-toolbar-title
              >Justificación de la alternativa de solución
              seleccionada</v-toolbar-title
            >
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
  data () {
      return {
        snack: false,
        snackColor: '',
        snackText: '',
        max280chars: v => v.length <= 280 || 'Input too long!',
        pagination: {},
        headers: [
          {
            text: 'Descripción de alternativas de solución desechadas',
            align: 'left',
            sortable: false,
            value: 'descripcion',
            width: "50%"
          },
          { text: 'Costo de mantenimiento', value: 'costoMantenimiento', align: 'right', width: "16.6%",sortable: false,},
          { text: 'Costo de operación', value: 'costoOperacion',  align: 'right', width: "16.6%",sortable: false,},
          { text: 'Costo Total (incluye IVA)', value: 'costoTotal',  align: 'right', width: "16.6%",sortable: false, },
        ],
        desserts: [
          {
            descripcion: 'Alternativa 1',
            costoMantenimiento: 0.00,
            costoOperacion: 0.00,
            costoTotal: 0.00,
           
          },
          {
            descripcion: 'Alternativa 2',
            costoMantenimiento: 0.00,
            costoOperacion: 0.00,
            costoTotal: 0.00,
           
          },
        ],
      }
    },
    methods: {
      save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      },
    },
};
</script>
<style lang="css">
.tablaAlternativas table>thead>tr>th{
 background-color: #E0E0E0 !important;
}
.tablaAlternativas table > tbody > tr:hover{
  background-color: transparent !important;
}
.tablaAlternativas table > tbody > tr > td:hover{
   background-color: #F5F5F5 !important;
  /* font-size: 12pt !important; */
  font-weight: bold;
  text-align: right;
  width: 12.5%;
}
</style>

