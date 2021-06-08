const deletePostHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#post_id').value.trim();

    if (post_id) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE',
            body: JSON.stringify({ post_id: post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            alert("Post deleted successfully!");
            document.location.replace('/dashboard/home');
        } else {
            alert(response.statusText);
        }
    }
};


document.querySelector('#deletePost').addEventListener('click', deletePostHandler);