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
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn text color="green brighten-5" v-on="on">+ Agregar Usuario</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                     <v-select
                      v-model="editedItem.tipo_usuario"
                      :items="tipo_usuario"
                      item-text="descripcion"
                      item-value="id"
                      label="Tipo de usuario"
                      return-object
                      outlined
                      dense
                      >
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="6" v-if="editedItem.tipo_usuario.id == 1">
                     <v-select
                      v-model="editedItem.tipo_rol"
                      :items="tipo_rol"
                      item-text="descripcion"
                      item-value="id"
                      label="Rol"
                      return-object
                      outlined
                      dense
                      >
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="6" v-if="editedItem.tipo_usuario.id == 2">
                    <!-- <v-select
                      v-model="editedItem.municipio"
                      :items="municipios"
                      item-text="descripcion"
                      item-value="id"
                      label="Ayuntamiento"
                      return-object
                      outlined
                      dense
                      >
                    </v-select> -->
                    <v-autocomplete
                      :items="municipios"
                      :filter="customFilter"
                      v-model="editedItem.municipio"
                      item-text="descripcion"
                      item-value="id"
                      label="Ayuntamiento"
                      return-object
                      outlined
                      dense
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field dense v-model="editedItem.username" label="Nombre de usuario"></v-text-field>
                  </v-col>
                  <v-col cols="12" md=6>
                    <v-text-field dense v-model="editedItem.password" label="Password"></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="editedItem.tipo_usuario.id == 1">  
                 <v-col cols="12" md="4">
                    <v-text-field dense v-model="editedItem.nombre" label="Nombre:"></v-text-field>
                  </v-col>
                  <v-col cols="12" md=4>
                    <v-text-field dense v-model="editedItem.apellido_paterno" label="Apellido Paterno:"></v-text-field>
                  </v-col>
                  <v-col cols="12" md=4>
                    <v-text-field dense v-model="editedItem.apellido_materno" label="Apellido Materno:"></v-text-field>
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
          text: 'Username',
          align: 'left',
          value: 'username',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Municipio', value: 'municipio.descripcion' },
        { text: 'Tipo de usuario', value: 'tipo_usuario.descripcion' },
        { text: 'Rol', value: 'tipo_rol.descripcion' },
        { text: 'Activo', value: 'activo' },
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
      tipo_rol: [
        {
          id: 1,
          descripcion: "Analista | Evaludaor"
        },
        {
          id: 2,
          descripcion: "Revisor | Subdirector"
        },
        {
          id: 3,
          descripcion: "Autorizador | Director"
        },
        {
          id: 4,
          descripcion: "Administrador"
        },
      ],
      editedIndex: -1,
      editedItem: {
        username: '',
        password: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        municipio: [],
        activo: 1,
        tipo_usuario: [],
        tipo_rol: [],
      },
      defaultItem: {
       username: '',
        password: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        municipio: [],
        activo: 1,
        tipo_usuario: [],
        tipo_rol: [],
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
      'editedItem.tipo_usuario': function(val){
        if(val.id == 1){
          this.editedItem.municipio = null
        }else if(val.id == 2){
          this.editedItem.tipo_rol = null
        }
        this.editedItem.nombre = null
        this.editedItem.apellido_paterno = null
        this.editedItem.apellido_materno = null
      },
      'editedItem.municipio': function(val){
        if(val!==null){
          this.editedItem.nombre = val.descripcion
          this.editedItem.apellido_paterno = val.descripcion
          this.editedItem.apellido_materno = val.descripcion
        }
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
                // console.log(element)
                var tipo_rol = {
                  id: null,
                  descripcion: null,
                }
                if(element.tipo_rol !== null){
                  switch (element.tipo_rol) {
                    case 1:
                      tipo_rol.id = tipo_rol
                      tipo_rol.descripcion = "Analista"
                      break;
                    case 2:
                      tipo_rol.id = tipo_rol
                      tipo_rol.descripcion = "Revisor"
                      break;
                    case 3:
                      tipo_rol.id = tipo_rol
                      tipo_rol.descripcion = "Autorizador"
                      break;
                    case 4:
                      tipo_rol.id = tipo_rol
                      tipo_rol.descripcion = "Administrador"
                      break;
                  
                    default:
                      break;
                  }
                }
                this.desserts.push({
                  id: element.id_usuario,
                  username: element.username,
                  password: element.password,
                  nombre: element.nombre,
                  apellido_paterno: element.apellido_paterno,
                  apellido_materno: element.apellido_materno,
                  municipio: {
                    id: element.id_municipio,
                    descripcion: element.descripcion
                  },
                  activo: element.activo,
                  tipo_usuario: {
                    id: element.tipo_usuario,
                    descripcion: (element.tipo_usuario == 1) ? "Administrativo FEFOM" : "Ayuntamiento"
                  },
                  tipo_rol: tipo_rol,
                })
              });
            })
            .catch((error)=>{
              console.error(error);
            });
            
      },

      customFilter (item, queryText, itemText) {
        const textOne = item.descripcion.toLowerCase()
        const textTwo = item.descripcion.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if(confirm("¿Deseas dar de baja a este usuario?")){
       
        this.$http.post('/catalogos/eliminar_usuario',{
              id: this.desserts[index].id
              })
            .then(response => {
              // console.log(response)
              if(response.status == 200){
              this.desserts[index].activo = 0
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
              id_municipio: (this.editedItem.municipio !== null) ? this.editedItem.municipio.id_municipio : null,
              activo: 1,
              tipo_usuario: this.editedItem.tipo_usuario.id,
              tipo_rol: (this.editedItem.tipo_rol !== null) ? this.editedItem.tipo_rol.id : null,
              nombre: this.editedItem.nombre,
              apellido_paterno: this.editedItem.apellido_paterno,
              apellido_materno: this.editedItem.apellido_materno
            })
            .then(response => {
              // console.log(response)
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
