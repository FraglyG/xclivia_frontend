const serverURL = "https://api.xclivia.com"
const apiURL = serverURL

// CONFIG 

const web_intro_time = 1200 // ms
const popup_time = 250 // ms
const random_image_swap_time = 200 //ms
const random_image_swap_interval = 30 * 1000 // ms
const amountPerPage = 5

// 
let urlSearchParams = new URLSearchParams(window.location.search);

let header_maximized = true

let API_KEY = "" // received later
let CLIVIA_LIST = []
let ACTIVE_LIST = []

let cache = {
    current_hold_track: null,
    has_moved: false,
    current_popup_closest: null,
}

async function postAPI(command, payload) {
    const data = {
        command: command,
        apikey: API_KEY,
        payload: payload
    }

    return await axios.post(apiURL, data)
}

async function getAPI(command) {
    return await axios.get(apiURL, { headers: { apikey: API_KEY, command: command } })
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateTag(tag, value) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (tag !== undefined && value !== undefined) {
        urlSearchParams.set(tag, value);
    }

    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
}

window.addEventListener('DOMContentLoaded', async (event) => {
    const results = await getAPI("get_clivia")
    CLIVIA_LIST = results.data.payload

    const randomInfoContainer = document.getElementById("random_clivia")
    const random_image = document.getElementById("random_image")
    const random_name = document.getElementById("random_name")

    const randomClivia = CLIVIA_LIST[Math.floor(Math.random() * CLIVIA_LIST.length)]

    random_image.src = randomClivia.Image0
    random_name.innerHTML = randomClivia.Name

    setInterval(() => {
        randomInfoContainer.animate({
            transform: `translate(100%, 0%)`
        }, { duration: random_image_swap_time, fill: "forwards" });

        const randomClivia = CLIVIA_LIST[Math.floor(Math.random() * CLIVIA_LIST.length)]

        random_image.src = randomClivia.Image0
        random_name.innerHTML = randomClivia.Name

        setTimeout(() => {
            randomInfoContainer.animate({
                transform: `translate(0%, 0%)`
            }, { duration: random_image_swap_time, fill: "forwards" });

        }, random_image_swap_time * 1.5)
    }, random_image_swap_interval);

    console.log(results)
});

$(document).on('click', '[data-scroll]', function (e) {
    e.preventDefault();
    let target = $(this).attr('href');
    $('body').animate({
        scrollTop: $(target).offset().top
    }, 1000);
});