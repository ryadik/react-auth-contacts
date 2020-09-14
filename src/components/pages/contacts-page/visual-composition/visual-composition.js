import React, {Component} from "react";

import CreateContact from "./create-contact/create-contact";

class VisualComposition extends Component {
  state = {
    createMode: false
  }

  changeMode = () => this.setState(({createMode}) => ({createMode: !createMode}))

  render() {
    const {selected, contacts, createNewContact} = this.props

    const createModeProps = {
      createNewContact,
      changeMode: this.changeMode
    }

    const contactsView = (this.state.createMode) ? <CreateContact {...createModeProps}/> : contacts

    // dinamic selected field view
    const selectedView = (selected.length > 0) ? selected : <ContactNotSelected />
    const selectedFieldClassList = (selected.length === 0) ? 'h-full flex justify-center items-center' : ''

    const btnClassList = 'box-border px-3 bg-transparent hover:bg-gray-400 active:border-none ' +
      'rounded text-xl text-gray-700 text-center'

    return (
      <div className="contacts-page mt-32 px-4 py-4 flex justify-between shadow-md bg-gray-200">

        <aside className="w-1/3 pr-4" style={{borderRight: '1px solid #a0aec0', height: '600px'}}>
          <div className="flex justify-between">
            <h3 className="text-2xl">Контакты</h3>
            <button onClick={this.changeMode} className={btnClassList}>
              <span>+</span>
            </button>
          </div>
          <div className={`contacts-container divide-y divide-gray-400 overflow-y-auto`} style={{height: '560px'}}>
            {contactsView}
          </div>
        </aside>

        <article className="w-2/3 pl-4">
          <h3 className="text-2xl">Подробнее</h3>
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


export default VisualComposition