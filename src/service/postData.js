const postData = async (url, body) => {
  const res = await fetch('http://localhost:3002/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    return {
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