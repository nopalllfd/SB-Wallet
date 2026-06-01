import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';
import { getProfile } from '../../redux/slice/userSlice';

function AccountCard() {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  console.log(profile);
  return (
    <section>
      <article className="flex gap-8 bg-gray-200 px-4 py-4 rounded-md">
        <img
          className="row-span-3 w-20"
          src={getProfileImageSrc(user)}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
          }}
          alt="user image"
        />
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-black">{profile?.fullname}</p>
          <p className="text-gray-500 font-normal">{profile?.phone}</p>
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
