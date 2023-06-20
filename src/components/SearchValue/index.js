import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import SearchContext from '../../Context/SearchContext'
import Posts from '../Posts'
import WentWrongPage from '../WentWrongPage'
import Failure from '../Failure'

import './index.css'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SearchValue = () => (
  <SearchContext.Consumer>
    {value => {
      const {
        searchDataFetchStatus,
        usersPosts,
        searchInputValue,
        updateSearchInput,
        changeStatusOfSearchComponent,
      } = value

      const intakeSearchInputText = event => {
        updateSearchInput(event.target.value)
      }

      const searchComponentStatusChange = () => {
        changeStatusOfSearchComponent()
      }

      switch (searchDataFetchStatus) {
        case dataFetchStatusConstants.initial:
          return (
            <div className="initial-search-component">
              <div className="small-device-search-input-component">
                <input
                  className="search-input-field-search-component"
                  type="search"
                  placeholder="Search Caption"
                  onChange={intakeSearchInputText}
                  value={searchInputValue}
                />
                <button
                  className="search-button-search-component"
                  type="button"
                  testid="searchIcon"
                  onClick={searchComponentStatusChange}
                >
                  <FaSearch />
                </button>
              </div>

              <div className="initial-search-components-small-container">
                <img
                  className="initial-search-component-image"
                  src="https://res.cloudinary.com/duqlsmi22/image/upload/v1645374873/Frame_1473_hqyc5m.png"
                  alt="search-small-component"
                />

                <p className="initial-search-text">
                  Search Results will be appear here
                </p>
              </div>

              <div className="large-device-component">
                <Failure retryFunction={searchComponentStatusChange} />
              </div>
            </div>
          )
        case dataFetchStatusConstants.loading:
          return (
            <div className="loading-search-component">
              <div className="small-device-search-input-component">
                <input
                  className="search-input-field-search-component"
                  type="search"
                  placeholder="Search Caption"
                  onChange={intakeSearchInputText}
                  value={searchInputValue}
                />
                <button
                  className="search-button-search-component"
                  type="button"
                  testid="searchIcon"
                  onClick={searchComponentStatusChange}
                >
                  <FaSearch />
                </button>
              </div>
              <div className="loader-component-container">
                <div
                  className="loader-container"
                  testid="loader"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Loader
                    type="TailSpin"
                    color="#4094EF"
                    height={50}
                    width={50}
                  />
                </div>
              </div>
            </div>
          )
        case dataFetchStatusConstants.success:
          return (
            <div className="search-component-success-container">
              <div className="small-device-search-input-component">
                <input
                  className="search-input-field-search-component"
                  type="search"
                  placeholder="Search Caption"
                  onChange={intakeSearchInputText}
                  value={searchInputValue}
                />
                <button
                  className="search-button-search-component"
                  type="button"
                  data-testid="searchIcon"
                  onClick={searchComponentStatusChange}
                >
                  <FaSearch />
                </button>
              </div>
              <div className="search-component-with-success-results">
                {/* for large device */}
                {usersPosts.length === 0 ? (
                  <>
                    <img
                      className="no-posts-on-search-image"
                      src="https://res.cloudinary.com/dmdr9a99a/image/upload/v1685959989/Group_epcwfo.png"
                      alt="search not found"
                    />
                    <h1 className="search-not-found">Search Not Found</h1>
                    <p className="try-another-search-text ">
                      Try different keyword or search again
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-search-results">Search Results</h1>
                    <ul className="user-posts-container">
                      {usersPosts.map(eachPost => (
                        <Posts key={eachPost.post_id} userPost={eachPost} />
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )
        case dataFetchStatusConstants.failure:
          return (
            <div className="search-component-failure">
              <WentWrongPage retryFunction={searchComponentStatusChange} />
            </div>
          )
        default:
          return null
      }
    }}
  </SearchContext.Consumer>
)

export default withRouter(SearchValue)
