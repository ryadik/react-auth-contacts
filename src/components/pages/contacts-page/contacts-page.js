import React, {Component} from "react";

import VisualComposition from "./visual-composition/visual-composition";
import ContactsItem from "./contacts-item/contacts-item";
import ViewSelectedContact from "./view-selected-contact/view-selected-contact";

import getData from "../../../service/getData";
import generateKey from "../../../service/generateKey";

export default class ContactsPage extends Component {

  state = {
    contacts: [
      {id: '1', firstName: 'Some', secondName: 'User1', img: '', active: false, key: generateKey()},
      {id: '2', firstName: 'Some', secondName: 'User2', img: '', active: false, key: generateKey()},
      {id: '3', firstName: 'Some', secondName: 'User3', img: '', active: false, key: generateKey()},
      {id: '4', firstName: 'Some', secondName: 'User4', img: '', active: false, key: generateKey()},
    ]
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
  }

  onDeleteContact = (key) => {
    this.setState(({contacts}) => {
      return {
        contacts: contacts.filter(item => item.key !== key)
      }
    })
  }

  componentDidMount() {
    this.getContacts()
  }

  componentWillUpdate() {
    this.getContacts()
  }

  render() {
    const {contacts} = this.state

    const contactsElems = (contacts.length > 0) ? contacts.map(item => <ContactsItem
        id={item.key}
        key={item.key}
        imgAvatar={item.img.trim()}
        fullName={`${item.firstName} ${item.secondName}`}
        setContactActive={this.setContactActive}/>)
      : []

    const selectedElem = []

    contacts.forEach(item => {
      if (item.active) {
        selectedElem.push(<ViewSelectedContact key={generateKey(6)}
                                               id={item.key}
                                               imgAvatar={item.img.trim()}
                                               firstName={item.firstName}
                                               secondName={item.secondName}
                                               onDeleteContact={this.onDeleteContact}/>)
      }
    })

    return <VisualComposition contacts={contactsElems} selected={selectedElem}/>
  }
}