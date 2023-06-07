import { getMarkets } from "../api/coins";
import { ref, onMounted } from "vue";

export default function useCoinsMarkets() {
  const coins = ref([]);

  async function getAPIData() {
    coins.value = await getMarkets();
  }

  function getNameFilters() {
    return coins.value.map((coin) => {
      return { text: coin.name, value: coin.name };
    });
  }

  onMounted(getAPIData);

  return { coins, getNameFilters };
}
