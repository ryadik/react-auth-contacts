const postData = async (url, body, method) => {

  const res = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'},
  })

  if (!res.ok) {
    return {
      res,
      code: res.status,
      status: 'Error'
    }
  } else {
    return {
      code: res.status,
      status: 'Successful'
    }
  }
}

export default postData