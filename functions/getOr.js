const fetch = require('node-fetch')

exports.handler = async function (event) {
  const limit = JSON.parse(event.body)

  const url = process.env.ASTRA_GRAPHQL_ENDPOINT
  const query = `
  mutation insertGenres {
    action: insertreference_list(value: {label:"genre", value:"Action"}) {
      value{value}
    }
    anime: insertreference_list(value: {label:"genre", value:"Anime"}) {
       value{value}
    }
    award: insertreference_list(value: {label:"genre", value:"Award-Winning"}) {
       value{value}
    }
    children: insertreference_list(value: {label:"genre", value:"Children & Family"}) {
       value{value}
    }
    comedies: insertreference_list(value: {label:"genre", value:"Comedies"}) {
       value{value}
    }
    documentaries: insertreference_list(value: {label:"genre", value:"Documentaries"}) {
       value{value}
    }
    drama: insertreference_list(value: {label:"genre", value:"Dramas"}) {
       value{value}
    }
    fantasy: insertreference_list(value: {label:"genre", value:"Fantasy"}) {
       value{value}
    }
    french: insertreference_list(value: {label:"genre", value:"French"}) {
       value{value}
    }
    horror: insertreference_list(value: {label:"genre", value:"Horror"}) {
       value{value}
    }
    independent: insertreference_list(value: {label:"genre", value:"Independent"}) {
       value{value}
    }
    music: insertreference_list(value: {label:"genre", value:"Music & Musicals"}) {
       value{value}
    }
    romance: insertreference_list(value: {label:"genre", value:"Romance"}) {
       value{value}
    }
    scifi: insertreference_list(value: {label:"genre", value:"Sci-Fi"}) {
       value{value}
    }
    thriller: insertreference_list(value: {label:"genre", value:"Thriller"}) {
       value{value}
    }  
  }
  
  `  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-cassandra-token": process.env.ASTRA_DB_APPLICATION_TOKEN
    },
    body: JSON.stringify({ query })
  })

  try {
    const responseBody = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody)
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}