console.log('Client side JS loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const getData = async (searchTerm, callback) => {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const url = `http://localhost:3000/weather?address=${searchTerm}`

    const response = await fetch(url)
    try {
        if (response.status === 200) {
            const data = await response.json()
            if (!data.error) {
                callback(undefined, data)
            } else {
                throw new Error('Error: No data')
            }
        } else {
            throw new Error('Error: Bad request')
        }
    } catch (error) {
        callback(error)
    }
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (search.value) {
        getData(search.value, (error, response) => {
            if (error) {
                messageOne.textContent = 'Something went wrong! Please try again later.'
                console.log(error)
            } else {
                console.log(response)
                messageOne.textContent = ''
                messageTwo.textContent = `It's ${response.forecast} degrees in ${response.location}`
            }
        })
    }
})

