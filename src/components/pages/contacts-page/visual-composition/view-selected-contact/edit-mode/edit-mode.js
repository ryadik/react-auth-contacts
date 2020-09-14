import React from "react";

const EditMode = ({itemKey, imgAvatar, firstName, secondName, changeMode, changeState, saveContactChanges, newData}) => {
  const inputStyle = 'box-border px-4 py-3 mt-4 w-4/5 mx-auto border-2 border-solid border-gray-500 hover:border-gray-600 focus:border-gray-600 rounded'
  const buttonStyle = 'box-border px-4 py-3 mx-auto bg-gray-500 hover:bg-gray-700 active:border-none rounded text-white text-center font-bold'

  return (
    <>
      <div className="edit-mode__title">
        <span className="text-3xl tracking-wider">Редиктирование</span>
      </div>
      <form className="edit-mode__form edit-form flex flex-col items-center">
        <div className="flex justify-center items-center">
          <div className="edit-form__text mr-4 flex flex-col items-end">
            <label htmlFor="firstName" className="py-3 mt-4">
              <span className="">Имя</span>
            </label>
            <label htmlFor="secondName" className="py-3 mt-4">
              <span className="">Фамилия</span>
            </label>
            <label htmlFor="imgAvatar" className="py-3 mt-4">
              <span className="">Ссылка на изображение</span>
            </label>
          </div>

          <div className="edit-form__inputs flex flex-col">
            <input className={inputStyle}
                   onChange={(e) => changeState('firstName', e)}
                   type="text" id="firstName" defaultValue={firstName} placeholder="Введите имя"/>
            <input className={inputStyle}
                   onChange={(e) => changeState('secondName', e)}
                   type="text" id="secondName" defaultValue={secondName} placeholder="Введите фамилию"/>
            <input className={inputStyle}
                   onChange={(e) => changeState('imgAvatar', e)}
                   type="url" id="imgAvatar" defaultValue={imgAvatar} placeholder="Введите ссылку"/>
          </div>
        </div>

        <div className="edit-form__buttons mt-8">
          <button onClick={(e) => saveContactChanges(itemKey, newData, e)} className={buttonStyle + ' mr-4 bg-green-500 hover:bg-green-700'}>
            Сохранить
          </button>
          <button onClick={() => changeMode()} className={buttonStyle}>
            Отмена
          </button>
        </div>
      </form>

    </>
  )
}

export default EditMode