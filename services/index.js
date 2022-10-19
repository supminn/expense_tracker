import { gql } from "graphql-request";
import { nhost } from "../pages/_app";
import { DataActions } from "../reducer/actions";
import { formatedDate } from "../utilities";

const addNewItem = async (item, userId, dataDispatch) => {
  const query = gql`
    mutation AddNewItem {
        insert_user_data_one(
            object: {
                date: "${formatedDate(item?.date, "YYYY-MM-DD")}",
                route: "${item?.route}",
                userId: "${userId}",
                name: "${item?.name}",
                amount: "${item?.amount}",
                description: "${item?.description}",
            }
        ) {
          id
        }
    }
  `;
  dataDispatch({ type: DataActions.SET_LOADER, payload: true });
  const { data, error } = await nhost.graphql.request(query);
  if (data) {
    const type =
      item?.route === "expense"
        ? DataActions.ADD_EXPENSE
        : DataActions.ADD_INCOME;
    const payload = { ...item, id: data?.insert_user_data_one?.id };
    return dataDispatch({ type, payload });
  }
  if (error) {
    console.error("error in addNewItem: ", error);
    return dataDispatch({
      type: DataActions.SET_ERROR,
      payload: "Oh Snap! We were unable to add this item.",
    });
  }
};

const deleteItem = async (item, userId, dataDispatch) => {
  const query = gql`
  mutation DeleteItem {
    delete_user_data(where: {_and: {id: {_eq: "${item?.id}"}, userId: {_eq: "${userId}"}}}) {
      affected_rows
    }
  }
  `;
  dataDispatch({ type: DataActions.SET_LOADER, payload: true });
  const { data, error } = await nhost.graphql.request(query);
  if (data) {
    if (data?.delete_user_data?.affected_rows) {
      const type =
        item?.route === "expense"
          ? DataActions.REMOVE_EXPENSE
          : DataActions.REMOVE_INCOME;
      return dataDispatch({ type, payload: item });
    } else {
      return dataDispatch({
        type: DataActions.SET_ERROR,
        payload: "Oops! No such data was availble to delete",
      });
    }
  }
  if (error) {
    console.error("error in deleteItem: ", error);
    return dataDispatch({
      type: DataActions.SET_ERROR,
      payload: "Oh Snap! We were unable to delete this item.",
    });
  }
};

const getExpenseData = async (userId, dataDispatch) => {
  const query = gql`
    query ExpenseData {
      user_data(where: {_and: {route: {_eq: "expense"}, userId: {_eq: "${userId}"}}}) {
          id
          date
          route
          name
          amount
          description
        }
      }
      `;
  const { data, error } = await nhost.graphql.request(query);
  if (data) {
    return dataDispatch({
      type: DataActions.SET_EXPENSE_DATA,
      payload: data?.user_data,
    });
  }
  if (error) {
    console.error("error in getExpenseData: ", error);
    return dataDispatch({
      type: DataActions.SET_ERROR,
      payload: "Oh Snap! We were unable to fetch data.",
    });
  }
};

const getIncomeData = async (userId, dataDispatch) => {
  const query = gql`
    query IncomeData {
      user_data(where: {_and: {route: {_eq: "income"}, userId: {_eq: "${userId}"}}}) {
          id
          date
          route
          name
          amount
          description
        }
      }
      `;
  const { data, error } = await nhost.graphql.request(query);
  if (data) {
    return dataDispatch({
      type: DataActions.SET_INCOME_DATA,
      payload: data?.user_data,
    });
  }
  if (error) {
    console.error("error in getIncomeData: ", error);
    return dataDispatch({
      type: DataActions.SET_ERROR,
      payload: "Oh Snap! We were unable to fetch data.",
    });
  }
};

const updateItem = async (item, userId, dataDispatch) => {
  const query = gql`
  mutation UpdateItem {
    update_user_data(where: {_and: {
        id: {_eq: "${item?.id}"},
        userId: {_eq: "${userId}"}}
        },
        _set: {
            amount: "${item?.amount}",
            date: "${formatedDate(item?.date, "YYYY-MM-DD")}", 
            description: "${item?.description}", 
            name: "${item?.name}", 
            route: "${item?.route}"
        }) {
        affected_rows
    }
  }`;
  dataDispatch({ type: DataActions.SET_LOADER, payload: true });
  const { data, error } = await nhost.graphql.request(query);
  if (data) {
    if (data?.update_user_data?.affected_rows) {
      return dataDispatch({
        type: DataActions.UPDATE_INCOME_EXPENSE,
        payload: item,
      });
    } else {
      return dataDispatch({
        type: DataActions.SET_ERROR,
        payload: "Oops! We were unable to find such item for updation.",
      });
    }
  }
  if (error) {
    console.error("error in updateItem: ", error);
    return dataDispatch({
      type: DataActions.SET_ERROR,
      payload: "Oh Snap! We were unable to update this item.",
    });
  }
};

export { addNewItem, deleteItem, getExpenseData, getIncomeData, updateItem };
