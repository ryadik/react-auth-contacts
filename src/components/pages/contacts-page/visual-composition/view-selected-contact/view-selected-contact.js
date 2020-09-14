import React, {Component} from "react";

import ViewMode from "./view-mode/view-mode";
import EditMode from "./edit-mode/edit-mode";


class ViewSelectedContact extends Component {
  state = {
    editMode: false,
    newData: {
      firstName: this.props.firstName,
      secondName: this.props.secondName,
      imgAvatar: this.props.imgAvatar
    }
  }

  changeMode = () => this.setState(({editMode}) => ({editMode: !editMode}))

  changeState = (objProp, e) => {
    const newValue = e.target.value

    this.setState(({newData}) => {
      const newObj = {...newData}
      newObj[objProp] = newValue

      return {
        newData: newObj
      }
    })
  }

  render() {
    const componentProps = {
      ...this.props,
      changeMode: this.changeMode,
      changeState: this.changeState,
      newData: this.state.newData
    }

    const viewContent = (this.state.editMode) ? <EditMode {...componentProps}/> : <ViewMode {...componentProps}/>

    return (
      <div className="contact-page__selected-contact mt-8 flex flex-col items-center">
        {viewContent}
      </div>

    )
  }
}



export default ViewSelectedContact