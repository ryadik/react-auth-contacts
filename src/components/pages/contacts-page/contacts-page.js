import React, {Component} from "react";

import {withRouter} from 'react-router-dom'

import VisualComposition from "./visual-composition/visual-composition";
import ContactsItem from "./visual-composition/contacts-item/contacts-item";
import ViewSelectedContact from "./visual-composition/view-selected-contact/view-selected-contact";

import getData from "../../../service/getData";
import postData from "../../../service/postData";
import deleteData from "../../../service/deleteData";
import generateKey from "../../../service/generateKey";

class ContactsPage extends Component {

  state = {
    contacts: [],
    searchInputValue: ''
  }

  setContactToggleActive = (key) => {
    this.setState(({contacts}) => {
      const newArr = [...contacts]

      newArr.forEach(item => {
        item.active = (item.key === key) ? item.active = !item.active : item.active = false
      })

      return {
        contacts: newArr
      }
    })
  } // set contact active state

  setSearchInputValue = (e) => {
    const inputValue = e.target.value.trim()

    this.setState({searchInputValue: inputValue})

    console.log(this.state.searchInputValue)
  }

  // CRUD JSON
  createNewContact = async (contactData, e) => {
    e.preventDefault()

    const urlPost = 'http://localhost:3002/contacts/'

    const newContact = {
      id: this.state.contacts.length + 1,
      ...contactData,
      active: false,
      key: generateKey(6)
    }

    newContact.firstName = (newContact.firstName.length > 20) ? newContact.firstName.substring(0,15) : newContact.firstName
    newContact.secondName = (newContact.secondName.length > 20) ? newContact.secondName.substring(0, 15) : newContact.secondName

    await postData(urlPost, newContact, 'POST')
      .then(res => console.log(res))

    this.getContacts()
  } // C

  getContacts = () => {
    const url = 'http://localhost:3002/contacts'

    getData(url)
      .then(res => res.body)
      .then(body => {
        if (body.length > 0) {
          this.setState({contacts: body})
        }
      })
  } // query to db.json GET // R

  saveContactChanges = async (key, newData, e) => {
    e.preventDefault()
    let urlPatch = 'http://localhost:3002/contacts/'
    this.state.contacts.forEach(item => urlPatch += (item.key === key) ? item.id : '')

    await postData(urlPatch, newData, "PATCH")
      .then(res => console.log('Post:', res))

    this.getContacts()
  } // save changed element // U

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
  } // delete contact // D

  componentDidMount() {
    if (!this.props.isLogin) {
      this.props.history.push('/')
    } else {
      this.getContacts()
    }
  }

  render() {
    const {contacts, searchInputValue} = this.state

    const visibleContacts = (searchInputValue) ? contacts.filter(item => {
      const str = `${item.firstName} ${item.secondName}`.toLowerCase()

      if (str.search(searchInputValue.toLowerCase()) > -1) {
        return item
      }
    }) : contacts

    const contactsElems = (visibleContacts.length > 0) ? visibleContacts.map(item =>
        <ContactsItem id={item.key}
                      key={item.key}
                      imgAvatar={item.imgAvatar.trim()}
                      fullName={`${item.firstName} ${item.secondName}`}
                      viewMode={true}
                      setContactToggleActive={this.setContactToggleActive}/>)

      : null

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

    return <VisualComposition createNewContact={this.createNewContact}
                              setSearchInputValue={this.setSearchInputValue}
                              onLogout={this.props.onLogout}
                              contacts={contactsElems}
                              selected={selectedElem}/>
  }
}

export default withRouter(ContactsPage)