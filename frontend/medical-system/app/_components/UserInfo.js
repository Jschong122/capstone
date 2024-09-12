"use client";

import React from "react";

const UserInfo = (data) => {
  return (
    <div className="flex flex-row">
      {data.data?.user?.imageUrl && (
        <img
          className="mr-5"
          src={data.data.user.imageUrl}
          alt={`${data.data.user.name}'s profile`}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}

      <div className="flex flex-col justify-center">
        <p className="block mb-2">Name: {data.data?.user?.name}</p>
        <p className="block mb-2">Email: {data.data?.user?.email}</p>
        <p className="block mb-2">id: {data.data?.user?.id}</p>
      </div>
    </div>
  );
};

export default UserInfo;
