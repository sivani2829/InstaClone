import React from 'react'

const SearchContext = React.createContext({
  searchInputValue: '',
  showSearchComponent: false,
  searchDataFetchStatus: 'INITIAL',
  usersPosts: [],
  showNavItemsUnderHamburger: false,
  changeStatusOfSearchComponent: () => {},
  updateSearchInput: () => {},
  searchComponentShowStatusChange: () => {},
  resetSearchInput: () => {},
  showOptionsSmall: () => {},
  closeOptionsSmall: () => {},
  searchComponentOpenSmall: () => {},
})

export default SearchContext
