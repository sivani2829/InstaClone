// import {Component} from 'react'
// import Posts from '../Posts'
// import Stories from '../Stories'
// import Header from '../Header'

// import './index.css'

// class Home extends Component {
//   render() {
//     return (
//       <>
//         <Header />
//         <main className="home-container">
//           <Stories />
//           <Posts />
//         </main>
//       </>
//     )
//   }
// }

// export default Home

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import Stories from '../Stories'
import Posts from '../Posts'
import Failure from '../Failure'
import SearchValue from '../SearchValue'
import SearchContext from '../../Context/SearchContext'

import './index.css'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    storiesFetchStatus: dataFetchStatusConstants.initial,
    userStories: [],
    postsFetchStatus: dataFetchStatusConstants.initial,
    usersPosts: [],
  }

  componentDidMount() {
    this.getUserStories()
    this.getUsersPosts()
  }

  getUserStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({storiesFetchStatus: dataFetchStatusConstants.loading})
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/stories',
      options,
    )

    if (response.ok) {
      const data = await response.json()
      const userStories = data.users_stories
      this.setState({storiesFetchStatus: dataFetchStatusConstants.success})
      this.setState({userStories})
    }
    if (!response.ok) {
      this.setState({storiesFetchStatus: dataFetchStatusConstants.failure})
    }
  }

  getUsersPosts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({postsFetchStatus: dataFetchStatusConstants.loading})
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/posts',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const usersPosts = data.posts
      this.setState({postsFetchStatus: dataFetchStatusConstants.success})
      this.setState({usersPosts})
    }
    if (!response.ok) {
      this.setState({postsFetchStatus: dataFetchStatusConstants.failure})
    }
  }

  renderUserStories = () => {
    const {userStories, storiesFetchStatus} = this.state
    switch (storiesFetchStatus) {
      case dataFetchStatusConstants.loading:
        return (
          <div className="stories-loader-component-container">
            <div
              className="loader-container"
              testid="loader"
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
          <div className="stories-container">
            <div className="stories-small-display">
              <Stories noOfSlidesToShow={4} userStories={userStories} />
            </div>
            <div className="stories-large-display">
              <Stories noOfSlidesToShow={7} userStories={userStories} />
            </div>
          </div>
        )
      case dataFetchStatusConstants.failure:
        return (
          <div className="stories-failure-container ">
            <Failure retryFunction={this.getUserStories} />
          </div>
        )
      default:
        return null
    }
  }

  renderUsersPosts = () => {
    const {usersPosts, postsFetchStatus} = this.state
    switch (postsFetchStatus) {
      case dataFetchStatusConstants.success:
        return (
          <div className="search-component-with-success-results">
            <ul className="user-posts-container-home">
              {usersPosts.map(eachPost => (
                <Posts key={eachPost.post_id} userPost={eachPost} />
              ))}
            </ul>
          </div>
        )
      case dataFetchStatusConstants.loading:
        return (
          <div className="posts-loader-component-container">
            <div
              className="loader-container"
              testid="loader"
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
      case dataFetchStatusConstants.failure:
        return (
          <div className="posts-loader-component-container">
            <Failure retryFunction={this.getUsersPosts} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header className="for-header-test" />

        <SearchContext.Consumer>
          {value => {
            const {showSearchComponent} = value

            return (
              <>
                {showSearchComponent ? (
                  <>
                    <SearchValue />
                  </>
                ) : (
                  <>
                    {this.renderUserStories()}
                    {this.renderUsersPosts()}
                  </>
                )}
              </>
            )
          }}
        </SearchContext.Consumer>
      </div>
    )
  }
}

export default Home
