import { getToken } from './authenticate';

export async function addToFavourites(id) {
  const token = await getToken(); 
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  };

  const res = await fetch(url, options);
  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const token = await getToken(); 
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  };

  const res = await fetch(url, options);
  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}

export async function getFavourites() {
  const token = await getToken();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  };

  const res = await fetch(url, options);
  if (res.status === 200) {
    return await res.json(); 
  } else {
    return [];
  }
}


export async function addToHistory(id) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
  
    const res = await fetch(url, options);
    if (res.status === 200) {
      return await res.json(); 
    } else {
      return [];
    }
  }
  
  export async function removeFromHistory(id) {
    const token = await getToken(); 
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
  
    const res = await fetch(url, options);
    if (res.status === 200) {
      return await res.json();
    } else {
      return [];
    }
  }

  export async function getHistory() {
    const token = await getToken(); 
    const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
  
    const res = await fetch(url, options);
    if (res.status === 200) {
      return await res.json();
    } else {
      return [];
    }
  }