<template>
  <Layout>
    <Map :locations="locations" />
  </Layout>
</template>
<script>
import { onMounted, ref } from "vue";
import Layout from "../components/Layout.vue";
import Map from "../components/Map.vue";
import { getLocations } from "../services/locationService";

export default {
  components: {
    Layout,
    Map,
  },
  setup() {
    const locations = ref([]);

    onMounted(async () => {
      const result = await getLocations();
      locations.value = result.locations;
    });

    return {
      locations,
    };
  },
};
</script>
