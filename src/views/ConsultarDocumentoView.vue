<template>
    <main class="mt-5 pt-3">
        <div class="container-fluid">
            <ConsultarDocumento 
                :codigo="codigo" 
                :nomclie="nomclie"
                :codclie="codclie"
                :totalmonto="totalmonto" 
            />
        </div>
    </main>
</template>
<script setup>
    import { onBeforeMount,ref } from 'vue';
    import { useRoute } from 'vue-router';
    import ConsultarDocumento from '../components/ConsultarDocumento.vue';

    const codigo = ref(0)
    const nomclie = ref('')
    const codclie = ref('')
    const totalmonto = ref(0)

    onBeforeMount(()=>{
        const route = useRoute()
        codigo.value = route.params.codigo 
        nomclie.value = route.params.nomclie
        codclie.value = route.params.codclie
        totalmonto.value = route.params.totalmonto
    })     
</script>