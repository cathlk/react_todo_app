import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      newItem: "", 
      list: [
        {
          id: 1, value: 'Im a dummie', isChecked: false, editMode: false }, 
        {
          id: 2, value: 'Im a dummie too', isChecked: false, editMode: false
        }
      ], 
      edit: "",  
      editMode: false
    } 
  } 

  updateInput(key, value) {
    //update react state 
    this.setState({
      [key]: value //blir inte unikt om samma handla 
    }); 
  }

  addItem() {
    //create item with unique id 
    const newItem = {
      id: 1 + Math.random(), 
      value: this.state.newItem.slice(), 
      isChecked: false, 
      editMode: false
    }; 

    //copy of current list of items 
    const list = [...this.state.list];

    //add new item to the list 
    list.push(newItem); 

    //update state with new list and reset newItem
    this.setState({
      list, 
      newItem:""
    }); 
  }
  
  /* setUpdate(thetext, thekey){
        const updateList = this.state.todoList
        updateList.map(item => {
            if(item.key === thekey) {
                item.text = thetext
            } 
    })
  */
  editItem(event) {
    console.log(event.id); 
    const list = [...this.state.list];
    
    const updatedList = list.map(item => {
      if (item.id === event.id){
        item.value = event.value
        // event.value = this.state.edit; 
        // item.editMode = !item.editMode; 
      }
      return item 
    });

    this.setState({
      edit: "",
      list: updatedList}); 
  } 

  checkDone(event) {
    const list = [...this.state.list]; 
    
    const updatedList = list.map(item => { 
      if (item.id === event.id) {
        item.isChecked = !item.isChecked;
      }
      return item
    }); 
    this.setState({list: updatedList}); 
  }

  deleteItem(id){
    //copy current list of items 
    const list = [...this.state.list]; 

    //filter out item to be deleted 
    const updatedList = list.filter(item => item.id !== id); 

    this.setState({list: updatedList}); 
  }

  render () {
    console.log(this.state.list); 
    return (
      <div>

        <div>
          Add your todo
          <br />
          <input 
            type="text"
            placeholder="What you need to do?"
            value={this.state.newItem}
            // event have an event that will call function every time it is activated
            onChange={e => this.updateInput("newItem", e.target.value)}
          /> 
          {/* call a function every time btn is clicked  */}
          <button onClick={() => this.addItem()}>Add to list </button> 
        </div>

          {/* with map each <p> item gets an unique id from key  */}
          {this.state.list.map(item => { 
            return (
              <p key={item.id}> 
                <input 
                  type = "checkbox" 
                  defaultChecked={item.isChecked}
                  onClick={() => this.checkDone(item)} 
                  />
                <input 
                  type="text"
                  value={item.value} 
                  onChange = {(event) => {this.editItem(event.target.value, item.key)}}
                />
                <button onClick={() => this.deleteItem(item.id)}>Remove</button>
                {item.value}  
                <button onClick = {() => this.editItem(item)}>Edit </button>
              </p> 
            )
          })}
      </div>
    ); 
  }
}
export default App;

/* 
<ul>
  {this.state.list.map(item => {
    return (
      //with map each li must have a unique id
      <li key={item.id}>                  
        <input 
          type="checkbox"
          defaultChecked={item.isChecked}
          onClick = {() => this.checkDone(item)}
        /> 
        {item.value}  
        <input 
          type = "text" 
          placeholder = "edit item"
          value = {this.state.value}
          onChange = {e => this.updateInput("edit", e.target.value)}
        />
        </li>
    )
  })}
  </ul>
*/
