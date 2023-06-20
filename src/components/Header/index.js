// import {Component} from 'react'

// import Cookies from 'js-cookie'

// import {FaSearch} from 'react-icons/fa'
// import {GiHamburgerMenu} from 'react-icons/gi'
// import {ImCross} from 'react-icons/im'

// import {Link, withRouter} from 'react-router-dom'

// import './index.css'

// class Header extends Component {
//   state = {
//     showIcon: false,
//     showsearch: false,
//   }

//   onclickHamIcon = () => {
//     this.setState(prevstate => ({
//       showIcon: !prevstate.showIcon,
//     }))
//   }

//   onclickcloseButton = () => {
//     this.setState(prevstate => ({
//       showIcon: !prevstate.showIcon,
//     }))
//   }

//   onclickSearchTab = () => {
//     this.setState(prevstate => ({
//       showIcon: !prevstate.showsearch,
//     }))
//   }

//   onClickLogout = () => {
//     const {history} = this.props
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }

//   onChangeSearchInput = e => {
//     const {changesearchInput} = this.props
//     changesearchInput(e.target.value)
//   }

//   onclicksearchIcon = () => {
//     const {entersearchinput} = this.props
//     entersearchinput()
//   }

//   render() {
//     const {showIcon, showsearch} = this.state
//     const {searchInput} = this.props

//     return (
//       <>
//         <nav className="logo-header-container">
//           <div className="sub-cont">
//             <ul className="logo-cont">
//               <Link to="/">
//                 <li>
//                   <img
//                     src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662634898/InstaShare/Insta_share_logo_pm2btx.png"
//                     alt="website logo"
//                     className="image-logo"
//                   />
//                 </li>
//               </Link>
//               <li>
//                 <h1 className="nav-heading">Insta Share</h1>
//               </li>
//             </ul>
//             <button
//               className="ham-button"
//               type="button"
//               onClick={this.onclickHamIcon}
//               data-testid="hamburgerMenuIcon"
//             >
//               <GiHamburgerMenu className="icon" />
//             </button>

//             <div className="desk-tab-icons">
//               <div className="desk-search-cont">
//                 <input
//                   className="input-search"
//                   onChange={this.onChangeSearchInput}
//                   value={searchInput}
//                   type="search"
//                   placeholder="search caption"
//                 />
//                 <button
//                   className="search-button"
//                   type="button"
//                   onClick={this.onclicksearchIcon}
//                   data-testid="searchicon"
//                 >
//                   <FaSearch className="search-icon" />
//                 </button>
//               </div>
//               <ul className="nav-tabs-con">
//                 <Link to="/">
//                   <li>
//                     <p className="list-item">Home</p>
//                   </li>
//                 </Link>
//                 <Link to="my-profile" className="link">
//                   <li>
//                     <p className="list-item">Profile</p>
//                   </li>
//                 </Link>

//                 <li>
//                   <button
//                     type="button"
//                     className="logout-button"
//                     onClick={this.onClickLogout}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//         {showIcon && (
//           <ul className="tabs-con">
//             <Link to="/" className="link">
//               <li>
//                 <p className="list-item">Home</p>
//               </li>
//             </Link>
//             <li>
//               <button
//                 type="button"
//                 className="search-tab-button"
//                 onClick={this.onclickSearchTab}
//               >
//                 <p>search</p>
//               </button>
//             </li>
//             <Link to="my-profile" className="link">
//               <li>
//                 <p className="list-item">profile</p>
//               </li>
//             </Link>
//             <li>
//               <button
//                 type="button"
//                 className="logout-button"
//                 onClick={this.onClickLogout}
//               >
//                 Logout
//               </button>
//             </li>

//             <button
//               type="button"
//               className="ham-button"
//               onClick={this.onclickcloseButton}
//               data-testid="closeIcon"
//             >
//               <ImCross className="close-icon" />
//             </button>
//           </ul>
//         )}
//         {showsearch && (
//           <div className="search-cont">
//             <input
//               type="search"
//               onChange={this.onChangeSearchInput}
//               value={searchInput}
//             />

//             <button
//               className="search-button"
//               type="button"
//               onClick={this.onclicksearchIcon}
//               data-testid="searchicon"
//             >
//               <FaSearch className="search-icon" />
//             </button>
//           </div>
//         )}
//       </>
//     )
//   }
// }

// export default withRouter(Header)

import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'
import {IoCloseCircle} from 'react-icons/io5'
import Cookies from 'js-cookie'
import SearchContext from '../../Context/SearchContext'

import './index.css'

const Header = props => {
  const {match} = props
  const {path} = match

  const selectedPart = 'blue-color-for-selected'
  return (
    <>
      <SearchContext.Consumer>
        {value => {
          const {
            showSearchComponent,
            changeStatusOfSearchComponent,
            updateSearchInput,
            searchInputValue,
            searchComponentShowStatusChange,
            resetSearchInput,
            showNavItemsUnderHamburger,
            showOptionsSmall,
            closeOptionsSmall,
            searchComponentOpenSmall,
          } = value

          const searchComponentStatusChange = () => {
            changeStatusOfSearchComponent()
          }

          const openSearchComponentSmall = () => {
            searchComponentOpenSmall()
          }

          const intakeSearchInputText = event => {
            updateSearchInput(event.target.value)
          }

          const routingToHomeOrProfile = () => {
            searchComponentShowStatusChange()
          }

          const hamburgerClicked = () => {
            showOptionsSmall()
          }

          const optionsClose = () => {
            closeOptionsSmall()
          }

          const logout = () => {
            const {history} = props
            resetSearchInput()
            searchComponentShowStatusChange()
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          return (
            <div>
              <nav className="header-nav-container">
                <Link
                  to="/"
                  onClick={routingToHomeOrProfile}
                  className="header-logo-link-container"
                >
                  <div className="header-website-logo-title-container">
                    <img
                      className="header-logo-image"
                      src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662634898/InstaShare/Insta_share_logo_pm2btx.png"
                      alt="website logo"
                    />
                    <h1 className="header-title">Insta Share</h1>
                  </div>
                </Link>

                <ul className="nav-items-large-display">
                  <li className="search-input-and-button-container">
                    <input
                      className="search-input-field-header"
                      type="search"
                      placeholder="Search Caption"
                      onChange={intakeSearchInputText}
                      value={searchInputValue}
                    />
                    <button
                      className="search-button-header-large"
                      type="button"
                      testid="searchIcon"
                      onClick={searchComponentStatusChange}
                    >
                      <FaSearch />
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={routingToHomeOrProfile}
                      className="options-header-large"
                    >
                      <p
                        className={`option-header-text-large ${
                          path === '/' && showSearchComponent === false
                            ? selectedPart
                            : null
                        }`}
                      >
                        Home
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-profile"
                      onClick={routingToHomeOrProfile}
                      className="options-header-large"
                    >
                      <p
                        className={`option-header-text-large ${
                          path === '/my-profile' &&
                          showSearchComponent === false
                            ? selectedPart
                            : null
                        }`}
                      >
                        Profile
                      </p>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={logout}
                      className="logout-button-large-header"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
                <div className="nav-items-small-display">
                  <button
                    type="button"
                    onClick={hamburgerClicked}
                    className="small-nav-hamburger"
                  >
                    <GiHamburgerMenu />
                  </button>
                </div>
              </nav>
              {showNavItemsUnderHamburger && (
                <ul className="small-display-hamburger-options">
                  <li>
                    <Link
                      to="/"
                      onClick={routingToHomeOrProfile}
                      className="each-option-under-hamburger"
                    >
                      <p
                        className={
                          path === '/' && showSearchComponent === false
                            ? selectedPart
                            : null
                        }
                      >
                        Home
                      </p>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={openSearchComponentSmall}
                      className={`hamburger-search-button ${
                        showSearchComponent ? selectedPart : null
                      } `}
                    >
                      Search
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/my-profile"
                      onClick={routingToHomeOrProfile}
                      className="each-option-under-hamburger"
                    >
                      <p
                        className={
                          path === '/my-profile' &&
                          showSearchComponent === false
                            ? selectedPart
                            : null
                        }
                      >
                        Profile
                      </p>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={logout}
                      className="hamburger-logout-option"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={optionsClose}
                      className="close-circle"
                    >
                      <IoCloseCircle />
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )
        }}
      </SearchContext.Consumer>
    </>
  )
}

export default withRouter(Header)
