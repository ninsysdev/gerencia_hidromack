<template>
    <main class="mt-5 pt-3">
        <div class="container-fluid">
            <DatosEmpresa/>
            <PedidoCliente/>
        </div>
    </main>
    </template>
    <script setup>
        import DatosEmpresa from '../components/DatosEmpresa.vue';
        import PedidoCliente from '../components/PedidoCliente.vue';
    </script>