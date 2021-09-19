import React, { useContext, useState } from "react";
import Image from "next/image";
import Edit from "../icons/Edit";
import ProfileIcon from "../icons/User";
import { useRouter } from "next/router";

import { StoreContext } from "../../pages/_app";

const Profile = () => {
  const {
    USER: { user },
  } = useContext(StoreContext);
  const router = useRouter();

  async function updateProfileImage(e) {
    try {
      if (!e.target.files[0]) return alert("No Image selected");
      alert("Be patient! It will take few seconds.");

      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("id", user._id);

      const response = await (
        await fetch(process.env.API_URI_IMAGE_UPLOAD, {
          method: "POST",
          body: data,
        })
      ).json();

      if (!response.success) return alert(response.message);
      alert(response.message);
      router.reload();
    } catch (err) {
      alert("There is some server error, try again later.");
    }
  }

  return (
    <article className="flex flex-col w-full p-8 items-center select-none">
      <div className="relative w-28 h-28 sm:h-40 sm:w-40 lg:w-48 lg:h-48">
        <div className="relative text-cblack-5 dark:text-cwhite-darker  w-full h-full rounded-full overflow-hidden p-5 sm:p-8 lg:p-11 bg-cwhite-light dark:bg-cblack-3">
          {user.image ? (
            <Image
              src={user.image}
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <ProfileIcon />
          )}
        </div>
        <label
          htmlFor="file"
          className="
        absolute cursor-pointer bg-cwhite-medium dark:bg-cblack-5 p-2 
        rounded-full md:h-11 md:w-11 h-8 wi-8 top-0 right-0
        sm:h-10 sm:w-10
        "
        >
          <Edit />
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/png, image/jpeg"
          className="w-0 h-0"
          required
          onChange={updateProfileImage}
        />
      </div>
      <h1 className="font-medium text-4xl pt-3 text-center">{user.name}</h1>
      <p className="text-cblack-5 italic dark:text-cwhite-darker">
        {user.username}
      </p>
      <p className="text-cblack-3 pt-3 dark:text-cwhite-medium">
        {user.description && user.description.length
          ? user.description
          : "You dont have any bio"}
      </p>
    </article>
  );
};

export default Profile;
