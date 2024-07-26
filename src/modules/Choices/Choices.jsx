import classNames from 'classnames'
import './choices.scss'
import { useEffect, useRef } from 'react'
import { adjustElementPosition, debounce } from '../../util';

export const Choices = ({ children, bottonLabel, className, isOpen, onToggle }) => {
  const choiceRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      adjustElementPosition(choiceRef.current);
    }

    const debAdjustElementPosition = debounce(() => {
      if (isOpen) {
        adjustElementPosition(choiceRef.current);
      }
    }, 100)

    window.addEventListener('resize', debAdjustElementPosition)

    return () => {
      window.removeEventListener('resize', debAdjustElementPosition)
    }

  }, [isOpen])
  return (
    <div className={classNames("choices", className)}>
      <button className="choices__btn" type="button" onClick={onToggle}>{bottonLabel}</button>
      {isOpen && <div className="choices__box" ref={choiceRef}>{children}</div>}
    </div>
  )
}