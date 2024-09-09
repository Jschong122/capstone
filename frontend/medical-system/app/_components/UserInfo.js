"use client";

import React from "react";

const UserInfo = (data) => {
  return (
    <div>
      <p>Name: {data.data?.user?.name}</p>
      <p>Email: {data.data?.user?.email}</p>
      <p>id: {data.data?.user?.id}</p>
    </div>
  );
};

export default UserInfo;
