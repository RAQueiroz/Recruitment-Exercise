import React from 'react';

const fieldComponents = {
  ShortTextField: () => textRenderer,
  LongTextField: () => areaRenderer,
  SelectField: () => selectRenderer,
  RadioVerticalField: () => radioRenderer,
  ChecklistVerticalField: () => checkListRenderer,
  DateField: () => dateRenderer,
}

const createRenderer = render => ({ input, meta, label, ...rest }) =>(
  <div
    className={`form-group ${[
      meta.error && meta.touched ? 'error' : '',
      meta.active ? 'active' : ''
    ].join(' ')}`}
  >
    <label>
      {label}
    </label>
    {render(input, label, rest)}
    {meta.error &&
      meta.touched &&
      <span className="badge badge-warning">
        {meta.error}
      </span>}
  </div>
)

const textRenderer = createRenderer(
  input => <input className="form-control" {...input} />
);

const areaRenderer = createRenderer(
  input => <textarea className="form-control" {...input} />
);

const selectRenderer = createRenderer((input, label, {options}) => 
  <select className="form-control" {...input}>
    {options.map(option => 
      <option key={option} value={option}>
        {option}
      </option>
    )}
  </select> 
);

const radioRenderer = createRenderer((input, label, { options }) => 
  <div>
    {options.map(option => 
      <div className="form-check" key={option}>
        <input
          className="form-check-input"
          {...input} 
          type="radio" 
          value={option} 
        />
        <label className="form-check-label">
          {option}
        </label>
      </div>
    )}
  </div>
);

const checkListRenderer = createRenderer(({value, onChange}, label, { options }) => {
  return(
    <div>
      {options.map((option, index) => 
        <div className="form-check" key={option}>
          <input
            className="form-check-input" 
            type="checkbox"
            onChange={e => {
              const copy = value ? [...value] : [];
              copy[index] = e.target.checked ? option : '';
              onChange(copy);
            }}
          />
          <label className="form-check-label" >
            {option}
          </label>
        </div>
      )}
    </div>
  )
})

const dateRenderer = createRenderer(
  input => <input 
    className="form-control" 
    {...input} type="date" 
  />
);

export default fieldComponents;