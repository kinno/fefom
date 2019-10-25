<template>
  <v-data-table
    :headers="headers"
    :items="techosFinancieros"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Techos Financieros</v-toolbar-title>
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
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mt-2" v-on="on">Nuevo Techo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.municipio" label="Municipio"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.monto" label="Monto"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.porc_seguridad" label="Porcentaje Seguridad"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.porc_infraestructura" label="Porcentaje Infraestructura"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.porc_iluminacion" label="Porcentaje Iluminación"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.porc_libre" label="Porcentaje Libre"></v-text-field>
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
        text: "Municipio",
        align: "left",
        sortable: false,
        value: "municipio"
      },
      { text: "Monto", value: "monto", align: "right" },
      { text: "% Seguridad", value: "porc_seguridad", align: "right" },
      {
        text: "% Infraestructura",
        value: "porc_infraestructura",
        align: "right"
      },
      { text: "% Iluminación", value: "porc_iluminacion", align: "right" },
      { text: "% Libre", value: "porc_libre", align: "right" },
      { text: "Actions", value: "action", sortable: false }
    ],
    techosFinancieros: [],
    editedIndex: -1,
    editedItem: {
      municipio: "",
      monto: 0,
      porc_seguridad: 0,
      porc_infraestructura: 0,
      porc_iluminacion: 0,
      porc_libre: 0
    },
    defaultItem: {
      municipio: "",
      monto: 0,
      porc_seguridad: 0,
      porc_infraestructura: 0,
      porc_iluminacion: 0,
      porc_libre: 0
    },
    arrayEjercicio: ["2020", "2019", "2018", "2017"],
    ejercicio: '2020'
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Techo" : "Editar Techo";
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
      this.techosFinancieros = [
        {
          municipio: "Toluca",
          monto: 1750689,
          porc_seguridad: 30,
          porc_infraestructura: 30,
          porc_iluminacion: 30,
          porc_libre: 30
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.techosFinancieros.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
