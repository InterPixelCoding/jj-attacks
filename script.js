const rarity_input = document.querySelector('.rarity-container > input');
const rarity_span = document.querySelector('.rarity-container > span');
const overlay = document.querySelector('.colour-overlay');
const dark_mode_overlay = document.querySelector('.dark-mode-overlay');

function el(type, class_names) {
    const new_el = document.createElement(type);
    if(class_names != null) {
        if(class_names.length > 1) {
            for(let i = 0; i<class_names.length; i++) {
                new_el.classList.add(class_names[i])
            }
        } else {
            new_el.classList.add(class_names[0])
        }
    }

    return new_el;
}

function append_children(container, children) {
    children.forEach(child => {container.appendChild(child)})
}

let dark_mode = false;

window.addEventListener("mousemove", () => {
    let val = rarity_input.value;
    rarity_span.textContent = `Rarity: ${val}`;
    let data_hue = ((360 / rarity_input.max) * val) - 30;
    if(val >= rarity_input.max - 2) {dark_mode = true} else {dark_mode = false}
    if(dark_mode) {
        dark_mode_overlay.style.background = 'white';
    } else {dark_mode_overlay.style.background = 'black'}
    overlay.style.setProperty("--data-hue", data_hue);
})


document.addEventListener('DOMContentLoaded', () => {
    const upload_button = document.querySelector('.upload-button');
    const hero_image_div = document.querySelector('.hero-image');

    upload_button.addEventListener('change', handle_image_upload);

    load_background_image();

    function handle_image_upload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const image_data_url = e.target.result;
                compress_image(image_data_url, 0.7, function(compressed_image_data_url) {
                    store_image_in_local_storage(compressed_image_data_url);
                    set_background_image(compressed_image_data_url);
                });
            }
            reader.readAsDataURL(file);
        }
    }

    function compress_image(image_data_url, quality, callback) {
        const img = new Image();
        img.src = image_data_url;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const compressed_image_data_url = canvas.toDataURL('image/jpeg', quality);
            callback(compressed_image_data_url);
        }
    }

    function store_image_in_local_storage(image_data_url) {
        try {
            localStorage.setItem('hero_background_image', image_data_url);
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('Local storage quota exceeded. Cannot store image.');
            }
        }
    }

    function load_background_image() {
        const stored_image = localStorage.getItem('hero_background_image');
        if (stored_image) {
            set_background_image(stored_image);
        }
    }

    function set_background_image(image_url) {
        hero_image_div.style.backgroundImage = `url(${image_url})`;
    }
});

function download_div_as_image(div_class, output_scale) {
    var div = document.querySelector(div_class);
    var width = div.offsetWidth;
    var height = div.offsetHeight;

    var options = {
        width: width * output_scale,
        height: height * output_scale,
        style: {
            transform: 'scale(' + output_scale + ')',
            transformOrigin: 'top left'
        },
        useCORS: true
    };

    domtoimage.toPng(div, options)
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'div_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(function (error) {
            console.error('Error capturing div as image:', error);
        });
}

document.querySelector('.download').addEventListener("click", function() {
    download_div_as_image('.wrapper', 4);
});

const stats_structure = [
    ["Health", `${Math.floor(Math.random() * 100)}%`],
    ["Attack", `${Math.floor(Math.random() * 100)}%`],
    ["Defense", `${Math.floor(Math.random() * 100)}%`],
    ["Brainrot", `${Math.floor(Math.random() * 100)}%`]
]


const stats_container = document.querySelector('.statistics');

stats_structure.forEach(stat => {

    const stat_container = el("div", ["stat"]);
        const stat_text = el("span", ["stat-type"]);
        stat_text.textContent = stat[0];
        const stat_visual = el("div", ["stat-visual"]);
        const stat_percent = el("input", ["stat-percent"]);
        stat_percent.placeholder = stat[1];

    append_children(stat_container, [stat_text, stat_visual, stat_percent]);

    stats_container.appendChild(stat_container);
})

const input_percentages = document.querySelectorAll('.statistics > .stat > input');
input_percentages.forEach( function(input, index) {
    const stat_percent = input.parentElement.querySelector('.stat-visual');
    stat_percent.style.setProperty("--percent", stats_structure[index][1]);

    input.addEventListener("change", () => {
        if(input.value < 1) {input.value = 1}
        if(input.value > 99) {input.value = 99}
        input.value += "%"

        stat_percent.style.setProperty("--percent", input.value)
    })
})

