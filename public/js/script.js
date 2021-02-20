console.log("Loaded up !");
window.onload = function() {
    const submitBtn = document.getElementById("search-btn");
    const address = document.getElementById("address");
    const errorAlert = document.getElementById("errorAlert");
    const responseAlert = document.getElementById("responseAlert");
    submitBtn.addEventListener("click", (e) => {
        if (address.value) {
            fetch(`/weather?address=${address.value}`).then(response => {
                response.json().then(({ data }) => {
                    showAlert(`It is currently ${data.weather.temperature} Degrees in ${address.value} and feels like ${data.weather.feelslike} Degrees`, false);
                })
            }).catch(err => {
                console.error(err);
                showAlert("Something went wrong, please try again!", true);
            })
        } else {
            showAlert("Please enter an address to search weather", true);
        }
    });

    function showAlert(text, isError) {
        if (isError) {
            errorAlert.innerText = text;
            errorAlert.classList.remove("hide");
            responseAlert.classList.add("hide");
        } else {
            errorAlert.classList.add("hide");
            responseAlert.classList.remove("hide");
            responseAlert.innerText = text;
        }
    }

}