import React from 'react';
import { Field, reduxForm } from 'redux-form';

import fieldComponents from './fieldComponents';

const RecruitmentForm = props => {
  if(!props.formData){
    return <div />
  }
  
  const {
    formFields: fields,
    publicFormSettings: settings
  } = props.formData;

  return(
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="card-header">
            <h1>
              {settings.organizationName}
            </h1>
            <h3>
              {settings.title}
            </h3>
          </div>
          <br/>
          <form 
            onSubmit={props.handleSubmit}
          >
            {
              fields.map(field => 
                <Field
                  key={field.id} 
                  name={field.id}
                  label={field.label}
                  options={field.options}
                  component={fieldComponents[field.__typename]()}
                />
              )  
            }
            {props.subErrors 
              ? <strong>{props.subErrors[0]}</strong> 
              : null
            }
            <button 
              className="btn btn-primary"
              type='submit' 
              disabled={props.submitting}
            >
              {settings.submitButtonText}
            </button>
          </form>    
      </div>
    </div>
  </div>
  )
}

const validate = values => {
  const errors = {};
 
  if(!values.additional_experience){
    errors.additional_experience = 'Required';
  }  
  if(!values.javascript_library_of_choice){
    errors.javascript_library_of_choice = 'Required';
  }
  if(!values.primary_skill){
    errors.primary_skill = 'Required';
  }
  if(!values.start_date){
    errors.start_date = 'Required';
  }
  if(!values.your_bio){
    errors.your_bio = 'Required';
  }
  if(!values.your_name){
    errors.your_name = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'RecruitmentForm',
  validate
})(RecruitmentForm);
