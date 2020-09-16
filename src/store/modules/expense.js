import ExpenseService from "../../services/ExpenseService";
import LoaderUtils from "../../utils/BaseUtils/LoaderUtils";
import StoreUtils from "../../utils/BaseUtils/StoreUtils";
import RouterUtils from "../../utils/BaseUtils/RouterUtils";

const expenseService = new ExpenseService();

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
  getUserInfo: state => {
    return state.userInfo.email;
  }
};

export const mutations = {
  SET_USER_OPTIONS(state, payload) {
    state.userOptions = payload;
  }
};

export const actions = {
  createExpense() {
    let formBody = StoreUtils.rootGetters(
      StoreUtils.getters.form.GET_FORM_BODY
    );
    console.log("formbody =>", formBody);
    let payload = {
      category: formBody.category,
      description: formBody.description,
      cost: formBody.cost,
      email: formBody.email
    };
    let successAction = responseData => {
      StoreUtils.commit("expense/SET_TABLE_DATA", responseData.expense);

      RouterUtils.changeRouteTo(RouterUtils.routes.DASHBOARD);
    };
    expenseService.createExpense(
      payload,
      successAction,
      LoaderUtils.types.BLOCKING
    );
  },

  fetchExpense() {
    let payload = {
      email: StoreUtils.rootGetters("user/getUserEmail")
    };
    let successAction = responseData => {
      StoreUtils.commit("table/SET_TABLE_DATA", responseData.expense);
    };
    expenseService.fetchExpense(
      payload,
      successAction,
      LoaderUtils.types.TABLE
    );
  }
};
