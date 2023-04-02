import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {topRatedBookList: [], status: apiStatus.initial, isLoading: false}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  onFailure = () => {
    this.setState({status: apiStatus.failure, isLoading: true})
  }

  getTopRatedBooks = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const udpatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        topRatedBookList: udpatedData,
        status: apiStatus.success,
        isLoading: true,
      })
    } else {
      this.onFailure()
    }
  }

  renderTopRatedBooksView = () => {
    const {topRatedBookList, isLoading} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slick-container">
        {isLoading ? (
          <Slider {...settings} className="slider">
            {topRatedBookList.map(each => (
              <li key={each.id} className="item-holding-card">
                <div>
                  <img
                    src={each.coverPic}
                    alt="cover pic"
                    className="top-rated-book-logo"
                  />
                  <h1 key="title" className="title">
                    {each.title}
                  </h1>
                  <p>{each.authorName}</p>
                </div>
              </li>
            ))}
          </Slider>
        ) : (
          this.renderLoadingView()
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284C7" width={50} height={50} />
    </div>
  )

  onClickRetry = () => {
    this.getTopRatedBooks()
  }

  renderFailureView = () => (
    <div className="failure-view-card">
      <img
        src="https://res.cloudinary.com/dbqkeyfhb/image/upload/v1680414606/Group_7522_rjaan0.jpg"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickRetry}
      >
        Try Again
      </button>
    </div>
  )

  onClickFindBooks = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  renderApiTopRatedBooksCall = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderTopRatedBooksView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    // const {isLoading} = this.state
    return (
      <div>
        <Header />
        <div className="body-main-container">
          <h1 className="heading" key="title">
            Find Your Next Favorite Books?
          </h1>
          <p>
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="top-rated-books-card">
            <div>
              <div className="find-books-card">
                <h1>Top Rated Books</h1>
                <Link to="/shelf">
                  <button
                    type="button"
                    className="find-books-btn"
                    onClick={this.onClickFindBooks}
                  >
                    Find Books
                  </button>
                </Link>
              </div>
              <div>{this.renderApiTopRatedBooksCall()}</div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
