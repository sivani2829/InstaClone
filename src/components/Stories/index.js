import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 512,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

// const settings = {
//   dots: false,
//   infinite: false,
//   slidesToScroll: 1,
// }

const Stories = props => {
  const {noOfSlidesToShow, userStories} = props
  //
  return (
    <div>
      <Slider {...settings} slidesToShow={noOfSlidesToShow}>
        {userStories.map(each => (
          <div key={each.user_id}>
            <div className="each-story">
              <img
                className="each-story-image"
                src={each.story_url}
                alt="user story"
              />
              <p className="each-story-name">{each.user_name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    // <div className="slick-container">
    //   <Slider {...settings}>
    //     {userStories.map(eachLogo => {
    //       const {userId, storyUrl, userName} = eachLogo
    //       return (
    //         <div className="slick-item" key={userId}>
    //           <img className="logo-image" src={storyUrl} alt={userName} />
    //           <p className="user-story-name">{userName}</p>
    //         </div>
    //       )
    //     })}
    //   </Slider>
    // </div>
  )
}

export default Stories
