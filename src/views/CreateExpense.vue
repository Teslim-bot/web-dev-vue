<template>
  <div class="jumbotron">
    <CreateExpenseForm />
  </div>
</template>
<script>
import CreateExpenseForm from "@/components/Forms/expense/CreateExpenseForm";
export default {
  name: "Create Expense",
  components: { CreateExpenseForm }
};
</script>
