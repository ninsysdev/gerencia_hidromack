<template>
  <main class="mt-5 pt-3">
      <div class="container-fluid">
          <DatosEmpresa/>
          <VentasMes/>
      </div>
  </main>
  </template>
  <script setup>
      import DatosEmpresa from '../components/DatosEmpresa.vue';
      import VentasMes from '../components/VentasMes.vue';
  </script>