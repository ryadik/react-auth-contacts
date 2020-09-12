import React from "react";

import userAvatar from '../../../../user-avatar.webp'

const ViewSelectedContact = ({id, imgAvatar, firstName, secondName, onDeleteContact}) => {
  return (
    <div className="contact-page__selected-contact mt-8 flex flex-col items-center">
      <div className="large-user-avatar w-64">
        <img className="rounded-full" src={(imgAvatar) ? imgAvatar : userAvatar} alt=""/>
      </div>
      <div className="user-name mt-3">
        <span className="text-3xl tracking-wider">{firstName} {secondName}</span>
      </div>
      <div className="control-buttons mt-8">
        <button className="box-border px-4 py-3 mx-auto mr-4 bg-gray-500 hover:bg-gray-700 active:border-none rounded text-white text-center font-bold">
          Редактировать
        </button>
        <button
          onClick={()=> onDeleteContact(id)}
          className="box-border px-4 py-3 mx-auto bg-red-600 hover:bg-red-700 active:border-none rounded text-white text-center font-bold"
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

export default ViewSelectedContact