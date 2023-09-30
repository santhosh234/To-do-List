import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {
	const [items, setItems] = useState('');
	const [addToList, setAddToList] = useState([]);
	const [nextKey, setNextKey] = useState(1);

	const url = 'https://playground.4geeks.com/apis/fake/todos/user/cdkelly';

	// connect API
	const getTodos = async () => {
		const response = await fetch(url);
		const todos = await response.json();
		try {
			if(!response.ok){
				throw new Error("there is an error", response.status);
			}
			console.log(todos);
			return todos;
		}
		catch(error) {
			console.log("there is an error", error)
		}
	}

	// get existing todos
	useEffect( async () => {
		console.log('test');
		const todoList = await getTodos();
		const list = todoList.map((todo) => {
			return {done: false, id: todo.id, label: todo.label}
		});
		let max = 0;
		list.map(obj => {
			if (obj.id > max) {
				max = obj.id
			}
		});
		setNextKey(max + 1);
		console.log(list);
		setAddToList(list);
	},[])

	//update database
	useEffect(() => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(addToList),
			headers: {
				"Content-Type": "application/json"
			}
		});
	}, [addToList]);

	function addItemToList(e) {
        if (e.key === "Enter") {
            setAddToList(addToList.concat([{done: false, label: items, id: nextKey}]));
            setItems("");
			setNextKey(nextKey + 1);
        }
    };

	return (
		<div className="container">
			<h1>to-do's</h1>
			<ul>
				<li>
					<input 
					className="input"
					type='text' 
					placeholder='What needs to be done?' 
					value={items} 
					onChange={(e) => setItems(e.target.value)} 
					onKeyDown={addItemToList}>
					</input>
				</li>
				{addToList.map((todo, index) => 
					(<li id={todo.id}>
						<span
						className="hide"
						onClick={() => setAddToList(addToList.filter((t, currentIndex) => index != currentIndex))}
						>
							<i class="fa-solid fa-eraser"></i>
						</span>
						<input 
						type="checkbox"
						className="checkbox"/> 
						<label>{todo.label}</label>
					</li>))
				}
			</ul>
			<p>tasks remaining: {addToList.length}</p>
		</div>
	);
};

export default Home;

