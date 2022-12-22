
// Get all checkbox elements
const checkboxes = document.querySelectorAll('input[type=checkbox]')


// Add a change event listener to each checkbox
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      console.log('Checkbox checked');
          // Get the item's id from the parent element's data-id attribute
    const item = checkbox.dataset.id;
    console.log(checkbox.dataset)
      markComplete(item);
    });
  });


  
async function markComplete(item){
    console.log(item)
    try{
        const response = await fetch('/region/markComplete', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                itemComplete: item
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
// current region button highlight
var current = 0;
for (var i = 0; i < document.links.length; i++) {
    if (document.links[i].href === document.URL) {
        current = i;
    }
}
document.getElementById(`btn${current}`).className = 'current';


async function addCheck(){
    
    try{
        const response = await fetch('/region/getCompleted', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            })
        
        const data = await response.json()

        // console.log(data) => json object with array inside it
        // console.log(data.completed) => isolates array inside json object

        data.completed.forEach(item_id => {
            // console.log(item_id)
            checkboxes.forEach((checkbox) => {
                if (checkbox.dataset.id == item_id)
                checkbox.checked = true
            })
        })
    }catch(err){
        console.log(err)
    }
}
addCheck()