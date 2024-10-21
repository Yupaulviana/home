document.addEventListener('DOMContentLoaded', function () {
    let posts = [];
    let postId = 1; // Menyimpan ID post yang unik
    function updatePostCount() {
        document.getElementById('postCount').innerText = posts.length; // Mengupdate jumlah post
    }

    window.openAddPostModal = function () {
        const modal = new bootstrap.Modal(document.getElementById('addPostModal'));
        modal.show();
    };

    window.closeAddPostModal = function () {
        const modal = bootstrap.Modal.getInstance(document.getElementById('addPostModal'));
        modal.hide();
    };

    window.closeEditPostModal = function () {
        const modal = bootstrap.Modal.getInstance(document.getElementById('editPostModal'));
        modal.hide();
    };


    function renderPosts() {
        const postList = document.getElementById('postList');
        postList.innerHTML = ''; // Bersihkan tabel sebelum render

        posts.forEach(post => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${post.id}</td>
                <td>${post.judul}</td>
                <td>${post.konten}</td>
                <td id="commentar">${post.komen}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewPost(${post.id})">View</button>
                    <button class="btn btn-warning btn-sm" onclick="editPost(${post.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePost(${post.id})">Delete</button>
                </td>
            `;
            postList.appendChild(row);
        });
        updatePostCount(); // Memperbarui jumlah post setelah render

    }

    const addForm = document.getElementById('addPostForm');
    addForm.addEventListener('submit', e => {
        e.preventDefault();

        const newPost = {
            id: postId++, // Menggunakan postId yang unik
            judul: addForm.judul.value,
            konten: addForm.konten.value,
            komen: addForm.komen.value
        };

        posts.push(newPost);
        renderPosts();
        closeAddPostModal();
        addForm.reset(); // Mengosongkan semua input di dalam form
    });

    window.viewPost = function (id) {
        const post = posts.find(p => p.id === id);
        alert(`Judul: ${post.judul}\nKonten: ${post.konten}\nkomen: ${post.komen}`);
    };

    window.editPost = function (id) {
        const post = posts.find(p => p.id === id);
        document.getElementById('editPostId').value = post.id;
        document.getElementById('editPostTitle').value = post.judul;
        document.getElementById('editPostContent').value = post.konten;
        document.getElementById('editPostComment').value = post.komen; // Mengisi komen saat edit
        const modal = new bootstrap.Modal(document.getElementById('editPostModal'));
        modal.show();
    };

    const editForm = document.getElementById('editPostForm');
    editForm.addEventListener('submit', e => {
        e.preventDefault();

        const postId = parseInt(editForm.postId.value); // Mengambil ID post yang diedit
        const postIndex = posts.findIndex(p => p.id === postId);

        if (postIndex > -1) {
            posts[postIndex].judul = editForm.judul.value;
            posts[postIndex].konten = editForm.konten.value;
            posts[postIndex].komen = editForm.komen.value;
        }

        renderPosts();
        closeEditPostModal(); // Pastikan Anda menutup modal
        editForm.reset(); // Mengosongkan semua input di dalam form
    });

    window.deletePost = function (id) {
        posts = posts.filter(p => p.id !== id);
        renderPosts();
    };
});

let commentCountElement = document.getElementById('commentCount');
    let commentCount = parseInt(commentCountElement.textContent);

    document.getElementById('addPostForm').addEventListener('submit', function (e) {
        e.preventDefault();

        let komentar = document.getElementById('addPostComment').value;
        if (komentar.trim() !== "") {
            commentCount++;
            commentCountElement.textContent = commentCount; // Update tampilan jumlah komentar
        }

});

/*
// Memeriksa apakah penghitungan viewer sudah ada di Local Storage
let viewerCount = localStorage.getItem('viewerCount');

if (viewerCount) {
    viewerCount = parseInt(viewerCount) + 1; // Tambah 1 ke viewerCount yang ada
} else {
    viewerCount = 1; // Jika tidak ada, mulai dari 1
}

// Simpan kembali ke Local Storage
localStorage.setItem('viewerCount', viewerCount);

// Tampilkan jumlah viewer di elemen HTML
document.getElementById('visitorCount').innerText = viewerCount;
*/
// Memeriksa apakah penghitungan viewer sudah ada di Local Storage
let viewerCount = localStorage.getItem('viewerCount');

if (viewerCount) {
    viewerCount = parseInt(viewerCount) + 1; // Tambah 1 ke viewerCount yang ada
} else {
    viewerCount = 1; // Jika tidak ada, mulai dari 1
}

// Simpan kembali ke Local Storage
localStorage.setItem('viewerCount', viewerCount);

// Tampilkan jumlah viewer di elemen HTML
document.getElementById('viewerCount').innerText = viewerCount;

