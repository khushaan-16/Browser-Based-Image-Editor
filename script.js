let filters = {
    
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
}


const imageCanvas  = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")

const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")

const presetsContainer = document.querySelector(".presets")


let file = null
let image = null


const filtersContainer = document.querySelector(".filters")


function createFilterElement(name, unit = "%", value, min, max) {

    const div = document.createElement("div")
    div.classList.add("filter")


    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name


    const p = document.createElement("p")
    p.innerText = name


    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {

        filters[name].value = input.value
        applyFilters()
        
    })

    return div
}


// all the keys in filter object are converted into array

function createFilters(){
    Object.keys(filters).forEach(key => {

    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
    
    filtersContainer.appendChild(filterElement)

})
}

createFilters()


imgInput.addEventListener("change", (event) => {
    const file = event.target.files[0]
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceholder.style.display = "none"

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {

        image = img

        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img, 0, 0)
    }

})


function applyFilters() {
    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.brightness.value}%)
        contrast(${filters.contrast.value}%)
        saturate(${filters.saturation.value}%)
        hue-rotate(${filters.hueRotation.value}deg)
        blur(${filters.blur.value}px)
        grayscale(${filters.grayScale.value}%)
        sepia(${filters.sepia.value}%)
        opacity(${filters.opacity.value}%)
        invert(${filters.invert.value}%)
    `;

    canvasCtx.drawImage(image, 0, 0);

    canvasCtx.filter = "none";
}



resetButton.addEventListener("click", () => {
    filters = {
    
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
}
    applyFilters()

    filtersContainer.innerHTML = ""

    createFilters()
})


downloadButton.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})


const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 90,
        contrast: 160,
        saturation: 120,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 75,
        hueRotation: 10,
        blur: 0,
        grayScale: 10,
        sepia: 45,
        opacity: 100,
        invert: 0
    },

    oldSchool: {
        brightness: 95,
        contrast: 85,
        saturation: 60,
        hueRotation: 15,
        blur: 1,
        grayScale: 20,
        sepia: 60,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 100,
        contrast: 180,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayScale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 105,
        contrast: 110,
        saturation: 120,
        hueRotation: 15,
        blur: 0,
        grayScale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 115,
        hueRotation: 180,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 110,
        contrast: 80,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayScale: 10,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 90,
        contrast: 140,
        saturation: 130,
        hueRotation: 340,
        blur: 0,
        grayScale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    dream: {
        brightness: 120,
        contrast: 90,
        saturation: 120,
        hueRotation: 20,
        blur: 2,
        grayScale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 110,
        contrast: 120,
        saturation: 140,
        hueRotation: 25,
        blur: 0,
        grayScale: 5,
        sepia: 35,
        opacity: 100,
        invert: 0
    },

    spooky: {
        brightness: 85,
        contrast: 150,
        saturation: 70,
        hueRotation: 120,
        blur: 1,
        grayScale: 20,
        sepia: 0,
        opacity: 100,
        invert: 0
    }
};

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener("click", () => {
    const preset = presets[presetName];

    Object.keys(preset).forEach(filterName => {
        filters[filterName].value = preset[filterName];

        const slider = document.getElementById(filterName);
        if (slider) {
            slider.value = preset[filterName];
        }
    });

    applyFilters();
});

})