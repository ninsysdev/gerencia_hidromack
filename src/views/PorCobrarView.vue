<template>
    <main class="mt-5 pt-3">
        <div class="container-fluid">
            <PiePorCobrar dis_pie dis_table />
            <hr>
            <AnalisisVencimiento/>
        </div>
   </main>
</template>

<script setup>
    import PiePorCobrar from '../components/PiePorCobrar.vue';
    import AnalisisVencimiento from '../components/AnalisisVencimiento.vue';
</script>