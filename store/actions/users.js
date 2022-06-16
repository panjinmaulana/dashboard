export const getUsers = () => {
  return async (dispatch) => {
    const res = await fetch('https://delman-fe-api.fly.dev/users');
    const data = await res.json();

    dispatch({
      type: 'GET_USERS',
      payload: data
    });
  };
};