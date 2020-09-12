import React, {Component} from "react";

export default class AuthPage extends Component {

  state = {
    loginField: '',
    passwordField: '',
  }

  render() {
    const {loginField, passwordField} = this.state

    return (
      <form className="box-content flex flex-col w-84 mx-auto mt-32 px-6 py-8 shadow-md bg-gray-200">
        <div
          className="w-full h-16 bg-blue-700 flex justify-center items-center rounded shadow-md">
          <h1
            className="m-0 p-0 text-white font-bold text-2xl">
            Авторизация
          </h1>

        </div>
        <input type="text"
               onChange={(e) => this.setState({loginField: e.target.value.trim()})}

               className="box-border px-4 py-3 mt-16 w-4/5 mx-auto border-2 border-solid border-gray-500 hover:border-gray-600 focus:border-gray-600 rounded"
               placeholder="Your login"/>

        <input type="password"
               onChange={(e) => this.setState({passwordField: e.target.value.trim()})}

               className="box-border px-4 py-3 mt-4 w-4/5 mx-auto border-2 border-solid border-gray-500 hover:border-gray-600 focus:border-gray-600 rounded"
               placeholder="Your password"/>

          <button onClick={(e) => this.props.conditionData(loginField, passwordField, e)}
                   className="box-border px-4 py-3 w-2/5 mx-auto mt-6 bg-blue-500 hover:bg-blue-600 active:border-none rounded text-white text-center font-bold">
            Войти
          </button>
      </form>
    )
  }
}