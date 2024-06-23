import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function LearnSwr() {
	const [dataLoading, setDataLoading] = useState(false)

	const { mutate } = useSWRConfig()
	const { data, error, isLoading } = useSWR(
		'http://localhost:3000/api/todo',
		fetcher
	) //   $ pnpm i hono/client

	const createTodo = async () => {
		setDataLoading(!dataLoading)
		const response = await axios.post('http://localhost:3000/api/todo', {
			id: 'sdhhs6788',
			title: 'Fetch Works',
		})
		console.log(response)

		mutate('http://localhost:3000/api/todo')
		setDataLoading(false)
	}

	// if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>
	return (
		<div className="p-4       space-y-4">
			<p>Click on the button below 👇</p>
			<div>{JSON.stringify(data, null, 2)}</div>
			<div className="text-3xl font-bold">Create TODO</div>
			<Button disabled={dataLoading} onClick={createTodo}>
				Create User
			</Button>
		</div>
	)
}
