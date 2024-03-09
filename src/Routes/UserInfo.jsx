import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Events from "../components/Events";
import Loading from "../components/Loading";
import Repo from "../components/Repo";
import Tabs from "../components/Tabs";
import UsersContainer from "../components/UsersContainer";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [type, setType] = useState("repos");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  let EndPoint = "https://api.github.com/users";
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function getUserInfo() {
    setLoading(true);
    const res = await fetch(EndPoint + pathname);
    const data = await res.json();
    setUser(data);
    setLoading(false);
  }

  async function getUserData() {
    setUsers([]);
    setLoading(true);
    const res = await fetch(EndPoint + pathname + `/${type}`);
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    getUserInfo();
    getUserData();
  }, [pathname, type]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200"
      >
        BACK
      </button>
      {user && (
        <div className="flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10">
          <img
            src={user.avatar_url}
            className="w-[350px] border-4 border-teal-400 md:mx-0 mx-auto"
          />
          <div className="text-lg leading-10 px-3">
            <h1 className="text-3xl pb-4">{user.name}</h1>
            <h1>
              <span className="text-teal-400">Login_name</span> : {user.login}
            </h1>
            <h1>
              <span className="text-teal-400">followers : </span>
              {user.followers}
            </h1>
            <h1>
              <span className="text-teal-400">following : </span>
              {user.following}
            </h1>
            <h1>
              <span className="text-teal-400">public_repositories : </span>
              {user.public_repos}
            </h1>
            <h1>
              <span className="text-teal-400">Join : </span>
              {new Date(user.created_at).toLocaleDateString()}
            </h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 
                  font-semibold rounded cursor-pointer  px-4 py-1 bg-teal-600 my-3 tracking-wide"
            >
              Visit
            </a>
          </div>
        </div>
      )}
      <div className="flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl ">
        <Tabs type={type} setType={setType} />
      </div>
      {loading && <Loading />}
      {type === "repos" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          {users && <Repo users={users} />}
        </div>
      )}
      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto ">
          {users && <Events data={users} />}
        </div>
      )}
      {type === "followers" && <UsersContainer users={users} />}
    </div>
  );
};

export default UserInfo;
