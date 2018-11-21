const datalayer = {
  serviceUrl: 'http://localhost:3000/graffiti',
  // serviceUrl: 'https://chicago-graffiti.herokuapp.com/graffiti',
  get (aldermanName, startDate) {
    // create local variable for transform
    var localServiceUrl = this.serviceUrl
    // if alderman is not null, add alderman
    if (aldermanName != null) {
      localServiceUrl += '/' + aldermanName
    }
    // if start date is not null, add start and end date (one month later)
    if (startDate != null) {
      // make it first of the month
      var date = new Date(startDate + '-01')
      // make end date one month later
      var endDate = new Date(startDate + '-01')
      endDate = new Date(endDate.setMonth(endDate.getMonth() + 1))
      // add start and end to service url
      localServiceUrl += '/' + date.toISOString().substring(0, 10) + '/' + endDate.toISOString().substring(0, 10)
    }
    // fetch request
    const response = fetch(localServiceUrl)
    // return response
    return response
  }
}

export default datalayer
