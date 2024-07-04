import classNames from 'classnames'
import './choices.scss'

export const Choices = ({children, bottonLabel, className}) => {
  return (
    <>
      <div className={classNames("choices", className)}>
            <button className="choices__btn" type="button">{bottonLabel}</button>

            <div className="choices__box">
              {children}
              
            </div>
          </div>

      {/* <div className="filter__choices filter__choices_type choices">
        <button className="filter__select choices__btn" type="button">Тип
          товара</button>

        <div className="choices__box filter__choices-box filter__choices-box_type">
          <ul className="filter__type-list">
            <li className="filter__type-item">
              <button className="filter__type-button"
                type="button">Монобукеты</button>
            </li>
            <li className="filter__type-item">
              <button className="filter__type-button" type="button">Авторские
                букеты</button>
            </li>
            <li className="filter__type-item">
              <button className="filter__type-button" type="button">Цветы в
                коробке</button>
            </li>
            <li className="filter__type-item">
              <button className="filter__type-button" type="button">Цветы в
                корзине</button>
            </li>
            <li className="filter__type-item">
              <button className="filter__type-button" type="button">Букеты из
                сухоцветов</button>
            </li>
          </ul>
        </div>
      </div> */}
    </>
    )
}