import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import SearchResult from './SearchResult';
import { useQuery } from 'react-query';
import { getItems } from '../services/itemsApi';

function Search() {
  const [query, setQuery] = useState('');
  const [isFocued, setIsFocused] = useState(false);
  function handleFoucs() {
    setIsFocused(true);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['item'],
    queryFn: getItems,
  });

  const filtered = data?.products.filter((el) =>
    el.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative sm:block">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search items..."
          onFocus={() => handleFoucs()}
          className=" w-40 rounded-lg  bg-slate-100 py-2 pl-9 pr-3 outline-1 transition-all duration-300 focus:w-72 focus:outline-none focus:ring focus:ring-yellowC focus:ring-offset-1 md:w-[300px] md:focus:w-[330px]"
        />
        <div className="absolute inset-y-0 flex items-center  pl-3 text-lg text-slate-300">
          <IoIosSearch />
        </div>
      </div>
      <div className="absolute bottom-[-40px] h-5 w-full">
        {isFocued && <SearchResult filtered={filtered} />}
      </div>
    </div>
  );
}

export default Search;
