

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Returned Data")
            const data = "Sample data"
            if (data.includes('Sample')) {
                resolve(data)
            } else {
                reject('I am rejected')
            } 
        }, 2000)
    })

}

function processData(data) {
    console.log("Processed Data", data)
}

//Sync JS
fetchData().then((data) => {
    processData(data)
})

// const data = await fetchData()
// processData(data)