import { Link } from 'react-router';
import { Button } from '../../components/Button';
import { InputGroup } from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateUser } from '../../redux/slice/userSlice';
import { useState } from 'react';
import { LoadingIndicator } from '../../components/application/loading-indicator/loading-indicator';

function ProfileForm() {
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmitForm = async (data) => {
    const newData = {
      ...data,
    };
    await dispatch(updateUser(newData)).unwrap();
    setIsEdit(false);
  };
  return (
    <section className="flex flex-col gap-4">
      <div className="profile-picture flex justify-between items-center">
        <img className="rounded-md" src="https://i.postimg.cc/K8wXZyh5/Rectangle-651.jpg" alt="" />
        <div className="buttons flex flex-col gap-3">
          <Button
            onClick={() => {
              setIsEdit(true);
            }}
            buttonColor="bg-blue-700"
            buttonTextColor="text-white"
            className="rounded-md flex gap-3"
          >
            <img src="assets/utils/edit.svg" alt="edit icon" />
            Change Profile
          </Button>
          <Button border="border-2 border-red-500" buttonTextColor="text-red-500" className="rounded-md flex gap-2" buttonColor="bg-white">
            <img src="assets/utils/trash-red-profile.svg" alt="delete photo profile icon" />
            Delete Profile
          </Button>
        </div>
      </div>
      <p className="text-gray-600 text-xs font-normal">The profile picture must be 512 x 512 pixels or less</p>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        action="
   "
      >
        <div className="input-group flex flex-col gap-6">
          <InputGroup
            {...register('fullName')}
            isDisabled={!isEdit}
            disabled={!isEdit}
            defaultValue={user.fullName}
            id="fullName"
            placeholder="Enter Your Fullname"
            iconSrc="/assets/utils/user.svg"
            iconAlt="user icon"
          >
            Full Name
          </InputGroup>
          <InputGroup
            type="tel"
            isDisabled={!isEdit}
            disabled={!isEdit}
            defaultValue={user.phone}
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
          <p className={`text-red-500 ${errors.phone ? 'block' : 'hidden'}`}>{errors.phone && errors.phone.message}</p>
          <InputGroup
            defaultValue={user.email}
            isDisabled={true}
            {...register('email', {
              required: 'Email tidak boleh kosong',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Format email salah',
              },
            })}
            id="email"
            disabled
            // className={'cursor-not-allowed'}
            placeholder="Enter Your Email"
            iconSrc="/assets/inputs/form/email.svg"
            iconAlt="email icon"
          >
            Email
          </InputGroup>
        </div>
        <div className="mt-6 mb-6 flex flex-col gap-3">
          <div className="password">
            <h1>Password</h1>
            <h1 className="text-blue-700">
              <Link>Change Password</Link>
            </h1>
          </div>
          <div className="pin">
            <h1>Pin</h1>
            <h1 className="text-blue-700">
              <Link>Change Pin</Link>
            </h1>
          </div>
        </div>
        {isEdit ? (
          <Button buttonColor="bg-blue-700" buttonTextColor="text-white" className="rounded-md">
            {loading ? <LoadingIndicator /> : 'Submit'}
          </Button>
        ) : (
          ''
        )}
      </form>
    </section>
  );
}

export default ProfileForm;
