<template>
    <main class="mt-5 pt-3">
        <div class="container-fluid">
            <DatosEmpresa/>
            <PedidosEnviados/>
        </div>
    </main>
</template>
<script setup>
    import DatosEmpresa from '../components/DatosEmpresa.vue';
    import PedidosEnviados from '../components/PedidosEnviados.vue';
</script>