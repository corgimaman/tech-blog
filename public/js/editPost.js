const editPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post_title').value.trim();
    const body = document.querySelector('#post_body').value.trim();
    const post_id = document.querySelector('#post_id').value.trim();

    if (title && body) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            alert("Post updated successfully!");
            document.location.replace('/dashboard/home');
        } else {
            alert(response.statusText);
        }
    }
};


document.querySelector('#editPost').addEventListener('submit', editPostHandler);