import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/slice/registerSlice';
import { toast } from 'react-hot-toast';

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const { users } = useSelector((state) => state.register);
  const dispatch = useDispatch();

  console.log(users);
  const handleFormSubmit = async (data) => {
    console.log(users);
    const trimmedEmail = data.email.trim();
    const existingValue = users?.some((obj) => obj.email == trimmedEmail);
    console.log(existingValue);
    if (existingValue) {
      toast.error('Email ini sudah digunakan');
      setError('email', {
        type: 'manual',
        message: 'Email ini sudah digunakan',
      });
      return;
    }

    const userRegister = {
      email: trimmedEmail,
      password: data.password,
    };
    try {
      await dispatch(registerUser(userRegister)).unwrap();
      toast.success('Register berhasil');
      navigate('/auth/login');
    } catch (error) {
      toast.error(error?.message || 'Register gagal');
    }
  };
  return (
    <>
      <section className="input-group ">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleFormSubmit)} action="">
          <InputGroup
            id="email"
            type="email"
            placeholder="Enter Your Email"
            iconSrc="/assets/inputs/form/email.svg"
            iconAlt="email icon"
            {...register('email', {
              required: 'email tidak boleh kosong',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Format email salah',
              },
            })}
          >
            Email
          </InputGroup>
          {errors.email ? <p className={'text-red-500'}>{errors.email.message}</p> : <p></p>}
          <InputGroup
            id="password"
            type="password"
            placeholder="Enter Your Password"
            iconSrc="/assets/inputs/form/password.svg"
            iconAlt="password icon"
            {...register('password', {
              required: 'password tidak boleh kosong',
              minLength: {
                value: 7,
                message: 'Minimal 7 karakter',
              },
            })}
            eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
            eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
            eyelashIconAlt="eyelash icon"
            isPassword={true}
          >
            Password
          </InputGroup>
          {errors.password ? <p className={'text-red-500'}>{errors.password.message}</p> : <p></p>}
          <InputGroup
            type="password"
            id="confirm-password"
            {...register('confirmPassword', {
              required: 'confirm password tidak boleh kosong',
              validate: (val) => val === getValues('password') || 'confirm password tidak cocok',
            })}
            placeholder="Enter Confirm Password"
            iconSrc="/assets/inputs/form/password.svg"
            iconAlt="confirm-password icon"
            eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
            eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
            eyelashIconAlt="eyelash icon"
            isPassword={true}
          >
            Confirm Password
          </InputGroup>
          {errors.confirmPassword ? <p className={'text-red-500'}>{errors.confirmPassword.message}</p> : <p></p>}
          <section className="submit-button">
            <Button buttonColor={'bg-blue-600'} buttonTextColor={'text-white'} className={'rounded-xl'}>
              Register
            </Button>
          </section>
        </form>
      </section>
    </>
  );
}

export default RegisterForm;
