const githubApiUrl = "https://api.github.com/users/AdamsGeeky";


function loadUser(){
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("error").classList.add("hidden");
    document.getElementById("profile").classList.add("hidden");

    fetch(githubApiUrl)
    .then(res => {
        if(!res.ok){
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then(data => {
        showUser(data);
    })
    .catch(err => {
        console.error("Fetch error:", err);
        document.getElementById("error").classList.remove("hidden");
    })
    .finally(() => {
        document.getElementById("loading").classList.add("hidden");
    });
}


function showUser(user) {

  const profile = document.getElementById("profile");

  profile.innerHTML = `
    <div class="flex items-center space-x-4">
      <img src="${user.avatar_url}" 
           class="w-20 h-20 rounded-full border">

      <div>
        <h2 class="text-xl font-bold">${user.name || user.login}</h2>
        <p class="text-gray-600">${user.bio || "No bio"}</p>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
      <div><b>Followers:</b> ${user.followers}</div>
      <div><b>Repos:</b> ${user.public_repos}</div>
      <div><b>Location:</b> ${user.location || "N/A"}</div>
      <div><b>Company:</b> ${user.company || "N/A"}</div>
    </div>

    <a href="${user.html_url}" target="_blank"
       class="inline-block mt-4 text-green-600 underline">
       View on GitHub
    </a>
  `;

  profile.classList.remove("hidden");
}
