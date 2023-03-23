import React, { useEffect, useState } from "react";
import "./App.css";
import { CommonTable, CommonPagination } from "./components/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchUsers } from "./redux/slices/UserSlice";
import { AnyAction } from "redux";

function App() {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers(page) as unknown as AnyAction);
  }, [dispatch, page]);

  return (
    <React.Fragment>
      <h1>Click FullName or UserName to sort</h1>
      <CommonTable users={users} />
      <CommonPagination
        totalRecords={100}
        onPageChanged={(page) => {
          setPage(page);
        }}
      />
    </React.Fragment>
  );
}

export default App;
