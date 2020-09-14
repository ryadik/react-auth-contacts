import React, {Component} from 'react'

import ViewMode from "./view-mode/view-mode";

class ContactsItem extends Component {

  render() {
    const viewModeProps = {
      ...this.props
    }

    return (
      <>
        <ViewMode {...viewModeProps} />
      </>
    )
  }
}


export default ContactsItem