function searchableSelect(input, repeatable) {
  input.nextElementSibling.innerHTML = ''
  var text = input.value
  var div = input.nextElementSibling;  
  if (input.value != '') {
    if (repeatable) {
      for (let i = 0; i < mainData.Data.repeatable.length; i++) {
        var upper = mainData.Data.repeatable[i].Description.toUpperCase()
        if (upper.includes(text.toUpperCase())) {
          var option = document.createElement('p')
          Object.assign(option, {
            innerHTML: mainData.Data.repeatable[i].Description,
            className: 'search-option'
          })
          input.nextElementSibling.append(option)
        }
      }
    }
    $(div).show();    
  } else {
    $(div).hide();
  }
}