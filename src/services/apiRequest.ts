const api_url = "http://192.168.43.190:4000/api/auth"


interface ApiRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  queryParams?: Record<string, string>;
  token?: string;
  rawResponse?: boolean;
}

async function ApiRequest(endpoint: string, options: ApiRequestOptions){
  const url = new URL(`${api_url}/${endpoint}`);
  const params = options.queryParams ?? {};

  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + options.token);

  const isFormData = options.body instanceof FormData;
  if (!isFormData) {
    headers.append('Content-Type', 'application/json');
  }

  const response = await fetch(url.toString(), {
    method: options.method,
    headers,
    body: options.method !== 'GET' && options.body
      ? isFormData
        ? options.body
        : JSON.stringify(options.body)
      : null,
  });

  if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

  if (options.rawResponse) {
    return response; 
  }

  return response.json();
};

export default ApiRequest;