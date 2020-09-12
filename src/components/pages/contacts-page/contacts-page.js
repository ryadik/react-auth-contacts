import React, {Component} from "react";

import getData from "../../../service/getData";
import ContactsItem from "./contacts-item/contacts-item";

export default class ContactsPage extends Component {

  state = {
    contacts: []
  }

  getContacts = () => {
    const url = 'http://localhost:3002/contacts'

    getData(url)
      .then(res => res.body)
      .then(body => {
        if (body.length > 0) {
          this.setState({contacts: body})
        }
      })
  }

  generateKey = () => Math.random().toString(36).substr(6)

  componentDidMount() {
    this.getContacts()
  }

  componentWillUpdate() {
    this.getContacts()
  }

  render() {
    const {contacts} = this.state

    const elems = (contacts.length > 0) ? contacts.map(item => <ContactsItem
        key={this.generateKey()}
        imgAvatar={item.img.trim()}
        fullName={`${item.firstName} ${item.secondName}`}/>)
      : []

    return <MainViewElements contacts={elems}/>
  }

}

const EmptyContacts = () => {
  return (
    <button
      className="box-border px-4 py-3 mx-auto bg-blue-500 hover:bg-blue-600 active:border-none rounded text-white text-center font-bold"
    >
      Добавить контакт
    </button>
  )
}

const NonEmptyContacts = ({contacts}) => {
  return (
    <>
      {contacts}
    </>
  )
}

const MainViewElements = ({contacts}) => {

  const contactsView = (contacts.length > 0) ? <NonEmptyContacts contacts={contacts} /> : <EmptyContacts/>
  const contactsContainerClassList =
    (contacts.length === 0) ? 'h-full flex justify-center items-center divide-y divide-gray-400' : ''

  return (
    <div className="contacts-page mt-32 px-4 py-4 flex justify-between shadow-md bg-gray-200">
      <aside className="w-1/4 pr-4" style={{
        borderRight: '1px solid #a0aec0',
        minHeight: '600px'
      }}>
        <h3 className="text-2xl">Контакты</h3>

        <div className={`contacts-container ${contactsContainerClassList}`}>
          {contactsView}
        </div>

      </aside>

      <article className="w-3/4 pl-4">
        <h3 className="text-2xl">Подробнее</h3>
      </article>
    </div>
  )
}