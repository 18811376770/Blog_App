import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';
class PostsNew extends Component{
  //all render are here
  renderField(field){
    const {meta:{touched,error}}=field;
    const className=`form-group ${touched && error?'has-danger':''}`;
    return(
      <div className={className}>
      <label>{field.label}</label>
        <input
        className="form-control"
        type="text"
        //field.input is an oject has bunch of event handlers
        //(onChange,onblur) and props, ... equals onChange={field.input.onChange}
        //onFocus={field.input.onFocus}
        {...field.input}
        />
        <div className="text-help">
        {touched? error : ''}
        </div>
      </div>
    );
  }
onSubmit(values){
  //the argument inside push should match up with
  //one of the router in the index.js, and we execute it only after the API request
  this.props.createPost(values,()=>{
    this.props.history.push('/');
  });
}
  render(){
    //when we use reduxForm to connect component and redux form,
    //and reference to props and pull of handleSubmit property, it(handleSubmit)
    //is pasted to component and on behalf of redux form
    const { handleSubmit }=this.props;
    return(
      //this.onSubmit(this.onSubmit.bind(this)):Once the redux form handle and
      //validate the values in the forms, it will pass the values in the form to
      //out callback function onSubmit and we'll customly handle these values;
      //The purpose of this.onSubmit.bind is making sure we reference this===components
      //when we call this function out of the component.
    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
    <Field name="title"
    label="Title"
    component={this.renderField}
     />
     <Field name="categories"
     label="Categories"
     component={this.renderField}
      />
      <Field name="content"
      label="Post Content"
      component={this.renderField}
       />
       <button type="submit" className="btn btn-primary">Submit</button>
       <Link to="/" className="btn btn-danger">Cancel</Link>
    </form>
  );
}
}
//automaticllt been called when user submit the form in the life cycle
//values is object input in the form
function validate(values){
  const errors={};
  //validate input  from 'values'
  if(!values.title){
    errors.title="Enter a title!";
  }
  if(!values.categories){
    errors.categories="Enter some categories!";
  }
  if(!values.content){
    errors.content="Enter some contents!";
  }
//if error is empty, the form is fine to submit
//if error has any props, redux form assumes form is invalid
  return errors;
}
//make component communicate with reducer that we have setup
export default reduxForm({
  //name for identifying the form,unique is OK
  validate:validate,
  form:'PostsNewForm'
})(
  connect( null,{createPost})(PostsNew)
);
