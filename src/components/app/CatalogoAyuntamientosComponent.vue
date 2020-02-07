<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="tipo_usuario.descripcion"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn text color="green brighten-5" v-on="on"
                >+ Agregar Ayuntamiento</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6" offset-md="3">
                      <v-autocomplete
                        :items="municipios"
                        :filter="customFilter"
                        v-model="editedItem.id_municipio"
                        item-text="descripcion"
                        item-value="id_municipio"
                        label="Ayuntamiento"
                        return-object
                        outlined
                        dense
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="7">
                      <v-select
                        v-model="editedItem.id_cargo"
                        :items="cargo"
                        item-text="cargo"
                        item-value="id_cargo"
                        label="Cargo:"
                        outlined
                        dense
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field
                        dense
                        v-model="editedItem.titulo"
                        label="Título:"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        dense
                        v-model="editedItem.nombre"
                        label="Nombre del servidor:"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="close"
                  >Cancelar</v-btn
                >
                <v-btn color="green darken-1" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="btnK pa-0" x-small height="30px" @click="editItem(item)">
          <v-icon color="green darken-2">mdi-square-edit-outline</v-icon>
        </v-btn>
        <v-btn
          class="btnK pa-0"
          x-small
          height="30px"
          @click="deleteItem(item)"
        >
          <v-icon color="red darken-2">mdi-delete-forever</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Ayuntamiento",
        align: "left",
        value: "descripcion"
      },
      { text: "Cargo", value: "cargo" },
      { text: "Título", value: "titulo" },
      { text: "Nombre Servidor", value: "nombre" },
      { text: "Acciones", value: "action", sortable: false }
    ],
    desserts: [],
    municipios: [],
    cargo: [],
    editedIndex: -1,
    editedItem: {
      id_municipio: null,
      descripcion: null,
      id_cargo: null,
      cargo: null,
      titulo: null,
      nombre: null
    },
    defaultItem: {
      id_municipio: null,
      descripcion: null,
      id_cargo: null,
      cargo: null,
      titulo: null,
      nombre: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo ayuntamiento"
        : "Editar ayuntamiento";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    "editedItem.id_cargo": function(val) {
      this.cargo.forEach(element => {
        if (element.id_cargo == val) {
          this.editedItem.cargo = element.cargo;
        }
      });
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$http
        .get("/catalogos/get_municipios")
        .then(response => {
          response.data.rows.forEach(element => {
            this.municipios.push(element);
            this.desserts.push(element);
          });
        })
        .catch(err => {});

      this.$http
        .get("/catalogos/get_cargos")
        .then(response => {
          response.data.rows.forEach(element => {
            this.cargo.push(element);
          });
        })
        .catch(err => {});
    },

    customFilter(item, queryText, itemText) {
      const textOne = item.descripcion.toLowerCase();
      const textTwo = item.descripcion.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if (confirm("¿Deseas dar de baja a este usuario?")) {
        this.$http
          .post("/catalogos/eliminar_usuario", {
            id: this.desserts[index].id
          })
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              this.desserts[index].activo = 0;
            } else {
              console.log("Error", response.err);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.$http
        .post("/catalogos/registrar_municipio", {
          id_municipio:
            typeof this.editedItem.id_municipio === "undefined"
              ? null
              : this.editedItem.id_municipio,
          descripcion: this.editedItem.descripcion,
          id_cargo: this.editedItem.id_cargo,
          titulo: this.editedItem.titulo,
          nombre: this.editedItem.nombre
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            if (this.editedIndex > -1) {
              Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
              this.desserts.push(this.editedItem);
            }
          } else {
            console.log("Error", response.err);
          }
        })
        .catch(error => {
          console.error(error);
        });
      this.close();
    }
  }
};
</script>
