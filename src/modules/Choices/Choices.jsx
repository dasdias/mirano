import classNames from 'classnames'
import './choices.scss'
import { useState } from 'react'

export const Choices = ({children, bottonLabel, className}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handkeToggle = () => {
    setIsOpen((oldIsOpen) => !oldIsOpen )
  }

  return (
      <div className={classNames("choices", className)}>
          <button className="choices__btn" type="button" onClick={handkeToggle}>{bottonLabel}</button>
        {isOpen && <div className="choices__box">{children}</div>}
      </div>
    )
}