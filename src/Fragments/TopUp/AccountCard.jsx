import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';
import { getProfile } from '../../redux/slice/userSlice';

// MUI ICON
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedIcon from '@mui/icons-material/Verified';

function AccountCard() {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <section className="w-full">
      <article className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 bg-white border border-gray-100 shadow-sm px-4 py-4 rounded-xl">

        <img
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
          src={getProfileImageSrc(user)}
          onError={(e) => (e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC)}
          alt="user image"
        />

        <div className="flex flex-col gap-2 w-full">

          <div className="flex items-center gap-2 text-gray-800">
            <PersonIcon fontSize="small" className="text-gray-500" />
            <p className="font-semibold">{profile?.fullname}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <PhoneIcon fontSize="small" />
            <p className="text-sm">{profile?.phone}</p>
          </div>

          <div className="flex items-center justify-between bg-blue-700 text-white px-3 py-1 rounded-lg w-full sm:w-fit">
            <VerifiedIcon fontSize="small" />
            <p className="text-xs ml-2">Verified</p>
          </div>

        </div>
      </article>
    </section>
  );
}

export default AccountCard;