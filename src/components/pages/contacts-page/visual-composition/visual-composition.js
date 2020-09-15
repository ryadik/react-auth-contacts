import React, {Component} from "react";
import {withRouter} from 'react-router-dom'

import CreateContact from "./create-contact/create-contact";

class VisualComposition extends Component {
  state = {
    createMode: false
  }

  changeMode = () => this.setState(({createMode}) => ({createMode: !createMode}))

  render() {
    const {selected, contacts, createNewContact, setSearchInputValue, onLogout} = this.props

    const createModeProps = {
      createNewContact,
      changeMode: this.changeMode
    }

    const contactsView = (this.state.createMode) ? <CreateContact {...createModeProps}/> : contacts

    // dinamic selected field view
    const selectedView = (selected.length > 0) ? selected : <ContactNotSelected />
    const selectedFieldClassList = (selected.length === 0) ? 'h-full flex justify-center items-center' : ''

    const btnClassList = 'box-border px-3 bg-transparent active:border-none rounded text-center'

    return (
      <div className="contacts-page mt-32 px-4 py-4 flex justify-between shadow-md bg-gray-200 ">

        <aside className="w-1/3 pr-4 divide-y divide-gray-400" style={{borderRight: '1px solid #a0aec0', height: '600px'}}>
          <div className="flex justify-between">
            <h3 className="text-2xl">Контакты</h3>
            <button onClick={this.changeMode}
                    title="Добавить"
                    className={btnClassList + ' hover:bg-gray-400 text-xl text-gray-700'}>
              <span>+</span>
            </button>
          </div>
          <div className="search">
            <input
              onChange={(e) => setSearchInputValue(e)}
              className="box-border px-4 py-3 my-3 w-full mx-auto border-2 border-solid border-gray-500 hover:border-gray-600 focus:border-gray-600 rounded"
              placeholder="Поиск контактов"
              type="text"/>
          </div>
          <div className={`contacts-container divide-y divide-gray-400 overflow-y-auto`} style={{height: '485px'}}>
            {contactsView}
          </div>
        </aside>

        <article className="w-2/3 pl-4 divide-y divide-gray-400">
          <div className="flex justify-between">
            <h3 className="text-2xl">Подробнее</h3>
            <button
              onClick={() => {
                onLogout()
                this.props.history.push('/')
              }}
              className={btnClassList + ' h-8 bg-red-600 hover:bg-red-700'}>
              <span className="leading-3 text-sm text-gray-100 font-normal">Выход</span>
            </button>
          </div>
          <div className={selectedFieldClassList}>
            {selectedView}
          </div>
        </article>
      </div>
    )
  }

}

const ContactNotSelected = () => {
  return <span>Пожалуйста, выберете контакт.</span>
}


export default withRouter(VisualComposition)