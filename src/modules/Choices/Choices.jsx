import classNames from 'classnames'
import './choices.scss'

export const Choices = ({children, bottonLabel, className, isOpen, onToggle}) => {

  return (
      <div className={classNames("choices", className)}>
          <button className="choices__btn" type="button" onClick={onToggle}>{bottonLabel}</button>
        {isOpen && <div className="choices__box">{children}</div>}
      </div>
    )
}