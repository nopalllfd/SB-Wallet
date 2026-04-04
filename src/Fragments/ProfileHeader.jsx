import { useState } from 'react';

function ProfileHeader() {
  const [email, _] = useState(() => {
    const data = JSON.parse(localStorage.getItem('users'));
    return data?.email || 'Pengguna';
  });
  return (
    <div className="flex text-white gap-2 items-center">
      <img
        src="assets/profile.svg"
        alt="profile icon"
        className="w-10"
      />
      <div className="">
        <div className="greetings text-ultralight text-sm">Hello,</div>
        <div className="greetings text-normal text-md">{email}</div>
      </div>
    </div>
  );
}

export default ProfileHeader;
