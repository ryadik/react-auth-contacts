import React from "react";

const VisualComposition = ({contacts, selected}) => {

    // dinamic selected field view
  const selectedView = (selected.length > 0) ? selected : <ContactNotSelected />
  const selectedFieldClassList = (selected.length === 0) ? 'h-full flex justify-center items-center' : ''


  return (
    <div className="contacts-page mt-32 px-4 py-4 flex justify-between shadow-md bg-gray-200">

      <aside className="w-1/4 pr-4" style={{borderRight: '1px solid #a0aec0', minHeight: '600px'}}>
        <h3 className="text-2xl">Контакты</h3>
        <div className={`contacts-container divide-y divide-gray-400`}>
          {contacts}
        </div>
      </aside>

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


export default VisualComposition