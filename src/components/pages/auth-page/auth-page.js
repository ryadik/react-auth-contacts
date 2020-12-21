import React, {Component} from "react";
import {withRouter} from 'react-router-dom'

class AuthPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loginField: '',
    passwordField: '',
    errorHide: true
  }

  redirectToContactPage = () => {
    if (this.props.isLogin) {
      this.props.history.push('/cabinet')
    }
  }

  render() {
    const {loginField, passwordField} = this.state

    let errorClassList = 'relative bg-red-100 border border-red-400 text-red-700 mt-6 px-4 py-3 rounded'
    errorClassList += (this.state.errorHide) ? ' hidden' : ' block'

    return (
      <form className="box-content flex flex-col w-84 mx-auto mt-32 px-6 py-8 shadow-md bg-gray-200">
        <div
          className="w-full h-16 bg-blue-700 flex justify-center items-center rounded shadow-md">
          <h1
            className="m-0 p-0 text-white font-bold text-2xl">
            Авторизация
          </h1>

        </div>

        <div className={errorClassList} role="alert">
          <span className="block sm:inline">Неправильный логин или пароль.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg onClick={() => this.setState({errorHide: true})}
                 className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"><title>Close</title><path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>

        <input type="text"
               onChange={(e) => this.setState({loginField: e.target.value.trim()})}

               className="box-border px-4 py-3 mt-6 w-4/5 mx-auto border-2 border-solid border-gray-500 hover:border-gray-600 focus:border-gray-600 rounded"
               placeholder="Имя пользователя"/>

        <input type="password"
               onChange={(e) => this.setState({passwordField: e.target.value.trim()})}

               className="box-border px-4 py-3 mt-4 w-4/5 mx-auto border-2 border-solid border-gray-500 hover:border-gray-600 focus:border-gray-600 rounded"
               placeholder="Пароль"/>

        <button onClick={(e) => {
          this.props.conditionData(loginField, passwordField, e)
            .then(err => (!err) ? this.setState({errorHide: false}) : this.setState({errorHide: true}))
            .then(() => {
              this.redirectToContactPage()

            })
        }}
                className="box-border px-4 py-3 w-2/5 mx-auto mt-6 bg-blue-500 hover:bg-blue-600 active:border-none rounded text-white text-center font-bold">
          Войти
        </button>
      </form>
    )
  }
}

export default withRouter(AuthPage)