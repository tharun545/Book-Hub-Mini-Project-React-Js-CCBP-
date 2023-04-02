import {Component} from 'react'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    booksData: [],
    filterValue: 'ALL',
    status: apiStatus.initial,
    searchText: '',
    isLoading: false,
  }

  componentDidMount() {
    this.getAllBookShelves()
  }

  onFailure = () => {
    this.setState({status: apiStatus.failure, isLoading: true})
  }

  getAllBookShelves = async () => {
    const {filterValue, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${filterValue}&search=${searchText}`
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
      const updatedData = data.books.map(each => ({
        id: each.id,
        title: each.title,
        readStatus: each.read_status,
        rating: each.rating,
        authorName: each.author_name,
        coverPic: each.cover_pic,
      }))
      this.setState({
        status: apiStatus.success,
        isLoading: true,
        booksData: updatedData,
      })
    } else {
      this.onFailure()
    }
  }

  getFilterValue = value => {
    this.setState({filterValue: value}, this.getAllBookShelves)
  }

  getSearchInput = e => {
    this.setState({searchText: e.target.value})
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284C7" width={50} height={50} />
    </div>
  )

  onClickRetry = () => {
    this.getAllBookShelves()
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

  renderAllBookDetailsView = () => {
    const {booksData, searchText, filterValue} = this.state
    const filterSearch = booksData.filter(each =>
      each.title.toLowerCase().includes(searchText),
    )
    const {label} = bookshelvesList.find(
      eachShelfItem => filterValue === eachShelfItem.value,
    )
    // console.log(filterSearch)
    return (
      <div>
        <h1>{label} Books</h1>
        <ul className="items-holder">
          {filterSearch.map(each => (
            <Link to={`/books/${each.id}`} key={each.id}>
              {filterSearch.length === 0 ? (
                <div>
                  <img
                    src="https://res.cloudinary.com/dbqkeyfhb/image/upload/v1680423385/Search-failure-jpg_ciydw3.jpg"
                    alt="no books"
                  />
                  <p>Your search for {searchText} did not find any matches</p>
                </div>
              ) : (
                <li key={each.id}>
                  <div className="book-item-card">
                    <img
                      src={each.coverPic}
                      alt="cover pic"
                      className="cover-pic"
                    />
                    <div>
                      <h1 key="title" className="title">
                        {each.title}
                      </h1>
                      <p className="author">{each.authorName}</p>
                      <p className="rating-card average">
                        Avg Rating <BsFillStarFill size={20} className="star" />{' '}
                        {each.rating}
                      </p>
                      <p className="status">
                        Status{' '}
                        <span className="status-name">{each.readStatus}</span>
                      </p>
                    </div>
                  </div>
                </li>
              )}
            </Link>
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderAllBookShelvesApiCallView = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderAllBookDetailsView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Header />
        <div className="bookshelves-body-container">
          <div className="nav-bar-card">
            <h1 className="nav-heading">Bookshelves</h1>
            <ul className="items-holding-card">
              {bookshelvesList.map(each => (
                <li key={each.id}>
                  <button
                    type="button"
                    key="label"
                    className="filter-btn"
                    onClick={() => this.getFilterValue(each.value)}
                  >
                    {each.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="all_bookshelves_card">
            <div className="top-heading-search-card">
              <div className="search-layout-card">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.getSearchInput}
                />
                <button
                  data-testid="searchButton"
                  type="button"
                  className="search-btn"
                >
                  <BsSearch size={10} className="search-icon" />
                </button>
              </div>
            </div>
            <div>
              {isLoading
                ? this.renderAllBookShelvesApiCallView()
                : this.renderLoadingView()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
