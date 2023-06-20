// import {Component} from 'react'
// import Loader from 'react-loader-spinner'

// import Cookies from 'js-cookie'

// import './index.css'
// import InstaPost from '../InstaPost'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// class Posts extends Component {
//   state = {
//     userPosts: [],
//     apiStatus: apiStatusConstants.initial,
//   }

//   componentDidMount() {
//     this.getUserPosts()
//   }

//   getUserPosts = async () => {
//     this.setState({apiStatus: apiStatusConstants.inProgress})

//     const jwtToken = Cookies.get('jwt_token')

//     const userPostsUrl = 'https://apis.ccbp.in/insta-share/posts'
//     const options = {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       method: 'GET',
//     }

//     const response = await fetch(userPostsUrl, options)

//     if (response.ok === true) {
//       const fetchedData = await response.json()

//       const updatedData = fetchedData.posts.map(eachPost => ({
//         postId: eachPost.post_id,
//         profilePic: eachPost.profile_pic,
//         userId: eachPost.user_id,
//         userName: eachPost.user_name,
//         createdAt: eachPost.created_at,
//         likesCount: eachPost.likes_count,
//         postDetails: eachPost.post_details,
//         comments: eachPost.comments,
//         caption: eachPost.caption,
//       }))

//       this.setState({
//         apiStatus: apiStatusConstants.success,
//         userPosts: updatedData,
//       })
//     }

//     if (response.status === 401) {
//       this.setState({apiStatus: apiStatusConstants.failure})
//     }
//   }

//   renderLoadingView = () => (
//     <div className="loader-container">
//       <Loader
//         type="TailSpin"
//         color="#4094EF"
//         height={50}
//         width={50}
//         data-testid="loader"
//       />
//     </div>
//   )

//   onClickTryAgainButton = () => {
//     this.getUserPosts()
//   }

//   renderFailureView = () => (
//     <div className="failure-view">
//       <img
//         src="https://res.cloudinary.com/dmdr9a99a/image/upload/v1685029149/Group_7522_1_pjl4iz.png"
//         alt="failure view"
//       />
//       <h1 className="failure-view-heading">
//         Something went wrong. Please try again.
//       </h1>
//       <button
//         type="button"
//         onClick={this.onClickTryAgainButton}
//         className="failure-view-button"
//       >
//         Try again
//       </button>
//     </div>
//   )

//   renderSuccessView = () => {
//     const {userPosts} = this.state

//     return (
//       <div>
//         <ul className="user-posts-view">
//           {userPosts.map(post => (
//             <InstaPost key={post.postId} userPost={post} />
//           ))}
//         </ul>
//       </div>
//     )
//   }

//   renderUserPostsView = () => {
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
//     return <div className="main-container">{this.renderUserPostsView()}</div>
//   }
// }

// export default Posts

import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'
import SearchContext from '../../Context/SearchContext'
import './index.css'

class Posts extends Component {
  constructor(props) {
    super(props)
    const {userPost} = props
    this.state = {postLikedStatus: false, postLikedCounts: userPost.likes_count}
  }

  likeCLicked = async () => {
    const {userPost} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify({like_status: true}),
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${userPost.post_id}/like`,
      options,
    )
    console.log(response)
    const data = await response.json()
    console.log(data)
    /* this.setState({postLikedStatus:true}) */
    this.setState(prevState => ({
      postLikedStatus: true,
      postLikedCounts: prevState.postLikedCounts + 1,
    }))
  }

  unlikeCLicked = async () => {
    const {userPost} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify({like_status: false}),
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${userPost.post_id}/like`,
      options,
    )
    console.log(response)
    const data = await response.json()
    console.log(data)

    this.setState(prevState => ({
      postLikedStatus: false,
      postLikedCounts: prevState.postLikedCounts - 1,
    }))
  }

  render() {
    const {userPost} = this.props
    const postDetails = userPost.post_details
    const {postLikedCounts, postLikedStatus} = this.state

    return (
      <SearchContext.Consumer>
        {value => {
          const {searchComponentShowStatusChange} = value

          const routingToUserProfile = () => {
            searchComponentShowStatusChange()
          }

          return (
            <li className="each-user-post-container">
              <div className="user-post-profile-container">
                <div className="user-post-profile-image-container">
                  <img
                    src={userPost.profile_pic}
                    alt="post author profile"
                    className="user-post-profile-image"
                  />
                </div>
                <Link
                  className="user-name-link-container"
                  to={`/users/${userPost.user_id}`}
                  onClick={routingToUserProfile}
                >
                  <p>{userPost.user_name}</p>
                </Link>
              </div>
              <div className="user-post-image-container">
                <img
                  className="user-post-image"
                  src={postDetails.image_url}
                  alt="post"
                />
              </div>
              <div className="action-buttons-container">
                {!postLikedStatus ? (
                  <button
                    className="like-dis-comment-share-button"
                    type="button"
                    onClick={this.likeCLicked}
                    testid="likeIcon"
                  >
                    <FcLike />
                  </button>
                ) : (
                  <button
                    className="like-dis-comment-share-button"
                    onClick={this.unlikeCLicked}
                    type="button"
                    testid="unLikeIcon"
                  >
                    <BsHeart />
                  </button>
                )}
                <button className="like-dis-comment-share-button" type="button">
                  <FaRegComment />
                </button>
                <button className="like-dis-comment-share-button" type="button">
                  <BiShareAlt />
                </button>
              </div>
              <p className="likes-text">{postLikedCounts} likes</p>
              <p className="caption-comments-text">{postDetails.caption}</p>
              <ul className="comments-container">
                {userPost.comments.map(eachComment => (
                  <li key={eachComment.user_id}>
                    <p className="caption-comments-text">
                      <span className="commented-user-name">
                        {eachComment.user_name}
                      </span>
                      {eachComment.comment}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="post-created-moment">{userPost.created_at}</p>
            </li>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default Posts
