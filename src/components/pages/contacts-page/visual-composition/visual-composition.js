import React from "react";

const VisualComposition = ({contacts, selected}) => {

  // dinamic contacts view
  const contactsView = (contacts.length > 0) ? contacts : <EmptyContacts/>
  const contactsContainerClassList =
    (contacts.length === 0) ? 'h-full flex justify-center items-center divide-y divide-gray-400' : ''

  // dinamic selected field view
  const selectedView = (selected.length > 0) ? selected : <ContactNotSelected />
  const selectedFieldClassList =
    (selected.length === 0) ? 'h-full flex justify-center items-center' : ''

  return (
    <div className="contacts-page mt-32 px-4 py-4 flex justify-between shadow-md bg-gray-200">
      {/* left side */}
      <aside className="w-1/4 pr-4" style={{
        borderRight: '1px solid #a0aec0',
        minHeight: '600px'
      }}>
        <h3 className="text-2xl">Контакты</h3>

        <div className={`contacts-container ${contactsContainerClassList}`}>
          {contactsView}
        </div>
      </aside>

      {/* right side */}
      <article className="w-3/4 pl-4">
        <h3 className="text-2xl">Подробнее</h3>

        <div className={selectedFieldClassList}>
          {selectedView}
        </div>
      </article>
    </div>
  )
}

const ContactNotSelected = () => {
  return <span>Пожалуйста, выберете контакт из списка.</span>
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


export default VisualComposition