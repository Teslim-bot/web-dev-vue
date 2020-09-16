<template>
  <div class="app-form">
    <p class="form-title">Create expense</p>
    <FormulateForm @submit="submit">
      <FormulateInput
        name="cost"
        type="number"
        label="Cost*"
        validation="required"
        validation-name="Cost"
        placeholder="Cost"
      />
      <FormulateInput
        name="category"
        type="text"
        label="Category"
        validation="required"
        validation-name="Category"
        placeholder="Password ***"
      />
      <FormulateInput
        name="description"
        type="text"
        label="Description"
        validation="required"
        validation-name="Description"
        placeholder="Enter your description here please"
      />
      <FormulateInput type="submit" label="Submit" />
    </FormulateForm>
  </div>
</template>

<script>
import StoreUtils from "../../../utils/BaseUtils/StoreUtils";

export default {
  name: "CreateExpense",

  methods: {
    submit(data) {
      StoreUtils.commit("form/BUILD_FORM_BODY", data);

      StoreUtils.dispatch("expense/createExpense");
    }
  }
};
</script>

<style scoped></style>
