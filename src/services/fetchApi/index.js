const postAPI = async (
    URL,
    body,
    method = "POST",
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
        throw new Error("URL bulunamadi!");
      }
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        cache: "no-store",
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      return data;
    } catch (err) {
      throw new Error(`API istegi hatali ${err}`);
    }
  };


  const getAPI = async (
    URL,
    headers = { "Content-Type": "application/json" }
  ) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return data;
  };



  const deleteAPI = async (
    URL,
    headers = { "Content-Type": "application/json" }
  ) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "DELETE",
      headers: headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return data;
  };



  
  const putAPI = async (
    URL,
    body,
    method = "PUT",
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
        throw new Error("URL bulunamadı!");
      }
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      return data;
    } catch (err) {
      throw new Error(`API istegi hatali ${err}`);
    }
  };
  export {getAPI, postAPI, putAPI, deleteAPI  };