import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      newItem: "", 
      list: [
        {
          id: 1, value: 'Im a dummie', isChecked: false }, 
        {
          id: 2, value: 'Im a dummie too', isChecked: true
        }
      ], 
      chekk: false, 
      edit: "" 
    } 
  } 

  updateInput(key, value) {
    //update react state 
    this.setState({
      [key]: value
    }); 
  }

  addItem() {
    //create item with unique id 
    const newItem = {
      id: 1 + Math.random(), 
      value: this.state.newItem.slice(), 
      isChecked: false
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
  
  editItem(e) {
    const list = [...this.state.list];
    
    const updatedList = list.map(item => {
      if (item.id === e.id){
        e.value = this.state.edit; 
      }
      return item 
    });

    this.setState({
      edit: "",
      list: updatedList}); 
  } 

  checkDone(c) {
    const list = [...this.state.list]; 
    
    const updatedList = list.map(item => {
      if (item.id === c.id) {
        item.isChecked = !item.isChecked;
        this.setState({chekk: true})
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

    console.log(this.state.list)
    
    return (
      <div>
        <div>
          Add an item... 
          <br/>
          <input 
            type="text"
            placeholder="Tell your idea here"
            value={this.state.newItem}
            // event have an event that will call function every time it is activated
            onChange={e => this.updateInput("newItem", e.target.value)}
          /> 
          <button // call a function every time btn is clicked 
            onClick={() => this.addItem()}
          >
            Add it to the list 
          </button> 
        
          <ul>
            {this.state.list.map(item => {
              return (
                //with map each li must have a unique id
                <li key={item.id}>                  
                  <input 
                    type="checkbox"
                    defaultChecked={item.isChecked}
                    // checked = {this.state.isChecked}
                    onClick = {() => this.checkDone(item)}
                  />
                  {item.value}
                  <input 
                    type="text" 
                    placeholder="edit item"
                    value={this.state.edit}
                    onChange={e => this.updateInput("edit", e.target.value)}
                  />
                  <button
                    onClick = {() => this.editItem(item)}
                  >
                    Edit  
                  </button>

                  <button
                    onClick={() => this.deleteItem(item.id)}
                  >
                    Remove
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
