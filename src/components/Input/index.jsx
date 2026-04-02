import { Label } from './Label';
import { Field } from './field';

export const InputGroup = ({ name, children, ...props }) => {
  return (
    <div className="email-input flex flex-col justify-start">
      <Label name={name}>{children}</Label>
      <Field {...props} />
    </div>
  );
};
