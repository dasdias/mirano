export const FilterRadio = ({handleTypeChange, type, data: {value, title}}) => {
  // console.log('data: ', data);

  return (
    <>
    <input 
        className="filter__radio"
        type="radio"
        name="type"
        value={value}
        id={value}
        checked={type === title}
        onChange={handleTypeChange}
        />
      <label className={`filter__label filter__label_${value}`} htmlFor={value}>{title}</label>
    </>
  )

}