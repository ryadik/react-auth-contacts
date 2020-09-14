const deleteData = async (url) => {

  const res = await fetch(url, {
    method: 'DELETE',
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

export default deleteData