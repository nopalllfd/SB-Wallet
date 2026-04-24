import { Field } from '../../components/Input/field';

function HeaderSection() {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:justify-between">
      <div>
        <h1 className="font-semibold text-xl text-gray-900">Cari Riwayat</h1>
      </div>
      <div className="md:w-1/3">
        <Field
          name={'search'}
          iconSrc={'assets/utils/search.svg'}
          iconAlt={'search icon'}
          className={'text-sm font-normal flex-row-reverse'}
          placeholder={'Cari nomor atau nama lengkap'}
        />
      </div>
    </div>
  );
}

export default HeaderSection;
