import PropTypes from 'prop-types'

function Student(props){
    return(
        
        <div className="student">
             <p>Name: {props.name}</p>
             <p>Age: {props.age}</p>
             <p>Student: {props.isStudent ? "Yes" : "No"}</p>
        </div>
    );
}
Student.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    isStudent: PropTypes.bool,
}
Student.defaultProps = {
     name: "Guest",
     age: 0,
     isStudent: true,
}
export default Student




 //fruits.sort((a, b) => a.name.localeCompare(b.name)); // ALPHABETICAL
    //fruits.sort((a, b) => b.name.localeCompare(a.name)); // REVERSE ALPHABETICAL
   // fruits.sort((a, b) => a.calories - b.calories); // NUMERIC
    //fruits.sort((a, b) => b.calories - a.calories); // REVERSE NUMERIC

    //const lowCalFruits = fruits.filter(fruit => fruit.calories < 100);
    //const lowCalFruits = fruits.filter(fruit => fruit.calories >= 100);
