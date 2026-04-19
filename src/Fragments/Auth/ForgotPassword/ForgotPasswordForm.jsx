import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { setForgotEmail } from '../../../redux/slice/userSlice';

function ForgotPasswordForm() {
  const { users } = useSelector((state) => state.register);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const navigate = useNavigate();
  const dispatch = useDispatch()
  console.log(users);
  const onSubmit = (data) => {
    const email = data.email.trim();
    const existingUser = users.find((user) => user.email == email);
    if (!existingUser) {
      setError('email', {
        type: 'manual',
        message: 'email did not found',
      });
      return;
    }
    dispatch(setForgotEmail(existingUser.email))
    navigate('/auth/forgot/password/change')
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <section className="input-group flex flex-col gap-4">
        <InputGroup
          {...register('email', {
            required: 'Email tidak boleh kosong',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Format email salah',
            },
          })}
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          iconSrc="/assets/inputs/form/email.svg"
          iconAlt="email icon"
        >
          Email
        </InputGroup>
        {errors.email ? <p className={'text-red-500'}>{errors.email.message}</p> : <p></p>}
      </section>
      <section className="submit-button">
        <Button buttonColor={'bg-blue-600'} buttonTextColor={'text-white'} className={'rounded-xl'}>
          Submit
        </Button>
      </section>
    </form>
  );
}

export default ForgotPasswordForm;
