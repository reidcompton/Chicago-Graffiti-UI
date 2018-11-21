const datalayer = {
  // serviceUrl: 'http://localhost:3000/graffiti',
  serviceUrl: 'https://chicago-graffiti.herokuapp.com/graffiti',
  get (aldermanName, startDate) {
    var localServiceUrl = this.serviceUrl
    if (aldermanName != null) {
      localServiceUrl += '/' + aldermanName
    }
    if (startDate != null) {
      // make it first of the month
      var date = new Date(startDate + '-01')
      var endDate = new Date(startDate + '-01')
      endDate = new Date(endDate.setMonth(endDate.getMonth() + 1))
      localServiceUrl += '/' + date.toISOString().substring(0, 10) + '/' + endDate.toISOString().substring(0, 10)
    }
    const response = fetch(localServiceUrl)
    return response
  }
}

export default datalayer
