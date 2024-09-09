"use client";

import React from "react";
import { useSession } from "next-auth/react";
import UserInfo from "@/app/_components/UserInfo";
import { Minus } from "lucide-react";

const ProfileSettings = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div className=" flex justify-center p-5 m-5s">
        <div>
          <div>
            <h1 className=" font-bold mb-10"> Your current settings</h1>
            <UserInfo data={session} />
          </div>

          <form className="space-y-4 mt-8">
            <div>
              <h1 className="font-bold mb-3"> Edit your profile</h1>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={session?.user?.name}
                className="mt-1 block w-full rounded-lg p-2"
              />
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Picture
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="profile picture"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </span>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 rounded-lg  text-sm  font-medium text-black"
                >
                  Change
                </button>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark-green hover:bg-light-green "
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
