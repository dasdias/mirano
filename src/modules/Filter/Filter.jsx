import './filter.scss'
import { Choices } from '../Choices/Choices'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGoods } from '../../redux/goodsSlice'
import { debounce, getValidFilters } from '../../util'
import { FilterRadio } from './FilterRadio'
import { changeCategory, changePrice, changeType } from '../../redux/filtersSlice'
import classNames from 'classnames'

const filterTypes = [
  { value: "bouquets", title: 'Цветы' },
  { value: "toys", title: 'Игрушки' },
  { value: "postcards", title: 'Открытки' },
];



export const Filter = ({ settitleGoods, filterRef }) => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);
  const filters = useSelector((state) => state.filters)
  const categories = useSelector((state) => state.goods.categories)

  const prevFiltersRef = useRef({});

  const debouncedFetchGoods = useRef(debounce((filters) => {
    dispatch(fetchGoods(filters))
  }, 500)).current;

  useEffect(() => {
    const prevFliters = prevFiltersRef.current;
    const validFilter = getValidFilters(filters);

    if (!validFilter.type) {
      return;
    }

    if (prevFliters.type !== validFilter.type) {
      dispatch(fetchGoods(validFilter));
      settitleGoods(filterTypes.find((typeTitle) => validFilter.type === typeTitle.value).title)
    } else {
      debouncedFetchGoods(validFilter)
    }

    prevFiltersRef.current = filters;

  }, [dispatch, debouncedFetchGoods, settitleGoods, filters])


  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index)
  }

  const handleTypeChange = ({ target }) => {
    const { value } = target;
    dispatch(changeType(value))
    setOpenChoice(-1);
  }

  const handlePriceChange = ({ target }) => {
    const { name, value } = target;
    // const newFilters = {...filters, [name]: !isNaN(parseInt(value, 10)) ? value : ""}
    // setfilters(newFilters)
    dispatch(changePrice({ name, value }))
  }

  const handleCategoryChange = (category) => {
    dispatch(changeCategory(category));
    setOpenChoice(-1);
  }

  return (
    <section className="filter" ref={filterRef} >
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            {filterTypes.map(item => {
              return (
                <FilterRadio
                  key={item.value}
                  handleTypeChange={handleTypeChange}
                  data={item}
                  type={filters.type}
                />
              )
            })}
          </fieldset>

          <fieldset className="filter__group filter__group_choices">
            <Choices bottonLabel="Цена" isOpen={openChoice === 0} onToggle={() => handleChoicesToggle(0)}>
              <fieldset className="filter__price">
                <input
                  className="filter__input-price"
                  type="text"
                  name="minPrice"
                  placeholder="от"
                  value={filters.minPrice}
                  onChange={handlePriceChange}
                />
                <input
                  className="filter__input-price"
                  type="text"
                  name="maxPrice"
                  placeholder="до"
                  value={filters.maxPrice}
                  onChange={handlePriceChange}
                />
              </fieldset>
            </Choices>
            {categories.length ? (
              <Choices bottonLabel="Тип товара" isOpen={openChoice === 1} onToggle={() => handleChoicesToggle(1)}>
                <ul className="filter__type-list">
                  <li className="filter__type-item">
                    <button className="filter__type-button" type="button" onClick={() => { handleCategoryChange('') }}>Все товары</button>
                  </li>
                  {categories.map(category => (
                    <li key={category} className="filter__type-item">
                      <button className={classNames('filter__type-button', category === filters.category ? "filter__type-button_active" : "")} type="button" onClick={() => { handleCategoryChange(category) }}>{category}</button>
                    </li>
                  ))}
                </ul>
              </Choices>
            ) : null}

          </fieldset>
        </form>
      </div>
    </section>
  )
}