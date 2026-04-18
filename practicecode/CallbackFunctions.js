function fetchData(callback) {
    setTimeout(() => {
        console.log("Returned Data")
        const data = "Sample data"
        callback(data)
    },2000)
}

function processData(data) {
    console.log("Processed Data", data)
}

function modifyData(data) {
    console.log("modified Data", data)
}

//Async JS
// let data = fetchData()
// processData(data)

//Sync JS
fetchData(processData)
fetchData(modifyData)