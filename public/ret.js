fetch(api_adresse + 'poster/' + postid)
    .then(response => {
        if (response.status == 200) {
            return response.json()
        } else {
            throw new Error("response not 200")
        }
    })

    .then((json) => {
        console.log(json)
        let form = document.querySelector('form');
        form.titel.value = json[0].title;
        form.indhold.value = json[0].content;
        form.afsluttet.checked = json[0].afslut;

    })



document.querySelector('button.submit').addEventListener('click', (event) => {
    document.getElementById('fejlbesked').textContent = '';
    let form = document.querySelector('form');

    let title = form.titel.value;
    let content = form.indhold.value;
    let afslut = form.afsluttet.checked;
    if (title == '' || content == '') {

        document.getElementById('fejlbesked').textContent = 'Udfyld alle felter';

    } else {
        form.titel.value = '';
        form.indhold.value = '';
        form.afsluttet.checked = false;


        let fetchSettings = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "title": title, "content": content, "afslut": afslut
            })
        }

        fetch(api_adresse + 'poster/' + postid, fetchSettings)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new Error('Noget gik galt');
                }
            })
            .then(json => {

                window.location.replace("index.html")
            })
            .catch(error => {
                console.log(error);
            })
    }
})