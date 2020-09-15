import React, {Component} from "react";

class CreateContact extends Component{
  state = {
    contactData: {
      firstName: '',
      secondName: '',
      imgAvatar: '',
    }
  }

  changeState = (objProp, e) => {
    const newValue = e.target.value

    this.setState(({contactData}) => {
      const newObj = {...contactData}
      newObj[objProp] = newValue

      return {
        contactData: newObj
      }
    })
  }

  render() {
    const inputStyle = 'box-border px-4 py-3 mt-4 w-4/5 mx-auto border-2 border-solid border-gray-500 hover:border-gray-600 focus:border-gray-600 rounded'
    const buttonStyle = 'box-border px-4 py-3 mx-auto bg-gray-500 hover:bg-gray-700 active:border-none rounded text-white text-center font-bold'

    const {changeMode} = this.props

    return (
      <form className="flex flex-col items-center">
        <div className="edit-form__inputs flex flex-col">
          <input className={inputStyle}
                 autoFocus={true}
                 onChange={(e) => this.changeState('firstName', e)}
                 type="text" id="firstName" placeholder="Введите имя"/>
          <input className={inputStyle}
                 onChange={(e) => this.changeState('secondName', e)}
                 type="text" id="secondName" placeholder="Введите фамилию"/>
          <input className={inputStyle}
                 onChange={(e) => this.changeState('imgAvatar', e)}
                 type="url" id="imgAvatar" placeholder="Ссылка на картинку"/>
        </div>

        <div className="edit-form__buttons mt-8">
          <button
            onClick = {(e) => {
              this.props.createNewContact(this.state.contactData, e)
                .then(changeMode)
            }}
            className={buttonStyle + ' mr-4 bg-green-500 hover:bg-green-700'}>
            Сохранить
          </button>
          <button onClick={changeMode} className={buttonStyle}>
            Отмена
          </button>
        </div>
      </form>
    )
  }
}

export default CreateContact