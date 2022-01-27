import {Component} from 'react'
import {withRouter} from 'react-router'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import NavContext from '../../Context/NavContext'
import Footer from '../Footer'

class Account extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <NavContext.Consumer>
        {value => {
          const {isShowMenu} = value
          return (
            <div className="account-bg-container">
              <Header />
              <div className="a-card-container">
                <div className="a-c">
                  <h1 className="a-heading">Account</h1>
                  <hr />

                  <div className="membership-c">
                    <p className="m-heading">Member ship</p>
                    <div>
                      <p className="email">balutarock71117@gmail.com </p>
                      <p className="password">Password : **********</p>
                    </div>
                  </div>
                  <hr />
                  <div className="p-c">
                    <p className="m-heading">Plan details</p>
                    <div className="premium-c">
                      <p className="premium">Premium</p>

                      <p className="c">Ultra HD</p>
                    </div>
                  </div>
                  <hr />
                  <div className="b-c">
                    <button
                      type="button"
                      className="logout-button"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          )
        }}
      </NavContext.Consumer>
    )
  }
}

export default withRouter(Account)
