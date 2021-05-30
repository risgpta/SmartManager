import React, {createContext, useState, useEffect} from 'react';

export const UtilsContext = createContext();

export const UtilsContextProvider = props => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userTaskId, setUserTaskId] = useState(null);
  const [userTasks, setUserTasks] = useState([]);

  const [errorData, setErrorData] = useState(null);

  return (
    <UtilsContext.Provider
      value={{
        userData,
        setUserData,
        userId,
        setUserId,
        userTaskId,
        setUserTaskId,
        userTasks,
        setUserTasks,
        errorData,
        setErrorData,
      }}>
      {props.children}
    </UtilsContext.Provider>
  );
};
