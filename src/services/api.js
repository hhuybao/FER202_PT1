
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    "Content-Type": 'application/json'
  }
});

export const getUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (e) {
    throw new Error(e)
  }
}

export const getPayments = async ({ sortby, search, semester, course }) => {

  let query = [];



  if (semester) query.push(`semester=${semester}`);
  if (course) query.push(`courseName=${course}`);

  if (sortby) {
    const [sort, order] = sortby.split("_");
    query.push(`_sort=${sort}`);
    query.push(`_order=${order}`);
  }

  const queryString = query.join("&");
  let url = '/payments';
  if (query.length > 0) {
    url = `/payments?${queryString}`;
  }

  try {
    const response = await api.get(url)
    if (search) {
      const keyword = search.toLowerCase();
      response.data = response.data.filter(
        item =>
          item.semester.toLowerCase().includes(keyword) ||
          item.courseName.toLowerCase().includes(keyword)
      );
    }
    return response.data;
  } catch (e) {
    throw new Error(e)
  }
}
