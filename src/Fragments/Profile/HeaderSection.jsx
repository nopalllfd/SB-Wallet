import { InputGroup } from '../../components/Input';
import { Field } from '../../components/Input/field';

function HeaderSection() {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:justify-between ">
      <div>
        <h1 className="font-semibold text-xl">Profile</h1>
      </div>
    </div>
  );
}

export default HeaderSection;
