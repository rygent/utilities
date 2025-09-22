export async function fetcher<Type = unknown>(url: string, init?: RequestInit): Promise<Type> {
	const res = await fetch(url, init);

	if (!res.ok) {
		throw new Error(`Received status ${res.status} (${res.statusText})`);
	}

	return res.json();
}
