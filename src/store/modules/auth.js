import AuthServices from "../../services/AuthServices";
import LoaderUtils from "@/utils/BaseUtils/LoaderUtils";
import StoreUtils from "@/utils/BaseUtils/StoreUtils";
import RouterUtils from "@/utils/BaseUtils/RouterUtils";
const authService = new AuthServices();

export const namespaced = true;

export const state = {
  userOptions: {
    requestId: "",
    categoryId: "",
    insuranceCompanyId: "",
    username: ""
  }
};

export const getters = {
  getUserOptions: state => {
    return state.userOptions;
  },
  getRequestId: state => {
    return state.userOptions.requestId;
  },
  getCategoryId: state => {
    return state.userOptions.categoryId;
  },
  getInsuranceCompanyId: state => {
    return state.userOptions.insuranceCompanyId;
  },
  getUsername: state => {
    return state.userOptions.username;
  }
};

export const mutations = {
  SET_USER_OPTIONS(state, payload) {
    state.userOptions = payload;
  }
};

export const actions = {
  login() {
    let formBody = StoreUtils.rootGetters(
      StoreUtils.getters.form.GET_FORM_BODY
    );
    console.log("formbody =>", formBody);

    let payload = {
      userID: formBody.userID,
      password: formBody.password
    };
    console.log("the login is", payload);
    let successAction = responseData => {
      //  save user info in the store

      StoreUtils.commit("user/SET_USER_INFO", responseData);

      // route the user to the dashboard
      RouterUtils.changeRouteTo(RouterUtils.routes.DASHBOARD);
    };

    authService.login(payload, successAction, LoaderUtils.types.BLOCKING);
  },
  createProfileInit() {
    let formBody = StoreUtils.rootGetters(
      StoreUtils.getters.form.GET_FORM_BODY
    );
    console.log("Reg Init Form Body ==>", formBody);

    let payload = {
      email: formBody.email,
      firstName: formBody.firstName,
      lastName: formBody.lastName
    };
    console.log("Your Reg Init payload is ==>", payload);
    let successAction = responseData => {
      //  increase form stage
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");

      //  store user reg payload
      let responsePayload = {
        uniqueRef: responseData.uniqueRef,
        email: formBody.email
      };
      StoreUtils.commit("user/SET_USER_REG_PAYLOAD", responsePayload);
    };

    authService.registerInit(
      payload,
      successAction,
      LoaderUtils.types.BLOCKING
    );
  },
  createProfileComplete() {
    let formBody = StoreUtils.rootGetters(
      StoreUtils.getters.form.GET_FORM_BODY
    );
    let userRegPayload = StoreUtils.rootGetters(
      StoreUtils.getters.user.GET_USER_REG_PAYLOAD
    );
    console.log("Reg Complete Form Body ==>", formBody);
    console.log("User Reg Payload Is ==>", userRegPayload);

    let payload = {
      username: formBody.username,
      token: formBody.token,
      uniqueRef: userRegPayload.uniqueRef,
      password: formBody.password,
      email: userRegPayload.email
    };
    console.log("Your Reg Complete payload is ==>", payload);
    let successAction = responseData => {
      //  change to login
      RouterUtils.changeRouteTo(RouterUtils.routes.auth.LOGIN);
    };

    authService.registerComplete(
      payload,
      successAction,
      LoaderUtils.types.BLOCKING
    );
  }
};
