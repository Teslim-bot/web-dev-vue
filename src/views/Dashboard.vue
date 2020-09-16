<template>
  <FetchExpenseTable />
</template>

<script>
import FetchExpenseTable from "@/components/Tables/expense/FetchExpenseTable";

export default {
  name: "Dashboard",
  components: { FetchExpenseTable }
};
</script>

<style scoped></style>
