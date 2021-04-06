import Select from 'react-select';

export default class GSelect extends Select {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={{marginBottom:'24px'}}>
        <div style={{margin:'10px 0px'}}>{this.props.label}</div>
        <Select 
          {...this.props}
          value = {this.props.value}
          isMulti= {true}
          options = {this.props.options}
          theme = {theme => ({
            ...theme,
            borderRadius : 0,
            margin: '10px 0px',
            colors:{
              ...theme.colors,
              neutral20:'#757575',
              primary:'#007cba',
              // --wp-admin-theme-color
              primary25:'#e6e6e6'
            }
          })}
        />
      </div>

    )
  }
}