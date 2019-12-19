<template>
  <v-col cols="12" lg="12">
    <material-card color="green" title="Consulta de Techos Financieros"
      :text="'Ejercicio: '+this.ejercicioSeleccionado">
      <v-container fluid>
        <v-toolbar flat color="white">
              Ejercicio:
              <v-col cols="12" sm="6" md="2">
                <v-select
                  :items="ejercicios"
                  v-model="ejercicioSeleccionado"
                  dense
                  solo
                  class="mt-3"
                  item-text="ejercicio"
                  item-value="ejercicio"
                ></v-select>
              </v-col>
              <v-spacer></v-spacer>
        </v-toolbar>
        <v-row >
          <v-col sm="10">
            <v-card
              class="pa-2"
              outlined
              tile
            >
              Recursos Etiquetados 50%
            </v-card>
            <v-row no-gutters>
              <v-col
                cols="3"
                sm="3"
              >
                <v-card
                  class="pa-2"
                  outlined
                  style="background-color: lightgrey;"
                  tile
                >
                  Iluminación municipal<br>22.0%
                </v-card>
              </v-col>
              <v-col
                cols="3"
                sm="3"
              >
                <v-card
                  class="pa-2"
                  outlined
                  style="background-color: lightgrey;"
                  tile
                >
                  Seguridad<br>26.0%
                </v-card>
              </v-col>
              <v-col
                cols="3"
                sm="3"
              >
                <v-card
                  class="pa-2"
                  outlined
                  style="background-color: lightgrey;"
                  tile
                >
                 Proyectos de inversión pública<br>26.0%
                </v-card>
              </v-col>
              <v-col
                cols="3"
                sm="3"
              >
                <v-card
                  class="pa-2"
                  outlined
                  style="background-color: lightgrey;"
                  tile
                >
                 Acciones para el desarrollo<br>26.0%
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col sm="2">
            <v-card
              class="pa-2"
              outlined
              tile
            >
              Recursos Etiquetados 50%
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </material-card>
  </v-col>
</template>

<script>
  export default {

    data: () => ({
      ejercicioSeleccionado: '2020',
      ejercicios: [],
    }),

    computed: {

    },

    watch: {

    },

    created() {
      this.initialize();
    },

    methods: {
      initialize() {
        this.$http.get('/catalogos/get_ejercicios')
          .then(response => {
            response.data.rows.forEach(element => {
              this.ejercicios.push(element)
            });
          })
          .catch((err) => {

          })

        
        this.getTechos()
      },
      getTechos() {
        this.techosFinancieros = [];
        this.$http.post('/techos_financieros/get_techos', {
            ejercicio: this.ejercicioSeleccionado
          })
          .then(response => {
            response.data.rows.forEach(element => {
              this.techosFinancieros.push({
                id: element.id,
                municipio: {
                  id: element.id_municipio,
                  descripcion: element.descripcion
                },
                monto_total: element.monto_total,
                monto_iluminacion_municipal: element.monto_iluminacion_municipal,
                porc_iluminacion_municipal: element.porc_iluminacion_municipal,
                monto_seguridad: element.monto_seguridad,
                porc_seguridad: element.porc_seguridad,
                monto_inversion_publica: element.monto_inversion_publica,
                porc_inversion_publica: element.porc_inversion_publica,
                monto_desarrollo: element.monto_desarrollo,
                porc_desarrollo: element.porc_desarrollo,
                monto_no_etiquetado: element.monto_no_etiquetado,
                porc_no_etiquetado: element.porc_no_etiquetado,
              })
            });
          })
          .catch((error) => {
            console.error(error);
          });
      },
      editItem(item) {
        this.editedIndex = this.techosFinancieros.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        const index = this.techosFinancieros.indexOf(item);
        if (confirm("¿Deseas eliminar este registro?")) {
          this.$http.post('/techos_financieros/eliminar_techo', {
              id: this.techosFinancieros[index].id
            })
            .then(response => {
              console.log(response)
              if (response.status == 200) {
                this.techosFinancieros.splice(index, 1);
              } else {
                console.log("Error", response.err)
              }
            })
            .catch((error) => {
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
        this.$http.post('/techos_financieros/registrar_techo', {
            id: (typeof this.editedItem.id === 'undefined') ? null : this.editedItem.id,
            id_municipio: this.editedItem.municipio.id,
            ejercicio: this.ejercicioSeleccionado,
            monto_total: this.editedItem.monto_total.replace(/[,]+/g, ""),
            monto_iluminacion_municipal: this.editedItem.monto_iluminacion_municipal,
            porc_iluminacion_municipal: this.editedItem.porc_iluminacion_municipal,
            monto_seguridad: this.editedItem.monto_seguridad,
            porc_seguridad: this.editedItem.porc_seguridad,
            monto_inversion_publica: this.editedItem.monto_inversion_publica,
            porc_inversion_publica: this.editedItem.porc_inversion_publica,
            monto_desarrollo: this.editedItem.monto_desarrollo,
            porc_desarrollo: this.editedItem.porc_desarrollo,
            monto_no_etiquetado: this.editedItem.monto_no_etiquetado,
            porc_no_etiquetado: this.editedItem.porc_no_etiquetado
          })
          .then(response => {
            console.log(response)
            if (response.status == 200) {
              if (this.editedIndex > -1) {
                Object.assign(this.techosFinancieros[this.editedIndex], this.editedItem)
              } else {
                this.techosFinancieros.push(this.editedItem)
              }
            } else {
              console.log("Error", response.err)
            }
          })
          .catch((error) => {
            console.error(error);
          });
        this.close()
      },
      onSelect() {
        const allowedTypes = [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ];
        const file = this.$refs.file.files[0];
        this.file = file;
        if (!allowedTypes.includes(file.type)) {
          this.message = "Archivo no válido";
        }
      },
      async onSubmit() {
        // EventBus.$emit("loading", true);
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("ejercicio", this.ejercicioSeleccionado);
        try {
          await this.$http.post("/techos_financieros/upload", formData).then(async resp => {
            if (resp.status == 200) {
              // this.message = "Productos cargados correctamente";
              this.getTechos()
              // EventBus.$emit("loading", false);
            } else {
              this.message = "Ocurrió un error al cargar los productos";
            }
            // EventBus.$emit("loading", false);
            this.dialog2 = false;
          });
        } catch (err) {
          // EventBus.$emit("loading", false);
          console.log(err);
          // this.message = err.response.data.error;
        }
      },
    }
  };

</script>
