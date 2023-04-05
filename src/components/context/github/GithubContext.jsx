import { createContext, useState } from "react";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const url = import.meta.env.VITE_GITHUB_URL;

  const [users, setUsers] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const [user, setUser] = useState({});

  const fetchUsers = async () => {
    await fetch(`${url}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  const searchUsers = async (text) => {
    await fetch(`${url}/search/users?q=${text}`)
      .then((response) => response.json())
      .then((data) => setUsers(data.items));
  };

  const getUser = async (login) => {
    await fetch(`${url}/users/${login}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  const clearUsers = () => setUsers([]);

  const getUserRepos = async (login) => {
    await fetch(`${url}/users/${login}/repos`)
      .then((response) => response.json())
      .then((repos) => setUserRepos(repos));
  };

  return (
    <GithubContext.Provider
      value={{
        users,
        user,
        userRepos,
        fetchUsers,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
