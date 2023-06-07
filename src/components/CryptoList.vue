//npm run lint -- --fix
<template>
  <el-table
    :data="
      coins.filter(
        (coin) =>
          !search || coin.name.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column>
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <el-table-column label="" width="120px">
        <template #default="scope">
          <div class="symbol">
            <el-image
              :src="scope.row.image"
              fit="cover"
              style="width: 40px; height: 40px"
            ></el-image>
            <span> {{ scope.row.symbol.toUpperCase() }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        sortable
        :filters="getNameFilters()"
        :filter-method="handleNameFilter"
      >
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="current_price" label="Current Price" sortable>
      <template #default="scope">
        {{ formatNumber(scope.row.current_price) }}
      </template>
    </el-table-column>
    <el-table-column label="Market Cap">
      <template #default="scope">
        {{ formatNumber(scope.row.market_cap) }}
      </template>
    </el-table-column>
    <el-table-column label="Total Volume">
      <template #default="scope">
        {{ formatNumber(scope.row.market_cap) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="price_change_percentage_24h"
      label="Price Change % 24h"
      sortable
    >
      <template #default="scope">
        <el-tag v-if="scope.row.price_change_24h < 0" type="danger">{{
          scope.row.price_change_24h
        }}</el-tag>
        <el-tag v-else-if="scope.row.price_change_24h > 0" type="success">{{
          scope.row.price_change_24h
        }}</el-tag>
        <el-tag v-else>{{ scope.row.price_change_24h }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="" fixed="right">
      <template #default="scope">
        <el-button type="text" size="small" @click="gotoCryptoInfo(scope.row)">
          Info
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import useCoinsMarkets from "../use/coinsMarkets.js";
import useTableFilter from "../use/tableFilter.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const coinsMarkets = useCoinsMarkets();
    const tableFilter = useTableFilter();
    const router = useRouter();

    function gotoCryptoInfo(crypto) {
      router.push({ path: `/crypto/${crypto.id}` });
    }

    return { ...coinsMarkets, ...tableFilter, gotoCryptoInfo };
  },
};
</script>

<style lang="scss" scoped>
.symbol {
  display: flex;
  align-items: center;

  .el-image {
    margin-right: 10px;
  }

  span {
    font-weight: 700;
  }
}
</style>
