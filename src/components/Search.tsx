import SearchIcon from '@mui/icons-material/Search';
import "../static/styles/search.css"
import { useEffect, useRef } from 'react';



const Search = () => {

  const autoCompletedRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions : {
      fields: ["address_components", "adr_address", "formatted_address", "name", "photos", "url"]
    }
  }

  useEffect(() => {
      autoCompletedRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      )
  }, [])

 

  return (
    <div className='search-container'>
        <label>enter address: </label>
        <input ref={inputRef} />
        <SearchIcon id="search-icon"/>
    </div>
  )
}
export default Search