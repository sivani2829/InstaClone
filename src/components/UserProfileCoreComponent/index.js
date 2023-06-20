import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import WentWrongPage from '../WentWrongPage'
import ProfileComponent from '../ProfileComponent'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfileCoreComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userProfileDetailsFetchStatus: dataFetchStatusConstants.initial,
      userProfileData: {},
    }
  }

  componentDidMount() {
    this.getUserProfileData()
    const {history} = this.props
    history.listen(() => {
      if (history.action === 'POP') {
        history.push('/')
      }
    })
  }

  getUserProfileData = async () => {
    this.setState({
      userProfileDetailsFetchStatus: dataFetchStatusConstants.loading,
    })
    const {match} = this.props
    const {params} = match
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/users/${params.id}`,
      {
        headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
        method: 'GET',
      },
    )

    if (response.ok) {
      const data = await response.json()
      const userProfileData = data.user_details
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
    return <div>{this.renderUserProfile()}</div>
  }
}

export default withRouter(UserProfileCoreComponent)
