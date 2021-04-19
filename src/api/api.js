const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
}

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
}

export default class Api {
  constructor( endPoint, authorization ) {
    this._endPoint = endPoint
    this._authorization = authorization
  }

  getAllAsteroids = ( startDate, endDate ) => {
    return this._load( { url: `feed?start_date=${startDate}&end_date=${endDate}&api_key=${this._authorization}` } )
      .then( Api.toJSON )
      .then( ( data ) => {
        const asteroids = Object.values( data.near_earth_objects ).flat()
        return asteroids.map( Api.adaptAsteroidFromListToClient )
      } )
  }

  getAsteroid = ( id ) => {
    return this._load( { url: `neo/${id}?api_key=${this._authorization}` } )
      .then( Api.toJSON )
      .then( ( asteroid ) => Api.adaptAsteroidFromListToClient(asteroid) )
  }

  _load = ( {
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  } ) => {
    return fetch( `${this._endPoint}/${url}`, { method, body, headers } )
      .then( Api.checkStatus )
      .catch( Api.catchError )
  }

  static checkStatus( response ) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error( `${response.status}: ${response.statusText}` )
    }

    return response
  }

  static toJSON( response ) {
    return response.json()
  }

  static catchError( err ) {
    throw err
  }

  static adaptAsteroidFromListToClient( asteroid ) {
    const adaptedAsteroid = {
      id: asteroid.id,
      name: asteroid.name,
      size: {
        diameterMin: asteroid.estimated_diameter.meters.estimated_diameter_min,
        diameterMax: asteroid.estimated_diameter.meters.estimated_diameter_max
      },
      isDanderous: asteroid.is_potentially_hazardous_asteroid,
      closeApproachData: asteroid.close_approach_data.map(item => ({
        missDistance: {
          kilometers: item.miss_distance.kilometers,
          lunar: item.miss_distance.lunar
        },
        closeApproachDate: item.close_approach_date,
        relativeVelocity: item.relative_velocity.kilometers_per_hour,
        orbitingBody: item.orbiting_body
      }))
    }

    return adaptedAsteroid
  }

}
