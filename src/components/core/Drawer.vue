<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-2"
    dark
    floating
    clipped
    mobile-break-point="991"
    persistent
    width="200px"
    :expand-on-hover="true"
  >
    <template v-slot:img="attrs">
      <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .3)" />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar >
        <v-icon large dense>mdi-account-circle</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          <pre>{{(this.user.descripcion!==null) ? this.user.descripcion : this.user.nombre}}</pre>
        </v-list-item-title>
        <v-list-item-subtitle>Configuración</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <!-- <v-list nav> -->
    <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
    <div />

    <v-list dense>
      <template v-for="item in items">
        <!-- <v-layout v-if="item.heading" :key="item.heading" row align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout> -->

        <v-list-group
          v-if="item.children && item.visible"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
         
        >
          <template v-slot:activator>
            <v-list-item >
              <v-list-item-content >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <div v-for="(child, i) in item.children" :key="i">
            <v-list-item v-if="child.visible" :to="child.to">
              <v-list-item-action v-if="child.icon" >
                <v-icon small >{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-group>
        <v-list-item v-else-if="item.visible" :key="item.text" :to="item.to">
          <v-list-item-action >
            <v-icon small >{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <!-- </v-list> -->

    <template v-slot:append>
      <v-list nav>
        <v-list-item @click="logout">
          <v-list-item-action class="mr-1">
            <v-icon>mdi-door</v-icon>
          </v-list-item-action>

          <v-list-item-title class="font-weight-light">Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.armaMenu();
    // console.log(this.user)
    // if (this.user.tipo_usuario == 1) {
    //   this.items = [
    //     {
    //       icon: "mdi-menu-up",
    //       "icon-alt": "mdi-menu-right",
    //       text: "Techos Financieros",
    //       model: false,
    //       children: [
    //         {
    //           icon: "mdi-checkbox-multiple-blank-circle-outline",
    //           text: "Registro",
    //           to: "/techos-financieros",
    //           tipo_usuario: 1
    //         }
    //       ]
    //     },
    //     {
    //       icon: "mdi-menu-up",
    //       "icon-alt": "mdi-menu-right",
    //       text: "Cartera de proyectos",
    //       model: false,
    //       children: [
    //         {
    //           icon: "mdi-checkbox-multiple-blank-circle-outline",
    //           text: "Revisión",
    //           to: "/revision_cartera_proyectos"
    //         }
    //       ]
    //     },
    //     {
    //       icon: "mdi-menu-up",
    //       "icon-alt": "mdi-menu-right",
    //       text: "Ficha Técnica",
    //       model: false,
    //       children: [
    //         {
    //           icon: "mdi-checkbox-multiple-blank-circle-outline",
    //           text: "Revisión",
    //           to: "/revision_ficha_tecnica"
    //         }
    //       ]
    //     },
    //     {
    //       icon: "mdi-menu-up",
    //       "icon-alt": "mdi-menu-right",
    //       text: "Oficios",
    //       model: false,
    //       children: [
    //         {
    //           icon: "mdi-checkbox-multiple-blank-circle-outline",
    //           text: "Control",
    //           to: "/control_oficios"
    //         }
    //       ]
    //     },
    //     {
    //       icon: "mdi-settings",
    //       text: "Catálogos",
    //       to: "/catalogos"
    //     }
    //   ];
    // } else {
    //   this.items = [
    //     // {
    //     //   icon: "mdi-menu-up",
    //     //   "icon-alt": "mdi-menu-right",
    //     //   text: "Techos Financieros",
    //     //   model: false,
    //     //   children: [
    //     //     {
    //     //       icon: "mdi-checkbox-multiple-blank-circle-outline",
    //     //       text: "Consulta",
    //     //       to: "/consulta_techos",
    //     //       tipo_usuario: 2
    //     //     }
    //     //   ]
    //     // },
    //     {
    //       icon: "mdi-menu-up",
    //       "icon-alt": "mdi-menu-right",
    //       text: "Cartera de proyectos",
    //       model: false,
    //       children: [
    //         {
    //           icon: "mdi-checkbox-multiple-blank-circle-outline",
    //           text: "Registro",
    //           to: "/registro_cartera_proyectos",
    //         }
    //       ]
    //     },
    //     {
    //       icon: "mdi-menu-up",
    //       "icon-alt": "mdi-menu-right",
    //       text: "Ficha Técnica",
    //       model: false,
    //       children: [
    //         {
    //           icon: "mdi-checkbox-multiple-blank-circle-outline",
    //           text: "Registro",
    //           to: "/registro_ficha_tecnica"
    //         }
    //       ]
    //     },
    //   ];
    // }
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: [
      {
          icon: "mdi-menu-up",
          "icon-alt": "mdi-menu-right",
          text: "Techos Financieros",
          model: false,
          visible: false,
          tipo_usuario: [1],
          tipo_rol: [3],
          children: [
            {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Registro",
              to: "/techos-financieros",
              tipo_usuario: [1],
              tipo_rol: [3],
              visible: false,
            }
          ]
        },
        {
          icon: "mdi-menu-up",
          "icon-alt": "mdi-menu-right",
          text: "Cartera de proyectos",
          model: false,
          visible: false,
          tipo_usuario: [1,2],
          tipo_rol: null,
          children: [
             {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Registro",
              to: "/registro_cartera_proyectos",
              visible: false,
              tipo_usuario: [2],
              tipo_rol: null,
            },
            {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Revisión",
              to: "/revision_cartera_proyectos",
              visible: false,
              tipo_usuario: [1],
              tipo_rol: [3],
            }
          ]
        },
        {
          icon: "mdi-menu-up",
          "icon-alt": "mdi-menu-right",
          text: "Ficha Técnica",
          model: false,
          visible: false,
          tipo_usuario: [1,2],
          tipo_rol: null,
          children: [
             {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Listado",
              to: "/listado_ficha_tecnica",
              visible: false,
              tipo_usuario: [1,2],
              tipo_rol: null,
              // tipo_rol: [1,2,3],
            },
             {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Registro",
              to: "/registro_ficha_tecnica",
              visible: false,
              tipo_usuario: [2],
              tipo_rol: null,
            },
            {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Revisión",
              to: "/revision_ficha_tecnica",
              visible: false,
              tipo_usuario: [1],
              tipo_rol: [1,2,3],
            }
          ]
        },
        {
          icon: "mdi-menu-up",
          "icon-alt": "mdi-menu-right",
          text: "Oficios",
          model: false,
          visible: false,
          tipo_usuario: [1],
          tipo_rol: [2,3],
          children: [
            {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Control",
              to: "/control_oficios",
              visible: false,
              tipo_usuario: [1],
              tipo_rol: [2,3],
            }
          ]
        },
        {
          icon: "mdi-cogs",
          text: "Catálogos",
          to: "/catalogos",
          visible: false,
          tipo_usuario: [1],
          tipo_rol: [2,3],
          children: null
        }
    ],
    user: null
  }),

  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    armaMenu(){
      for (let index = 0; index < this.items.length; index++) {
        // console.log(this.items[index].text)
        if(this.items[index].tipo_rol == null || this.buscarRol(this.items[index].tipo_rol)){
          this.items[index].visible = true
          // console.log(this.items[index].children)
          if(this.items[index].children!== null){
            for (let ind = 0; ind < this.items[index].children.length; ind++) {
              // console.log("---",this.items[index].children[ind].text)
              if(this.items[index].children[ind].tipo_rol == null && this.buscarUsuario(this.items[index].children[ind].tipo_usuario)){
                this.items[index].children[ind].visible = true
              }else{
                // console.log(this.items[index].text,this.buscarUsuario(this.items[index].children[ind].tipo_usuario))
                if(this.buscarUsuario(this.items[index].children[ind].tipo_usuario) && this.buscarRol(this.items[index].children[ind].tipo_rol)){
                  this.items[index].children[ind].visible = true
                }
              }
            }
          }
        }else{
          if(this.buscarUsuario(this.items[index].tipo_usuario) && this.buscarRol(this.items[index].tipo_rol)){
            this.items[index].visible = true
          }
        }
        
      }
    },
    buscarRol(tipo){
      
      for (let index = 0; index < tipo.length; index++) {
        if(tipo[index] == this.user.tipo_rol || this.user.tipo_rol == 4){
          //  console.log(tipo[index], this.user.tipo_rol)
          return true
        }
      }
        return false
    },
    buscarUsuario(tipo){
      for (let index = 0; index < tipo.length; index++) {
        if(tipo[index] == this.user.tipo_usuario || this.user.tipo_rol == 4){
          return true
        }
      }
        return false
    },
    logout() {
      this.$http
        .get("/login/logout")
        .then(response => {
          localStorage.clear();
          window.localStorage.clear();
          console.log(localStorage.getItem('jwt'))
          this.$router.push({ path: "/" });
        })
        .catch(function(error) {
          console.error(error.response);
        });
    }
  }
};
</script>
<style lang="css">
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 0px;
}
</style>