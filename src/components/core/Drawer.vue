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
    width="180"
    expand-on-hover
    
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .3)"
      />
    </template>

    <v-list-item two-line>
          <v-list-item-avatar class="mr-1">
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Toluca</v-list-item-title>
            <v-list-item-subtitle>Configuración</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
        dense
      >
        <v-list-item-action class="mr-1">
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title class="caption" v-text="link.text" />
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list nav>
        <v-list-item
          to="/upgrade"
        >
          <v-list-item-action class="mr-1">
            <v-icon>mdi-door</v-icon>
          </v-list-item-action>

          <v-list-item-title class="font-weight-light">
           Cerrar sesión
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    links: [
      // {
      //   to: '/',
      //   icon: 'mdi-view-dashboard',
      //   text: 'Dashboard'
      // },

      {
        to: "/techos-financieros",
        icon: "mdi-checkbox-multiple-blank-circle-outline",
        text: "Techos Financieros"
      },
      {
        to: "/cartera_proyectos",
        icon: "mdi-checkbox-multiple-blank-circle-outline",
        text: "Cartera de proyectos"
      }
    ]
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
    }
  }
};
</script>
