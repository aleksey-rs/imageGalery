const requestUrl = 'https://api.unsplash.com/search/photos?';
const galleryContainer = document.querySelector('.image_gallery');
const search = document.querySelector('#search');
const searchBtn = document.querySelector('.fa-search');
const clearBtn = document.querySelector('.fa-xmark');
const emptyResultBlock = document.querySelector('.empty_result');
const searchErrorBlock = document.querySelector('.search--box_error');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-content');
const closeModal = document.querySelector('.close');

    function getData(url) {
        return fetch(url).then(response => {
            return response.json()
        })
    }

    function sendRequest(param) {
        if(param.length < 1){
            searchError(true);
            return false;
        } else {
            searchError(false);
        }
        let url = createUrl(param);
        getData(url)
            .then(data => loadImages(data))
            .catch(err => console.log(err));
    }

    searchError = status => {
        if(status) {
            searchErrorBlock.style.opacity = 1;
        } else {
            searchErrorBlock.style.opacity = 0;
        }
    }

    loadImages = data => {
        clearGallery();
        emptyResult(false);
        if(data.total > 0){
            data.results.forEach(element => {
                createImage(element.urls.regular);
            });
            let imgs = document.querySelectorAll(".gallery-img");
            imgs.forEach((img) => {
                img.addEventListener('click', (element) => {
                    modal.style.display = "block";
                    modalImg.src = element.target.src;
                });
            });
        }else{
            emptyResult(true);
        }
    }

    emptyResult = status => {
        if(status){
            emptyResultBlock.style.display = "flex"; 
        } else {
            emptyResultBlock.style.display = "none"; 
        }
    }

    clearGallery = () => {
        galleryContainer.innerHTML = "";
    }

    createImage = url => {
        const img = document.createElement('img');
        img.classList.add('gallery-img')
        img.src = url;
        img.alt = 'image';
        galleryContainer.append(img);
    }

    createUrl = query => {
        return requestUrl + new URLSearchParams({
            client_id : 'seDQMUbwacksTck4yxCDWw4OGxtpTYPbRRKb7J4P7J4',
            query : query,
            per_page : 30,
            page : 1,
            tag_mode : 'all',
            orientation : 'landscape'
        }).toString();
    }

    window.addEventListener('load', () => {
        sendRequest('forest');
        search.focus();
    })

    search.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            //sendRequest(event.currentTarget.value); 
            sendRequest(search.value);
        }
    });

    searchBtn.addEventListener("click",() => {
        sendRequest(search.value);
    });

    clearBtn.addEventListener("click",() => {
        search.value = '';
    });

    closeModal.onclick = function() { 
        modal.style.display = "none";
    }