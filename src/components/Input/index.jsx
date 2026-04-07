import { forwardRef } from 'react';
import { Label } from './Label';
import { Field } from './field';

export const InputGroup = forwardRef(({ name, children, ...props }, ref) => {
  return (
    <div className="email-input flex flex-col justify-start">
      <Label name={name}>{children}</Label>
      <Field ref={ref} name={name} {...props} />
    </div>
  );
});
