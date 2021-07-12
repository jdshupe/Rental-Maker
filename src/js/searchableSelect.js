function searchableSelect(input, repeatable) {
  input.nextElementSibling.innerHTML = ''
  var text = input.value
  var div = input.nextElementSibling;  
  if (input.value != '') {
    if (repeatable) {
      for (let i = 0; i < mainData.Data.repeatable.length; i++) {
        var upper = mainData.Data.repeatable[i].Description.toUpperCase()
        if (upper.includes(text.toUpperCase())) {
          var option = document.createElement('div')
          Object.assign(option, {
            innerHTML: mainData.Data.repeatable[i].Description,
            className: 'search-option',
            id:        mainData.Data.repeatable[i].tsv_code
          })
          option.setAttribute('onclick',`javascript: setValue(this);`);
          input.nextElementSibling.append(option)
        }
      }
    } else {
      for (let i = 0; i < mainData.Data.oneTime.length; i++) {
        var upper = mainData.Data.oneTime[i].Description.toUpperCase()
        if (upper.includes(text.toUpperCase())) {
          var option = document.createElement('div')
          Object.assign(option, {
            innerHTML: mainData.Data.oneTime[i].Description,
            className: 'search-option',
            id:        mainData.Data.oneTime[i].tsv_code
          })
          option.setAttribute('onclick',`javascript: setValue(this);`);
          input.nextElementSibling.append(option)
        }
      }
    }
    $(div).show();    
  } else {
    $(div).hide();
  }
}


function setValue(node) {
  var input = node.parentNode.previousElementSibling;
  input.value = node.innerHTML;
  $(node.parentNode).hide();
}