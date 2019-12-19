<template>
 <v-card>
    <v-card-title>
      Catálogo de Usuarios
      <v-spacer></v-spacer>
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
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Usuario</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="7">
                     <v-select
                      v-model="editedItem.tipo_usuario"
                      :items="tipo_usuario"
                      item-text="descripcion"
                      item-value="id"
                      label="Tipo de usuario"
                      return-object
                      single-line
                      >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field dense v-model="editedItem.username" label="Nombre de usuario"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>  
                  <v-col cols="12">
                    <v-text-field dense v-model="editedItem.password" label="Password"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="editedItem.municipio"
                      :items="municipios"
                      item-text="descripcion"
                      item-value="id"
                      label="Ayuntamiento"
                      return-object
                      single-line
                      >
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="green darken-1" text @click="save">Guardar</v-btn>
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
  </v-card>
</template>

<script>
 export default {
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Usuario',
          align: 'left',
          value: 'username',
        },
        { text: 'Contraseña', value: 'password' },
        { text: 'Municipio', value: 'municipio.descripcion' },
        { text: 'Activo', value: 'activo' },
        { text: 'Tipo de usuario', value: 'tipo_usuario.descripcion' },
        { text: 'Acciones', value: 'action', sortable: false },
      ],
      desserts: [],
      municipios: [],
      tipo_usuario: [
        {
          id: 1,
          descripcion: "Administrativo FEFOM"
        },
        {
          id: 2,
          descripcion: "Ayuntamiento"
        }
      ],
      editedIndex: -1,
      editedItem: {
        username: '',
        password: '',
        municipio: [],
        activo: 1,
        tipo_usuario: [],
      },
      defaultItem: {
        username: '',
        password: '',
        municipio: [],
        activo: 1,
        tipo_usuario: [],
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$http.get('/catalogos/get_municipios')
          .then(response => {
            response.data.rows.forEach(element => {
                this.municipios.push(element)
              });
          })
          .catch((err)=>{

          })

         this.$http.get('/catalogos/get_usuarios')
            .then(response => {
              response.data.rows.forEach(element => {
                console.log(element)
                this.desserts.push({
                  id: element.id_usuario,
                  username: element.username,
                  password: element.password,
                  municipio: {
                    id: element.id_municipio,
                    descripcion: element.descripcion
                  },
                  activo: element.activo,
                  tipo_usuario: {
                    id: element.tipo_usuario,
                    descripcion: (element.tipo_usuario == 1) ? "Administrativo FEFOM" : "Ayuntamiento"
                  }
                })
              });
            })
            .catch((error)=>{
              console.error(error);
            });
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if(confirm("¿Deseas eliminar este usuario?")){
       
        this.$http.post('/catalogos/eliminar_usuario',{
              id: this.desserts[index].id
              })
            .then(response => {
              console.log(response)
              if(response.status == 200){
               this.desserts.splice(index, 1);
              }else{
                console.log("Error", response.err)
              }
            })
            .catch((error)=>{
              console.error(error);
            });
      }
    },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.$http.post('/catalogos/registrar_usuario',{
              id: (typeof this.editedItem.id === 'undefined') ? null : this.editedItem.id,
              username: this.editedItem.username,
              password: this.editedItem.password,
              id_municipio: this.editedItem.municipio.id,
              activo: 1,
              tipo_usuario: this.editedItem.tipo_usuario.id
            })
            .then(response => {
              console.log(response)
              if(response.status == 200){
                if (this.editedIndex > -1) {
                  Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                  this.desserts.push(this.editedItem)
                }
              }else{
                console.log("Error", response.err)
              }
            })
            .catch((error)=>{
              console.error(error);
            });
        this.close()
      },
    },
  }
</script>
