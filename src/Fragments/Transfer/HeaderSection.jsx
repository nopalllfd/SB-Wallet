import { InputGroup } from '../../components/Input';
import { Field } from '../../components/Input/field';

function HeaderSection(props) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:justify-between">
      <div>
        <h1 className="font-semibold text-xl">{!props.userId ? 'Find People' : 'People Informations'}</h1>
      </div>
      {!props.userId ? (
        <div className="md:w-1/3">
          <Field
            name={'search'}
            iconSrc={'/assets/utils/search.svg'}
            iconAlt={'search icon'}
            className={'text-sm font-normal'}
            placeholder={'Enter Number or Full Name'}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default HeaderSection;
