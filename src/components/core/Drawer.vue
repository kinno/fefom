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
    width="200"
    :expand-on-hover="true"
  >
    <template v-slot:img="attrs">
      <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .3)" />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar class="mr-1">
        <v-icon>mdi-account-circle</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          <pre>{{(this.user.descripcion!==null) ? this.user.descripcion : "Administrativo"}}</pre>
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
        <v-layout v-if="item.heading" :key="item.heading" row align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>

        <v-list-group
          v-else-if="item.children "
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

          <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.to">
            <v-list-item-action v-if="child.icon" >
              <v-icon small >{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text" :to="item.to">
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
    if (this.user.tipo_usuario == 1) {
      this.items = [
        {
          icon: "mdi-menu-up",
          "icon-alt": "mdi-menu-right",
          text: "Techos Financieros",
          model: false,
          children: [
            {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Registro",
              to: "/techos-financieros",
              tipo_usuario: 1
            }
          ]
        },
        {
          icon: "mdi-menu-up",
          "icon-alt": "mdi-menu-right",
          text: "Cartera de proyectos",
          model: false,
          children: [
            {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Revisión",
              to: "/revision_cartera_proyectos"
            }
          ]
        },
        {
          icon: "mdi-menu-up",
          "icon-alt": "mdi-menu-right",
          text: "Oficios",
          model: false,
          children: [
            {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Control",
              to: "/control_oficios"
            }
          ]
        },
        {
          icon: "mdi-settings",
          text: "Catálogos",
          to: "/catalogos"
        }
      ];
    } else {
      this.items = [
        // {
        //   icon: "mdi-menu-up",
        //   "icon-alt": "mdi-menu-right",
        //   text: "Techos Financieros",
        //   model: false,
        //   children: [
        //     {
        //       icon: "mdi-checkbox-multiple-blank-circle-outline",
        //       text: "Consulta",
        //       to: "/consulta_techos",
        //       tipo_usuario: 2
        //     }
        //   ]
        // },
        {
          icon: "mdi-menu-up",
          "icon-alt": "mdi-menu-right",
          text: "Cartera de proyectos",
          model: false,
          children: [
            {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Registro",
              to: "/registro_cartera_proyectos",
            }
          ]
        },
        {
          icon: "mdi-menu-up",
          "icon-alt": "mdi-menu-right",
          text: "Ficha Técnica",
          model: false,
          children: [
            {
              icon: "mdi-checkbox-multiple-blank-circle-outline",
              text: "Registro",
              to: "/registro_ficha_tecnica"
            }
          ]
        },
      ];
    }
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: [],
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
    logout() {
      this.$http
        .get("/login/logout")
        .then(response => {
          localStorage.clear();
          window.localStorage.clear();
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