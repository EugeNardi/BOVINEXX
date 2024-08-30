import React from 'react'

const Search = () => {
  return (
    <>

<form className='search-box-container'>
            <label htmlFor='search-image-query'><span className='label-search'>📷</span></label>
            <input 
                className='input-search' 
                type='search' 
                name='search-image-query' 
                placeholder='Search Images...'
                onChange={handleChange}
            />
            <FontAwesomeIcon className='search-icon'  size="1x"/>
        </form>
    </>
  )
}

export default Search