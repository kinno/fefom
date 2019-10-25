<template>
  <v-data-table
    :headers="headers"
    :items="cartera"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Cartera de proyectos {{municipio}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        Ejercicio:
         <v-col cols="12" sm="6" md="2">
           <v-select
            :items="arrayEjercicio"
            v-model="ejercicio"
            dense
            solo
            class="mt-5"
          ></v-select>
         </v-col>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mt-2" v-on="on">Registrar proyecto</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                        outlined
                        label="Proyecto"
                        v-model="editedItem.nombreProyecto"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                   <v-select
                        :items="arraySecciones"
                        v-model="editedItem.seccion"
                        
                        outlined
                        label="Sección"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.monto" placeholder="Placeholder" outlined label="Monto"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="success" text @click="close">Cancelar</v-btn>
              <v-btn color="success" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-square-edit-outline
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete-forever
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Nombre del proyecto",
        align: "left",
        sortable: false,
        value: "nombreProyecto"
      },
      { text: "Sección", value: "seccion", align: "left" },
      { text: "Monto de proyecto", value: "monto", align: "right" },
      { text: "Estatus", value: "estatus", sortable: false },
      { text: "Acciones", value: "action", sortable: false }
    ],
    cartera: [],
    editedIndex: -1,
    editedItem: {
      nombreProyecto: "",
      seccion: "",
      monto: 0,
      estatus: "",
      motivoRechazo: null
    },
    defaultItem: {
      nombreProyecto: "",
      seccion: "",
      monto: 0,
      estatus: "",
      motivoRechazo: null
    },
    arrayEjercicio: ["2020", "2019", "2018", "2017"],
    ejercicio: "2020",
    municipio: "Toluca",
    arraySecciones: ["Seguridad", "Infraestructura", "Iluminación", "Libre"]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Registrar un nuevo proyecto"
        : "Editar proyecto";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.cartera = [
        {
          nombreProyecto:
            "Colocación de Luminarias en el Valle de Toluca en las colonias: Las Américas, Centro, Independencia.",
          seccion: "Iluminación",
          monto: 1750689,
          estatus: "Aceptado",
          motivoRechazo: null
        },
        {
          nombreProyecto:
            "Implementación de cámaras de seguridad para el Municipio de Toluca",
          seccion: "Seguridad",
          monto: 2765369,
          estatus: "Rechazado",
          motivoRechazo: "Aquí se pone el motivo del rechazo del proyecto"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.cartera.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.cartera.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.cartera.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.cartera[this.editedIndex], this.editedItem);
      } else {
        this.cartera.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
