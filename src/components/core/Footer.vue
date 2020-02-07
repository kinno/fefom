<template>
  <v-footer
    id="core-footer"
    absolute
    height="60"
    color="grey darken-1"
    class="font-weight-medium font-size"
    padless
    
    
  >
  <!-- {{ new Date().getFullYear() }} — <strong>Vuetify</strong> -->
  <v-row>
    
    <v-col
      class="text-right pa-0 pr-5"
      cols="12"
    >
       <p class="ma-0 text-uppercase font-weight-black" style="font-size: 11px;">Secretaría de finanzas</p>
       <p class="ma-0 text-uppercase" style="font-size: 10px;">Subsecretaría de planeación y presupuesto</p>
       <p class="ma-0" style="font-size: 10px;">Calle del Colorin Número 101, Colonia Lomas Altas.
        Toluca. Estado de México. CP 50060, Teléfono: 01 (722) 625 0486</p>
    </v-col>
  </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        { name: 'Home', Link: '/#' },
        { name: 'Creative Tim', Link: 'https://www.creative-tim.com' },
        { name: 'About Us', Link: 'https://creative-tim.com/presentation' },
        { name: 'Blog', Link: 'https://blog.creative-tim.com' }
      ]
    })
  }
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
