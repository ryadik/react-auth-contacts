import React, {Component} from "react";

import VisualComposition from "./visual-composition/visual-composition";
import ContactsItem from "./visual-composition/contacts-item/contacts-item";
import CreateContact from "./visual-composition/contacts-item/create-contact/create-contact";
import ViewSelectedContact from "./visual-composition/view-selected-contact/view-selected-contact";

import getData from "../../../service/getData";
import postData from "../../../service/postData";
import deleteData from "../../../service/deleteData";
import generateKey from "../../../service/generateKey";

export default class ContactsPage extends Component {

  state = {
    contacts: []
  }

  setContactActive = (key) => {
    this.setState(({contacts}) => {
      const newArr = [...contacts]

      newArr.forEach(item => {
        item.active = (item.key === key) ? item.active = true : item.active = false
      })

      return {
        contacts: newArr
      }
    })
  } // set contact active state



  // CRUD JSON
  getContacts = () => {
    const url = 'http://localhost:3002/contacts'

    getData(url)
      .then(res => res.body)
      .then(body => {
        if (body.length > 0) {
          this.setState({contacts: body})
        }
      })
      .then(() => console.log(this.state))
  } // query to db.json GET

  saveContactChanges = async (key, newData, e) => {
    e.preventDefault()
    let urlPatch = 'http://localhost:3002/contacts/'
    this.state.contacts.forEach(item => urlPatch += (item.key === key) ? item.id : '')

    await postData(urlPatch, newData, "PATCH")
      .then(res => console.log('Post:', res))

    this.getContacts()
  } // save changed element

  onDeleteContact = (key) => {
    let url = 'http://localhost:3002/contacts/'
    this.state.contacts.forEach(item => url += (item.key === key) ? item.id : '')

    deleteData(url)
      .then(res => console.log(res))

    this.setState(({contacts}) => {
      return {
        contacts: contacts.filter(item => item.key !== key)
      }
    })
  } // delete contact

  componentDidMount() {
    this.getContacts()
  }

  render() {
    const {contacts} = this.state

    const contactsElems = (contacts.length > 0) ? contacts.map(item => <ContactsItem
        id={item.key}
        key={item.key}
        imgAvatar={item.imgAvatar.trim()}
        fullName={`${item.firstName} ${item.secondName}`}
        setContactActive={this.setContactActive}/>)
      : <CreateContact/>

    const selectedElem = []

    contacts.forEach(item => {
      if (item.active) {
        selectedElem.push(<ViewSelectedContact key={generateKey(6)}
                                               id={item.id}
                                               itemKey={item.key}
                                               imgAvatar={item.imgAvatar.trim()}
                                               firstName={item.firstName}
                                               secondName={item.secondName}
                                               getNewContactData={this.getNewContactData}
                                               saveContactChanges={this.saveContactChanges}
                                               onDeleteContact={this.onDeleteContact}/>)
      }
    })

    return <VisualComposition contacts={contactsElems} selected={selectedElem}/>
  }
}