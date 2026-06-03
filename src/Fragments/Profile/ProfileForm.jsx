import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '../../components/Button';
import { InputGroup } from '../../components/Input';

import { editProfile, getProfile } from '../../redux/slice/userSlice';

import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';

// 👇 tambah ini
import { updatePhoto, updateDisplayName } from '../../redux/slice/authSlice';

function ProfileForm() {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.user);
  const user = profile;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // fetch profile
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // fill form
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || user.fullname || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  }, [user, reset]);

  // handle file
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  // submit
  const onSubmitForm = async (data) => {
    try {
      const res = await dispatch(
        editProfile({
          fullname: data.fullName,
          phone: data.phone,
          photo: selectedPhoto,
        }),
      ).unwrap();

      // update auth state (NO getProfile lagi)
      if (res?.data?.photo) {
        dispatch(updatePhoto(res.data.photo));
      }

      dispatch(updateDisplayName(data.fullName));

      toast.success('Profil berhasil diperbarui');

      setIsEdit(false);
      setSelectedPhoto(null);
      setPreview(null);
    } catch (err) {
      toast.error(err?.message || 'Gagal memperbarui profil');
    }
  };

  return (
    <section className="flex flex-col gap-4">
      {/* PROFILE IMAGE */}
      <div className="profile-picture flex justify-between md:justify-start md:gap-3 items-center">
        <div className="relative group w-fit">
          <img
            className="rounded-md w-32 h-32 object-cover"
            src={preview || getProfileImageSrc(user)}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
            }}
            alt="profile"
          />

          {isEdit && (
            <>
              <label
                htmlFor="profile-photo"
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              >
                <img src="/assets/utils/edit.svg" alt="edit" className="w-5 h-5 mb-2 brightness-0 invert" />
                <span className="text-white text-sm font-medium">Upload Photo</span>
              </label>

              <input id="profile-photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </>
          )}
        </div>

        <div className="buttons flex flex-col gap-3">
          <Button
            type="button"
            onClick={() => setIsEdit(true)}
            buttonColor="bg-blue-700"
            buttonTextColor="text-white"
            className="rounded-md flex gap-3"
          >
            <img src="assets/utils/edit.svg" alt="edit icon" />
            Change Profile
          </Button>

          <Button
            type="button"
            border="border-2 border-red-500"
            buttonTextColor="text-red-500"
            className="rounded-md flex gap-2"
            buttonColor="bg-white"
          >
            <img src="assets/utils/trash-red-profile.svg" alt="delete photo profile icon" />
            Delete Profile
          </Button>
        </div>
      </div>

      <p className="text-gray-600 text-xs font-normal">The profile picture must be 512 x 512 pixels or less</p>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="input-group flex flex-col gap-6">
          <InputGroup
            {...register('fullName', {
              required: 'Nama lengkap wajib diisi',
            })}
            isDisabled={!isEdit}
            disabled={!isEdit}
            id="fullName"
            placeholder="Enter Your Fullname"
            iconSrc="/assets/utils/user.svg"
            iconAlt="user icon"
          >
            Full Name
          </InputGroup>

          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

          <InputGroup
            type="tel"
            isDisabled={!isEdit}
            disabled={!isEdit}
            {...register('phone', {
              pattern: {
                value: /^[0-9]+$/,
                message: 'Hanya boleh angka',
              },
              minLength: {
                value: 10,
                message: 'Minimal 10 digit',
              },
            })}
            id="phone"
            placeholder="Enter Your Number Phone"
            iconSrc="/assets/utils/phone.svg"
            iconAlt="phone icon"
          >
            Phone
          </InputGroup>

          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

          <InputGroup
            disabled
            isDisabled
            {...register('email')}
            id="email"
            placeholder="Enter Your Email"
            iconSrc="/assets/inputs/form/email.svg"
            iconAlt="email icon"
          >
            Email
          </InputGroup>
        </div>

        {/* LINKS */}
        <div className="mt-6 mb-6 flex flex-col gap-3">
          <div className="password flex justify-between">
            <h1>Password</h1>
            <h1 className="text-blue-700">
              <Link to="/profile/change/password">Change Password</Link>
            </h1>
          </div>

          <div className="pin flex justify-between">
            <h1>Pin</h1>
            <h1 className="text-blue-700">
              <Link to="/profile/change/pin">Change Pin</Link>
            </h1>
          </div>
        </div>

        {isEdit && (
          <Button type="submit" disabled={loading} buttonColor="bg-blue-700" buttonTextColor="text-white" className="rounded-md">
            {loading ? 'Saving...' : 'Submit'}
          </Button>
        )}
      </form>
    </section>
  );
}

export default ProfileForm;
