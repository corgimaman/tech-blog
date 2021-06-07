module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (time) => {
      let yyyy = time.getFullYear();
      let d = time.getDate();
      let m = time.getMonth();
  
      let formattedDate = m + '/' + d + '/' + yyyy;
  
      return formattedDate;
    }
  };