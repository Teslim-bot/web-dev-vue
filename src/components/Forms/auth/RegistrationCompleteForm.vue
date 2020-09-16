<template>
  <div class="app-form">
    <p class="form-title">Registration Form contd</p>
    <FormulateForm @submit="submit">
      <FormulateInput
        name="username"
        type="text"
        label="username*"
        validation="required"
        validation-name="Username"
        placeholder="John Doe"
      />
      <FormulateInput
        name="token"
        type="number"
        label="token"
        validation="required"
        validation-name="Token"
        placeholder="OTP gotten from email"
      />
      <FormulateInput
        name="password"
        type="password"
        label="set password"
        validation="required"
        validation-name="password"
        placeholder="****"
      />
      <FormulateInput
        name="password_confirm"
        type="password"
        label=" Confirm password"
        validation="required|confirm"
        validation-name="password confirmation"
        placeholder="****"
      />
      <FormulateInput type="submit" label="Register here" />
    </FormulateForm>
  </div>
</template>

<script>
import StoreUtils from "../../../utils/BaseUtils/StoreUtils";

export default {
  name: "RegistrationCompleteForm",

  methods: {
    submit(data) {
      StoreUtils.commit("form/BUILD_FORM_BODY", data);

      StoreUtils.dispatch("auth/createProfileComplete");
    }
  }
};
</script>

<style scoped></style>
