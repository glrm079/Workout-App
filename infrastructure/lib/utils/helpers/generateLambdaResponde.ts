export const generateLambdaResponse = (
    body: object,
    status: number,
    error?: string,
    headers?: Record<string, string>
) => ({
    statusCode: status,
    body: JSON.stringify(error ? { error } : body),
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        ...headers
    }
});
