const API_BASE_URL = 'https://sale.crmviet.vn:8444/crm/api/v1';

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};
