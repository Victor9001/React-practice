 
 function List(){
    
    const fruit = ["Apple", "Orange", "Banana", "Coconut", "Pineapple"];

    const listItems = fruit.map(friut => <li>{fruit}<li/>);
     
     return(<ul>{listItems}<ul/>);

 }

 export default List
