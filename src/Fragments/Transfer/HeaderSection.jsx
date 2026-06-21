import { Field } from '../../components/Input/field';

// MUI ICON
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function HeaderSection(props) {
  const isPeopleList = !props.userId;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      {/* TITLE */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg text-blue-700 shrink-0">
          {isPeopleList ? <PeopleIcon fontSize="small" /> : <InfoOutlinedIcon fontSize="small" />}
        </div>

        <h1 className="font-semibold text-base md:text-xl text-gray-900 leading-tight">{isPeopleList ? 'Find People' : 'People Information'}</h1>
      </div>

      {/* SEARCH */}
      {isPeopleList && (
        <div className="w-full md:w-1/3">
          <div className="relative w-full">
            {/* ICON */}
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />

            {/* INPUT */}
            <Field
              name="search"
              value={props.searchQuery}
              placeholder="Search by number or name"
              className="
                w-full
                pl-10 pr-3
                py-2
                text-sm
                rounded-lg
                border border-gray-200
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-100
                transition-all
              "
              onChange={(e) => props.onSearchChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderSection;
