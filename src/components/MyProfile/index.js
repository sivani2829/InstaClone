// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'

// import {BsGrid3X3} from 'react-icons/bs'
// import {BiCamera} from 'react-icons/bi'

// import './index.css'

// import Header from '../Header'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// class MyProfile extends Component {
//   state = {
//     apiStatus: apiStatusConstants.initial,
//     myProfileData: [],
//   }

//   componentDidMount() {
//     this.getMyProfileDetails()
//   }

//   getMyProfileDetails = async () => {
//     this.setState({apiStatus: apiStatusConstants.inProgress})

//     // const {match} = this.props
//     // const {params} = match
//     // const {userId} = params

//     const jwtToken = Cookies.get('jwt_token')

//     const myProfileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
//     const options = {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       method: 'GET',
//     }

//     const response = await fetch(myProfileUrl, options)

//     if (response.ok) {
//       const data = await response.json()
//       console.log(data)

//       const formattedData = {
//         followersCount: data.profile.followers_count,
//         followingCount: data.profile.following_count,
//         id: data.profile.id,
//         posts: data.profile.posts,
//         postsCount: data.profile.posts_count,
//         profilePic: data.profile.profile_pic,
//         stories: data.profile.stories,
//         userBio: data.profile.user_bio,
//         userId: data.profile.user_id,
//         userName: data.profile.user_name,
//       }

//       this.setState({
//         myProfileData: formattedData,
//         apiStatus: apiStatusConstants.success,
//       })
//     }
//   }

//   renderLoadingView = () => (
//     <div className="loading-view-container">
//       <div className="loader-container">
//         <Loader
//           type="TailSpin"
//           color="#4094EF"
//           height={50}
//           width={50}
//           data-testid="loader"
//         />
//       </div>
//     </div>
//   )

//   onClickTryAgainButton = () => {
//     this.getUserProfileDetails()
//   }

//   renderFailureView = () => (
//     <div className="loading-view-container">
//       <img
//         src="https://res.cloudinary.com/dmdr9a99a/image/upload/v1685029149/Group_7522_1_pjl4iz.png"
//         alt="failure view"
//         className="failure-view-image"
//       />
//       <h1 className="failure-view-heading">
//         Something went wrong. Please try again
//       </h1>
//       <button
//         type="button"
//         onClick={this.onClickTryAgainButton}
//         className="failure-view-retry-button"
//       >
//         Try Again
//       </button>
//     </div>
//   )

//   renderNoPostsView = () => (
//     <div className="no-posts-container">
//       <div className="camera-container">
//         <BiCamera size={30} className="camera-icon" />
//       </div>
//       <h1 className="no-posts-heading">No Posts Yet</h1>
//     </div>
//   )

//   renderPostsView = () => {
//     const {myProfileData} = this.state

//     return (
//       <div>
//         <ul className="posts-view-container">
//           {myProfileData.posts.map(post => (
//             <li className="post-image-list-item" key={post.id}>
//               <img src={post.image} alt="user post" className="post-image" />
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }

//   renderSuccessView = () => {
//     const {myProfileData} = this.state
//     const {
//       userName,
//       profilePic,
//       postsCount,
//       followersCount,
//       followingCount,
//       userId,
//       userBio,
//       stories,
//       posts,
//     } = myProfileData

//     return (
//       <div className="user-profile-success-view-container">
//         <div className="user-details-section">
//           <h1 className="mobile-user-name">{userName}</h1>
//           <div className="user-profile-pic-and-stats-container">
//             <img
//               src={profilePic}
//               alt="user profile"
//               className="user-profile-pic"
//             />

//             <div className="mobile-user-stats-container">
//               <div className="stats-heading-desc">
//                 <span className="user-stats-heading">{postsCount}</span>
//                 <span className="user-stats-description">posts</span>
//               </div>
//               <div className="stats-heading-desc">
//                 <span className="user-stats-heading">{followersCount}</span>
//                 <span className="user-stats-description">followers</span>
//               </div>
//               <div className="stats-heading-desc">
//                 <span className="user-stats-heading">{followingCount}</span>
//                 <span className="user-stats-description">following</span>
//               </div>
//             </div>

//             <div className="desktop-user-details">
//               <h1 className="desktop-user-name-heading">{userName}</h1>

//               <div className="desktop-user-stats-container">
//                 <p className="stats-type">
//                   <span className="stats-numbers">{postsCount}</span> posts
//                 </p>
//                 <p className="stats-type">
//                   <span className="stats-numbers">{followersCount}</span>{' '}
//                   followers
//                 </p>
//                 <p className="stats-type">
//                   <span className="stats-numbers">{followingCount}</span>{' '}
//                   following
//                 </p>
//               </div>

//               <p className="user-id">{userId}</p>
//               <p className="user-bio">{userBio}</p>
//             </div>
//           </div>
//           <div className="user-id-bio-container">
//             <p className="user-id">{userId}</p>
//             <p className="user-bio">{userBio}</p>
//           </div>
//           <div className="user-stories-container">
//             <ul className="stories-list-container">
//               {stories.map(story => (
//                 <li key={story.id} className="story-item">
//                   <div className="story-image-container">
//                     <img
//                       src={story.image}
//                       alt="user story"
//                       className="story-image"
//                     />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <hr className="divider-line" />
//         <div className="user-profile-posts-section">
//           <div className="posts-icon-and-heading-container">
//             <BsGrid3X3 className="posts-grid-icon" />
//             <h1 className="posts-heading">Posts</h1>
//           </div>
//           {posts.length === 0
//             ? this.renderNoPostsView()
//             : this.renderPostsView()}
//         </div>
//       </div>
//     )
//   }

//   renderUserProfileView = () => {
//     const {apiStatus} = this.state

//     switch (apiStatus) {
//       case apiStatusConstants.inProgress:
//         return this.renderLoadingView()
//       case apiStatusConstants.success:
//         return this.renderSuccessView()
//       case apiStatusConstants.failure:
//         return this.renderFailureView()
//       default:
//         return null
//     }
//   }

//   render() {
//     return (
//       <>
//         <Header />
//         <div className="user-profile-container">
//           {this.renderUserProfileView()}
//         </div>
//       </>
//     )
//   }
// }

// export default MyProfile

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import SearchValue from '../SearchValue'
import SearchContext from '../../Context/SearchContext'

import WentWrongPage from '../WentWrongPage'

import ProfileComponent from '../ProfileComponent'

import './index.css'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    userProfileDetailsFetchStatus: dataFetchStatusConstants.initial,
    userProfileData: {},
  }

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    this.setState({
      userProfileDetailsFetchStatus: dataFetchStatusConstants.loading,
    })
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/my-profile`,
      {
        headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
        method: 'GET',
      },
    )
    if (response.ok) {
      const data = await response.json()
      const userProfileData = data.profile

      this.setState({
        userProfileDetailsFetchStatus: dataFetchStatusConstants.success,
        userProfileData,
      })
    }
    if (!response.ok) {
      this.setState({
        userProfileDetailsFetchStatus: dataFetchStatusConstants.failure,
      })
    }
  }

  renderUserProfile = () => {
    const {userProfileDetailsFetchStatus, userProfileData} = this.state
    switch (userProfileDetailsFetchStatus) {
      case dataFetchStatusConstants.loading:
        return (
          <div className="loader-component-container-profile">
            <div
              className="loader-container"
              data-testid="loader"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
            </div>
          </div>
        )
      case dataFetchStatusConstants.success:
        return (
          <>
            <ProfileComponent userProfileData={userProfileData} />
          </>
        )
      case dataFetchStatusConstants.failure:
        return (
          <div className="search-component-failure">
            <WentWrongPage retryFunction={this.getUserProfileData} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />

        <SearchContext.Consumer>
          {value => {
            const {showSearchComponent} = value

            return (
              <>
                {showSearchComponent ? (
                  <>
                    <div>
                      <SearchValue />
                    </div>
                  </>
                ) : (
                  <>{this.renderUserProfile()}</>
                )}
              </>
            )
          }}
        </SearchContext.Consumer>
      </div>
    )
  }
}

export default MyProfile
