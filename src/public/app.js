document.getElementById("offerForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const imageInput = document.getElementById("image");

  if (!title || !price || !description) {
    alert("Title, price or description cannot be empty!");
    return;
  }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
  
    if (imageInput.files.length > 0) {
      formData.append("image", imageInput.files[0]);
    }
  
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

  const result = await response.json();

  if (response.ok) {
    document.getElementById("offerForm").reset();
    fetchAndDisplayOffers();
  } else {
    alert("Something went wrong")
  }
});


async function fetchAndDisplayOffers() {
  console.log("Loading offers")
  const response = await fetch("/offers");
  const offers = await response.json();

  if (response.ok) {
    const offersContainer = document.getElementById("offersContainer");
    offersContainer.innerHTML = "";

    offers.forEach((offer) => {
      const offerHTML = `
        <div class="col s12 m6 l4 offerDiv">
            <div class="card hoverable">
                <div class="card-image">
                    ${offer.imagePath ? `<img class="responsive-img" src="${offer.imagePath}" alt="${offer.title}">` : ""}
                    <span class="card-title">${offer.title}</span>
                </div>
                <div class="card-content">
                    <p>${offer.description}</p>
                    <p>Price: $${offer.price}</p>
                </div>
            </div>
        </div>
      `;
      document.getElementById("offersContainer").innerHTML += offerHTML;
    });    
  } else {
    alert("Failed to fetch offers!");
    console.error(response.error);
  }
}

