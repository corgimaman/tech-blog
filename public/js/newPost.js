const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post_title').value.trim();
    const body = document.querySelector('#post_body').value.trim();

    if (title && body) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            alert("Post created successfully!");
            document.location.replace('/dashboard/home');
        } else {
            alert(response.statusText);
        }
    }
};


document.querySelector('.btn-large').addEventListener('submit', newPostHandler);