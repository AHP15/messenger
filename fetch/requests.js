export const getUser = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    return data;
  } catch(err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const request = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message)
    }
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
