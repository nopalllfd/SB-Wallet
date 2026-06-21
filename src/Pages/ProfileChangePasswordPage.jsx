import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { Button } from '../components/Button';
import { InputGroup } from '../components/Input';
import HeaderSection from '../Fragments/Profile/HeaderSection';
import { DashboardLayout } from '../Layouts/DashboardLayout';
import { changePassword, logoutUser } from '../redux/slice/authSlice';

function ProfileChangePasswordPage() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    if (data.existingPassword === data.newPassword) {
      toast.error('Password baru harus berbeda dari password lama');
      return;
    }

    try {
      await dispatch(
        changePassword({
          old_password: data.existingPassword,
          new_password: data.newPassword,
        }),
      ).unwrap();

      toast.success('Password berhasil diubah');
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      toast.error(error || 'Password gagal diubah');
    }
  };

  return (
    <DashboardLayout>
      <section className="max-md:py-6 px-6 flex flex-col gap-8">
        <HeaderSection />

        <section className="md:bg-white border border-gray-200 rounded-md p-6 md:p-10">
          <div className="mb-6">
            <h1 className="font-semibold text-gray-900">Change Password</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-2xl">
            <InputGroup
              type="password"
              id="existingPassword"
              {...register('existingPassword', {
                required: 'Password lama tidak boleh kosong',
              })}
              placeholder="Enter Your Existing Password"
              iconSrc="/assets/inputs/form/password.svg"
              iconAlt="password icon"
              eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
              eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
              eyelashIconAlt="eyelash icon"
              isPassword={true}
            >
              Existing Password
            </InputGroup>

            {errors.existingPassword ? <p className="text-red-500">{errors.existingPassword.message}</p> : <p />}

            <InputGroup
              type="password"
              id="newPassword"
              {...register('newPassword', {
                required: 'Password baru tidak boleh kosong',
                minLength: {
                  value: 8,
                  message: 'Minimal 8 karakter',
                },
              })}
              placeholder="Enter Your New Password"
              iconSrc="/assets/inputs/form/password.svg"
              iconAlt="password icon"
              eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
              eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
              eyelashIconAlt="eyelash icon"
              isPassword={true}
            >
              New Password
            </InputGroup>

            {errors.newPassword ? <p className="text-red-500">{errors.newPassword.message}</p> : <p />}

            <InputGroup
              type="password"
              id="confirmNewPassword"
              {...register('confirmNewPassword', {
                required: 'Confirm password tidak boleh kosong',
                validate: (value) => value === getValues('newPassword') || 'Confirm password tidak cocok',
              })}
              placeholder="Re-Type Your New Password"
              iconSrc="/assets/inputs/form/password.svg"
              iconAlt="confirm password icon"
              eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
              eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
              eyelashIconAlt="eyelash icon"
              isPassword={true}
            >
              Confirm New Password
            </InputGroup>

            {errors.confirmNewPassword ? <p className="text-red-500">{errors.confirmNewPassword.message}</p> : <p />}

            <div className="mt-2">
              <Button buttonColor="bg-blue-600" buttonTextColor="text-white" className="rounded-md">
                Submit
              </Button>
            </div>
          </form>
        </section>
      </section>
    </DashboardLayout>
  );
}

export default ProfileChangePasswordPage;
