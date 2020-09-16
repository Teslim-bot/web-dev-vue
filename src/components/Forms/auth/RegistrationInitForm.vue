<template>
  <div class="app-form">
    <p class="form-title">Registration Form</p>
    <FormulateForm @submit="submit">
      <FormulateInput
        name="email"
        type="email"
        label="Email*"
        validation="required|email"
        validation-name="Username or Email"
        placeholder="John Doe or johndoe.gmail.com"
      />
      <FormulateInput
        name="firstName"
        type="text"
        label="First Name"
        validation="required"
        validation-name="First Name"
        placeholder="John"
      />
      <FormulateInput
        name="lastName"
        type="text"
        label="Last Name*"
        validation="required"
        validation-name="Last Name"
        placeholder="Doe"
      />
      <FormulateInput type="submit" label="Register" />
    </FormulateForm>
  </div>
</template>

<script>
import StoreUtils from "../../../utils/BaseUtils/StoreUtils";

export default {
  name: "RegistrationInitForm",

  methods: {
    submit(data) {
      StoreUtils.commit("form/BUILD_FORM_BODY", data);

      StoreUtils.dispatch("auth/createProfileInit");
    }
  }
};
</script>

<style scoped></style>
