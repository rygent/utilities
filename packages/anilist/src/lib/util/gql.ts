export function gql(chunks: readonly string[], ...variables: unknown[]): string {
	return chunks.reduce((acc, chunk, idx) => `${acc}${chunk}${idx in variables ? String(variables[idx]) : ''}`, '');
}
