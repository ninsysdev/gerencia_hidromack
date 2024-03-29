<template>
    <main class="mt-5 pt-3">
        <div class="container-fluid">
            <EditarPedido 
                :codigo="codigo"
                :codclie="codclie"
                :nomclie="nomclie"
            />
        </div>
    </main>
    </template>
    <script setup>
        import { onBeforeMount,ref } from 'vue';
        import { useRoute } from 'vue-router';
        import EditarPedido from '../components/EditarPedido.vue';

        const codigo = ref('');
        const codclie = ref('');
        const nomclie = ref('');

        onBeforeMount(()=>{
            const route = useRoute() 
            codigo.value = route.params.codigo;
            codclie.value = route.params.codclie;
            nomclie.value = route.params.nomclie;
        })     
    </script>