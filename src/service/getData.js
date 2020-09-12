const getData = async (url) => {
  const res = await fetch(url)

  if (!res.ok) {
    return {
      code: res.status,
      status: 'Error'
    }
  } else {
    return {
      body: res.json(),
      code: res.status,
      status: 'Successful'
    }
  }
}

export default getData