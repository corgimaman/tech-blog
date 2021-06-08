const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment_body').value.trim();
    const post_id = document.querySelector('#post_id').value.trim();

    if (comment && post_id) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            alert("Comment added successfully!");
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};


document.querySelector('.btn-large').addEventListener('submit', newCommentHandler);