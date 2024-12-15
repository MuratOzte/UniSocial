export const sharePostRequest = async (token, content, image) => {
    const response = await fetch('http://localhost:3000/api/add-post', {
        method: 'POST',
        body: JSON.stringify({
            content,
            image,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    console.log(data);
    return data;
};

export const deletePostRequest = async (token, postId) => {
    const response = await fetch('http://localhost:3000/api/delete-user-post', {
        method: 'DELETE',
        body: JSON.stringify({
            postId,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    console.log(data);
    return data;
}


