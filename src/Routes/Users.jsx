import React, { useState, useRef } from "react";
import Loading from "../components/Loading";
import UsersContainer from "../components/UsersContainer";

const Users = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef("");
  const EndPoint = "https://api.github.com/users";

  async function findUser() {
    setLoading(true);
    if (searchRef.current.value !== "") {
      const res = await fetch(EndPoint + "/" + searchRef.current.value);
      const data = await res.json();
      setUser(data);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="flex justify-center h-11 my-5 items-center">
        <input
          placeholder="Search github username"
          ref={searchRef}
          type="text"
          className="h-full md:w-1/3 outline-none text-gray-800 px-2 
          font-semibold text-lg w-2/3"
        />
        <button
          onClick={findUser}
          className="bg-teal-500 font-semibold px-4 h-full font-[Poppins]"
        >
          Search
        </button>
      </div>
      <div>{loading ? <Loading /> : <UsersContainer users={user ? [user] : []} />}</div>
    </div>
  );
};

export default Users;
