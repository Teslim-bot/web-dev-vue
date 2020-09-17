import TodoService from "../../services/TodoService";
import LoaderUtils from "../../utils/BaseUtils/LoaderUtils";
import StoreUtils from "../../utils/BaseUtils/StoreUtils";
import RouterUtils from "../../utils/BaseUtils/RouterUtils";

const todoService = new TodoService();

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
  }
};

export const actions = {
  fetchTodoList() {
    let payload = {};
    let successAction = responseData => {
      StoreUtils.commit("table/SET_TABLE_DATA", responseData);
      let loaderType = LoaderUtils.types.TABLE;
    };
    todoService.fetchTodoList(payload, successAction, LoaderUtils.types.TABLE);
  }
};
