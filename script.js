const accessKey = "F8WzEDSnd5BPGFMmgbO666pC07pz0IYlY9it_AX4y88";

        const formElement = document.querySelector("form")
        const inputElement = document.getElementById("search-input")
        const searchResults = document.querySelector(".search-results")
        const showMoreButton = document.getElementById("show-more-button")

        let page = 1;

        async function searchImages() {
            const inputData = inputElement.value;
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

            const response = await fetch(url)
            const data = await response.json()

            const results = data.results

            let minHeight = 200; // Default minimum height

            results.forEach((result) => {
                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add("search-result");
                
                const imageLink = document.createElement('a');
                imageLink.href = result.links.html; // Linking to the official website
                imageLink.target = "_blank";
                
                const image = document.createElement("img");
                image.src = result.urls.small;
                image.alt = result.alt_description;
                image.onload = () => {
                    if (image.height < minHeight) {
                        minHeight = image.height;
                        document.querySelectorAll('.search-result').forEach((element) => {
                            element.style.minHeight = `${minHeight}px`;
                        });
                    }
                };
                
                const description = document.createElement('p');
                description.classList.add('image-description');
                description.textContent = result.alt_description || 'No description available';
                
                imageLink.appendChild(image);
                imageWrapper.appendChild(imageLink);
                imageWrapper.appendChild(description);
                searchResults.appendChild(imageWrapper);
            })

            // Show "Show More" button if there are more pages of results
            if (data.total_pages > page) {
                showMoreButton.style.display = "block";
            } else {
                showMoreButton.style.display = "none";
            }

            page++
        }

        formElement.addEventListener("submit", (event) => {
            event.preventDefault()
            page = 1
            searchResults.innerHTML = ""; // Clear previous search results
            searchImages()
        });

        showMoreButton.addEventListener("click", () => {
            searchImages()
        });

        // Initial search on page load
        searchImages();