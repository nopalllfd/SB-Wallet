import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import { Button } from '../../components/Button';
import { InputGroup } from '../../components/Input';

import { editProfile, getProfile } from '../../redux/slice/userSlice';
import { updatePhoto } from '../../redux/slice/authSlice';

import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';

function ProfileForm() {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);
  const user = profile;

  const { register, handleSubmit, reset } = useForm({ mode: 'onChange' });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || user.fullname || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  }, [user, reset]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setSelectedPhoto(null);
    setPreview(null);

    if (user) {
      reset({
        fullName: user.fullName || user.fullname || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  };

  const onSubmitForm = async (data) => {
    try {
      const res = await dispatch(
        editProfile({
          fullname: data.fullName,
          phone: data.phone,
          photo: selectedPhoto,
        }),
      ).unwrap();

      const updated = res?.data;

      if (updated?.photo) {
        dispatch(updatePhoto(updated.photo));
      }

      toast.success('Profil berhasil diperbarui');

      setIsEdit(false);
      setSelectedPhoto(null);
      setPreview(null);
    } catch (err) {
      toast.error(err?.message || 'Gagal memperbarui profil');
    }
  };

  return (
    <section className="flex flex-col gap-6">
      {/* IMAGE */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative group w-fit">
          <img
            className="rounded-xl w-28 h-28 md:w-32 md:h-32 object-cover"
            src={preview || getProfileImageSrc(user)}
            onError={(e) => (e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC)}
            alt="profile"
          />

          {isEdit && (
            <>
              <label
                htmlFor="profile-photo"
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <EditIcon className="text-white mb-1" />
                <span className="text-white text-sm">Upload</span>
              </label>

              <input id="profile-photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={() => setIsEdit(true)}
            buttonColor="bg-blue-700"
            buttonTextColor="text-white"
            className="rounded-lg flex items-center gap-2"
          >
            <EditIcon fontSize="small" />
            Edit Profile
          </Button>

          {isEdit && (
            <Button type="button" onClick={handleCancelEdit} buttonColor="bg-gray-200" buttonTextColor="text-gray-700" className="rounded-lg">
              Cancel
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500">Recommended size 512x512 px</p>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-5">
        <InputGroup {...register('fullName')} disabled={!isEdit} iconSrc={null} placeholder="Full Name">
          <div className="flex items-center gap-2">
            <PersonIcon fontSize="small" />
            Full Name
          </div>
        </InputGroup>

        <InputGroup {...register('phone')} disabled={!isEdit} iconSrc={null} placeholder="Phone">
          <div className="flex items-center gap-2">
            <PhoneIcon fontSize="small" />
            Phone
          </div>
        </InputGroup>

        <InputGroup {...register('email')} disabled iconSrc={null} placeholder="Email">
          <div className="flex items-center gap-2">
            <EmailIcon fontSize="small" />
            Email
          </div>
        </InputGroup>

        {isEdit && (
          <Button type="submit" disabled={loading} buttonColor="bg-blue-700" buttonTextColor="text-white" className="rounded-lg">
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </form>

      {/* LINKS */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <span>Password</span>
          <Link className="text-blue-700" to="/profile/change/password">
            Change
          </Link>
        </div>

        <div className="flex justify-between">
          <span>PIN</span>
          <Link className="text-blue-700" to="/profile/change/pin">
            Change
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProfileForm;
