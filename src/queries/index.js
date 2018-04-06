import gql from 'graphql-tag';

export const query = gql`
{
  publicForm(formId: "1lf_E0x4") {
    publicFormSettings {
      organizationName
      submitButtonText
      title
    }

    formFields {
      ...on ShortTextField {
        id
        label
      }
      ...on LongTextField {
        id
        label
      }
      ...on SelectField {
        id
        label
        options
      }
      ...on RadioVerticalField {
        id
        label
        options
      }
      ...on ChecklistVerticalField {
        id
        label
        options
      }
      ...on DateField {
        id
        label
      }
      __typename
    }
  }
}`;

export const mutation = gql`
mutation teste(
  $name: ID!, 
  $nameValue: [UndefinedInput],
  $bio: ID!, 
  $bioValue: [UndefinedInput],
  $skill: ID!, 
  $skillValue: [UndefinedInput],
  $library: ID!, 
  $libraryValue: [UndefinedInput],
  $xp: ID!, 
  $xpValue: [UndefinedInput],
  $start: ID!, 
  $startValue: [UndefinedInput]
){
  submitPublicForm(input: {
    formId: "1lf_E0x4",
    filledFields: [
      {
        fieldId: $name
        fieldValue: $nameValue
      }
      {
      	fieldId: $bio
        fieldValue: $bioValue
      }
      {
        fieldId: $skill
        fieldValue: $skillValue
      }
      {
        fieldId: $library,
        fieldValue: $libraryValue
      }
      {
        fieldId: $xp,
        fieldValue: $xpValue
      }
      {
        fieldId: $start,
        fieldValue: $startValue
      }
    ]
  }) {
    repoItem {
      id
      title
    }
  }
}
`;