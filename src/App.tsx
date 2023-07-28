import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { addTodo, removeTodo, toggleFinish } from "./features/todo/todo.slice";

export default function App() {
	const todos = useAppSelector((st) => st.todo.todos);
	const dispatch = useAppDispatch();
	const [todoValue, setTodoValue] = useState<string>("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.currentTarget.reset();

		if (!todoValue) {
			return alert("Invalid todo value");
		}

		let id = todos.length;
		id++;

		dispatch(
			addTodo({
				id,
				value: todoValue,
				isDone: false,
			})
		);
	};

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const value = target.value;

		setTodoValue(value);
	};

	return (
		<main className='w-full h-screen bg-slate-100 md:p-8'>
			<article className='h-full container mx-auto max-w-md p-4 flex flex-col bg-white md:rounded-xl md:shadow-lg'>
				<div className='flex-grow overflow-y-scroll p-2'>
					{todos.length > 0 ? (
						todos.map((todo) => {
							return (
								<div key={todo.id} className='flex items-center justify-center gap-x-2 my-4'>
									<input
										type='checkbox'
										className='caret-emerald-500'
										value={todoValue}
										onClick={() => dispatch(toggleFinish(todo.id))}
									/>
									<span className={`flex-grow ${todo.isDone ? " line-through" : ""}`}>{todo.value}</span>
									<button className='btn danger px-2 py-1' onClick={() => dispatch(removeTodo(todo.id))}>
										delete
									</button>
								</div>
							);
						})
					) : (
						<p className='text-lg'>No todos, keep it up 🤙</p>
					)}
				</div>
				<form onSubmit={handleSubmit} className='grid grid-cols-3 gap-x-4 bg-white'>
					<input
						type='text'
						placeholder='e.g. clean my room'
						maxLength={32}
						onChange={handleChange}
						className='col-span-2 input caret-emerald-500'
					/>
					<button className='btn' type='submit'>
						save
					</button>
				</form>
			</article>
		</main>
	);
}
