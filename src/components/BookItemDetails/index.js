import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookItemDetails extends Component {
  state = {status: apiStatus.initial, isLoading: false, bookItemList: {}}

  componentDidMount() {
    this.getBookItemDetails()
  }

  onFailure = () => {
    this.setState({status: apiStatus.failure, isLoading: true})
  }

  getBookItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updatedData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        aboutBook: data.book_details.about_book,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
        aboutAuthor: data.book_details.about_author,
      }
      this.setState({
        status: apiStatus.success,
        bookItemList: updatedData,
        isLoading: true,
      })
    } else {
      this.onFailure()
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284C7" width={50} height={50} />
    </div>
  )

  onClickRetry = () => {
    this.getBookItemDetails()
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

  renderBookItemDetailsView = () => {
    const {bookItemList} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookItemList
    console.log(bookItemList)
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div>
            <div className="book-item">
              <img src={coverPic} alt="title" className="cover-pic" />
              <div>
                <h1 key="title" className="title">
                  {title}
                </h1>
                <p className="author">{authorName}</p>
                <p className="rating-card">
                  Avg Rating <BsFillStarFill className="star" />
                  <span className="average" key="rating">
                    {rating}
                  </span>
                </p>
                <p className="status">
                  Status: <span className="status-name">{readStatus}</span>
                </p>
              </div>
            </div>
            <hr />
            <div className="author-details-card">
              <h3>About Author</h3>
              <p>{aboutAuthor}</p>
              <h3>About Book</h3>
              <p>{aboutBook}</p>
            </div>
            <Footer className="footer" />
          </div>
        ) : (
          this.renderLoadingView()
        )}
      </>
    )
  }

  renderBookItemApiCallView = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderBookItemDetailsView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="main-container">
          <div className="book-item-card-body">
            {this.renderBookItemApiCallView()}
          </div>
        </div>
      </div>
    )
  }
}

export default BookItemDetails
