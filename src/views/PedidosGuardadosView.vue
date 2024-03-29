<template>
    <main class="mt-5 pt-3">
        <div class="container-fluid">
            <DatosEmpresa/>
            <PedidosGuardados/>
        </div>
    </main>
    </template>
    <script setup>
        import DatosEmpresa from '../components/DatosEmpresa.vue';
        import PedidosGuardados from '../components/PedidosGuardados.vue';
    </script>