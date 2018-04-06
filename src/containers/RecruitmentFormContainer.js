import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import RecruitmentForm from '../components/RecruitmentForm';
import { query, mutation } from '../queries';

class RecruitmentFormContainer extends Component{

  constructor(props) {
    super(props);
    this.state = { 
      errors: '',
    };
  }

  handleSubmit(values){

    const {
      javascript_library_of_choice,
      primary_skill,
      start_date,
      your_bio,
      your_name,
      additional_experience
    } = values;
    
    this.props
      .mutate({
        variables:{
          name: 'your_name', 
          nameValue: your_name,
          bio: 'your_bio', 
          bioValue: your_bio,
          skill: 'primary_skill', 
          skillValue: primary_skill,
          library: 'javascript_library_of_choice', 
          libraryValue: javascript_library_of_choice,
          xp: 'additional_experience', 
          xpValue: additional_experience,
          start: 'start_date', 
          startValue: start_date 
        }
      })
      .then(res => {
        if(res.errors){
          this.setState({ errors: res.errors})
        }
        alert(JSON.stringify(res.data));
      })
      .catch(err => {
        this.setState({errors: err.message})
      });
  }

  render(){
    return (
      <RecruitmentForm
        formData={this.props.data.publicForm}
        onSubmit={this.handleSubmit.bind(this)}
        subErrors={this.state.errors}
      />
    )
  }
}

export default graphql(query)(
  graphql(mutation)(RecruitmentFormContainer)
);