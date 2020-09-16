<template>
  <div>
    <RegistrationInitForm v-if="formStage === 0" />
    <RegistrationCompleteForm v-if="formStage === 1" />
  </div>
</template>

<script>
import StoreUtils from "../../../utils/BaseUtils/StoreUtils";

export default {
  name: "RegistrationForm"
};
</script>

<style scoped></style>
