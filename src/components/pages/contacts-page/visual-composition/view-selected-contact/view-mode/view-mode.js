import userAvatar from "../../../../../../user-avatar.webp";
import React from "react";

const ViewMode = ({id, itemKey, imgAvatar, firstName, secondName, onDeleteContact, changeMode}) => {
  const buttonStyle = 'box-border px-4 py-3 mx-auto bg-gray-500 hover:bg-gray-700 active:border-none rounded text-white text-center font-bold'

  return (
    <>
      <div className="large-user-avatar w-64">
        <img className="rounded-full" src={(imgAvatar) ? imgAvatar : userAvatar} alt=""/>
      </div>
      <div className="user-name mt-3">
        <span className="text-3xl tracking-wider">{firstName} {secondName}</span>
      </div>
      <div className="control-buttons mt-8">
        <button onClick={() => changeMode()} className={buttonStyle + ' mr-4'}>
          Редактировать
        </button>
        <button onClick={() => onDeleteContact(itemKey)} className={buttonStyle + ' bg-red-600 hover:bg-red-700'}>
          Удалить
        </button>
      </div>
    </>
  )
}

export default ViewMode