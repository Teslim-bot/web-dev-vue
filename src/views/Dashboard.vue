<template>
  <div>
    <FetchTodoListTable />
  </div>
</template>

<script>
import FetchTodoListTable from "../components/Tables/todo/FetchTodoListTable";

export default {
  name: "CreateTodoList",
  components: { FetchTodoListTable }
};
</script>

<style scoped></style>
