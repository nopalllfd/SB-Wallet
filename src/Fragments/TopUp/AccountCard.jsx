import React from 'react';
import { useSelector } from 'react-redux';

function AccountCard() {
  const { user } = useSelector((state) => state.user);
  return (
    <section>
      <article className="flex gap-8 bg-gray-200 px-4 py-4 rounded-md">
        <img className="row-span-3 w-20" src="assets/users/Ghaluh.svg" alt="user image" />
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-black">{user.fullName}</p>
          <p className="text-gray-500 font-normal">{user.phone}</p>
          <div className="bg-blue-700 text-white flex px-2 w-full items-center gap-2 rounded-lg justify-between py-1">
            <img src="assets/utils/verified.svg" alt="verified icon" />
            <p className="text-xs">Verified</p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default AccountCard;
