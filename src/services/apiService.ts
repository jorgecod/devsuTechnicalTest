export const fecthResponse = async(url: string, method: string, body?: any) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'authorId': '2',
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    if (method.toUpperCase() === 'DELETE') {
      return { message: await response.text() };
    }

    const respData = await response.json();
    return respData;

  } catch (error: any) {
    console.error('Error:', error.message);
    throw error;
  }
};
