const rootElement = document.getElementById("root");
const returnFalse = () => {
    return false;
}
const ToDoForm = () => {
    const [toDoItems, setToDoItems] = React.useState([
        {
            item: "Init Todo",
            state: 0,
        },
    ]);

    const [text, setText] = React.useState("");

    const handleChange = (event) => {
        setText(event.target.value)
    }

    const addToDo = () => {
        if(!text) return
        let item = {
            item: text,
            state: 0
        }
        setToDoItems(toDoItems.concat(item));
        setText("")
    }

    const changeToNotDoneState = (event) => {
        let index = event.target.dataset.key;

        setToDoItems(
            toDoItems.map((item, idx) => idx==index? {"item": item.item, "state": 1}: item), 
        )
    }

    const changeToDoneState = (event) => {
        let index = event.target.dataset.key;

        setToDoItems(
            toDoItems.map((item, idx) => idx==index? {"item": item.item, "state": 0}: item), 
        )
    }
    const removeCompleted = () => {
        setToDoItems(
            toDoItems.filter((item, idx) => item.state<1), 
        )
    }

    return (
        <div>
            <form onSubmit={returnFalse}>
            <div className="row">
                <div className="col-12 m-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add todo Here"
                        onChange={handleChange}
                        value = {
                            text
                        }
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-12 mt-1">
                    <input value="Add" type="button" className="btn btn-primary btn-block" onClick={addToDo}/>
                    
                </div>
                <div className="col-md-6 col-12 mt-1">
                    <input value="RemoveCompleted" type="button" className="btn btn-danger btn-block" onClick={removeCompleted} />
                    
                </div>
            </div>
         </form>

         {
             toDoItems.map((item, idx) =>{
                 if(item.state===0){
                    return(
                     <div className="text-center m-2 toDoItem" key={idx}>
                     <h1 style={{ color:'rgb(112, 255, 112)' }} data-key={idx} onClick={changeToNotDoneState} >{item.item}
                    </h1>

                     </div>
                    )
                 }
                 else if(item.state===1){
                    return(
                     <div className="text-center m-2 toDoItem" key={idx}>
                     <h1><strike style={{ color:'rgb(255, 0, 0)' }} data-key={idx} onClick={changeToDoneState}>{item.item}</strike>                   
                    </h1>

                     </div>
                    )
                 }
                 
             })
         }
         
        </div>
        
    );
};



const App = () => {
    return (
        <div className="row">
            <div className="col-md-8 offset-md-2 col-12  text-center">
                <h1 className="display-5">To Do List</h1>
                <ToDoForm />
                <h5 className="text-center text-bold">Click on the text to mark item.</h5>
            </div>
            
        </div>
    );
};

ReactDOM.render(<App />, rootElement);
